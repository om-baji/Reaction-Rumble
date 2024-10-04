import { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { toast } from 'react-hot-toast';

const expressionToEmoji = {
  neutral: "😐",
  happy: "😊",
  sad: "😢",
  angry: "😠",
  fearful: "😨",
  disgusted: "🤢",
  surprised: "😮"
};

const expressionToMessage = {
  neutral: "You're feeling calm. Stay composed! 😌",
  happy: "Looking great with that smile! Keep it up! 😊",
  sad: "Everything okay? Cheer up, friend! 😢",
  angry: "Take a deep breath. It's all good. 😠",
  fearful: "You look worried! Take a moment to relax. 😨",
  disgusted: "Not liking what you see? 🤢",
  surprised: "Whoa! Something unexpected happened? 😮"
};

function Face() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [faceResults, setFaceResults] = useState([]);
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedData, setCapturedData] = useState(null); // For captured data

  useEffect(() => {
    startVideo();
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models")
    ]).then(() => {
      detectFaces();
    });
  };

  const detectFaces = () => {
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      ).withFaceLandmarks().withFaceExpressions();

      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
      faceapi.matchDimensions(canvasRef.current, {
        width: 940,
        height: 650,
      });

      const resized = faceapi.resizeResults(detections, {
        width: 940,
        height: 650,
      });

      faceapi.draw.drawDetections(canvasRef.current, resized);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resized);

      if (detections.length > 0) {
        const expressions = detections.map(det => det.expressions);
        setFaceResults(expressions);
      } else {
        setFaceResults([]);
      }
    }, 1000);
  };

  const captureImage = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL('image/png');
    setCapturedImage(image);

    const detections = await faceapi.detectAllFaces(
      videoRef.current,
      new faceapi.TinyFaceDetectorOptions()
    ).withFaceLandmarks().withFaceExpressions();

    if (detections.length > 0) {
      const expressions = detections.map(det => det.expressions);
      setCapturedData(expressions); // Store captured data

      const dominantExpression = Object.keys(expressions[0]).reduce((a, b) =>
        expressions[0][a] > expressions[0][b] ? a : b
      );

      if (expressionToMessage[dominantExpression]) {
        toast(expressionToMessage[dominantExpression], {
          icon: expressionToEmoji[dominantExpression],
          duration: 4000,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col md:flex-row">
      <div className="flex-1 flex flex-col items-center mb-8 md:mb-0">
        <h1 className="text-5xl font-bold mb-6 text-blue-400">Face Detection</h1>
        <div className="relative mb-4">
          <video
            className="border-4 border-blue-500 rounded-lg shadow-xl"
            crossOrigin="anonymous"
            ref={videoRef}
            autoPlay
            width="940"
            height="650"
          />
          <canvas
            ref={canvasRef}
            width="940"
            height="650"
            className="absolute top-0 left-0"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
          onClick={captureImage}
        >
          Capture Image
        </button>
      </div>
      <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-semibold mb-6 text-yellow-400">Detected Expressions</h2>
        {faceResults.length > 0 ? (
          faceResults.map((result, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg mb-4 shadow-md flex flex-col space-y-2">
              {Object.entries(result).map(([expression, value]) => (
                <div key={expression} className="text-lg flex justify-between items-center">
                  <span>{expression.charAt(0).toUpperCase() + expression.slice(1)}:</span>
                  <span>{(value * 100).toFixed(2)}% {expressionToEmoji[expression]}</span>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No face detected.</p>
        )}

        {capturedImage && (
          <div className="mt-6">
            <h2 className="text-3xl font-semibold mb-4 text-green-400">Captured Image</h2>
            <img src={capturedImage} alt="Captured" className="rounded-lg shadow-md mb-4" />
            {capturedData && (
              <div className="bg-gray-700 p-4 rounded-lg shadow-md">
                {capturedData.map((result, index) => (
                  <div key={index} className="space-y-2">
                    {Object.entries(result).map(([expression, value]) => (
                      <div key={expression} className="text-lg flex justify-between items-center">
                        <span>{expression.charAt(0).toUpperCase() + expression.slice(1)}:</span>
                        <span>{(value * 100).toFixed(2)}% {expressionToEmoji[expression]}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Face;
