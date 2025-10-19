import { Request, Response } from "express";
import prisma from "../../config/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "../../config/token";

const register = async (req: Request, res: Response) => {
  try {
    const { avatar, fullName, userName, email, password } = req.body;
    const checkUser = await prisma.user.findUnique({
      where: { email },
    });
    if (checkUser === email) {
      return res.status(401).json({
        success: false,
        message: "Пользователь уже существует!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        avatar,
        fullName,
        userName,
        email,
        password: hashedPassword,
      },
    });
    const token = generateToken(user.id, user.email);
    res.status(200).json({
      success: true,
      message: "Вы успешно зарегистрировались!",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `error in register: ${error}`,
    });
  }
};
const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Пользователь не найден!",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Не верный пароль!",
      });
    }
    const token = generateToken(user.id, user.email);
    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(5000).json({
      success: false,
      message: "Не удалось войти",
    });
  }
};
export default {
  register,
  login,
};
