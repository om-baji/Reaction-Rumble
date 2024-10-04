import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import bcrypt from "bcryptjs";
import { sign, verify } from "hono/jwt";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/login", async (c) => {
  try {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const { email, password } = await c.req.json();


    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      return c.json(
        { message: "User does not exist!", success: false },
        { status: 403 }
      );

    const isValid = await bcrypt.compare(password, user?.password);

    if (!isValid)
      return c.json(
        { message: "wrong password", success: false },
        { status: 403 }
      );

    const token = await sign(
      {
        id: user.id,
        email: user.email,
      },
      c.env.JWT_SECRET
    );

    return c.json({
      token,
      success: true,
    });
  } catch (e) {
    return c.json(
      {
        error: e || "Something went wrong!",
        success: false,
      },
      { status: 500 }
    );
  }
});

userRouter.post("/signup", async (c) => {
  try {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const { name, email, password } = await c.req.json();


    const hashPass = await bcrypt.hash(password, 10);
   
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPass,
      },
    });

    if (!user)
      return c.json({ message: "Soemthing went wrong" }, { status: 403 });

    const token = await sign(
      {
        id: user.id,
        email: user.email,
      },
      c.env.JWT_SECRET
    );

    return c.json({
      token,
      success: true,
    });
  } catch (e) {
    return c.json(
      {
        error: e || "Something went wrong!",
        success: false,
      },
      { status: 500 }
    );
  }
});

export default userRouter;
