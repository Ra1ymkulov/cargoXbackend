import { Request, Response } from "express";
import prisma from "../../config/prisma";
import sendTelegramMessageContact from "../../config/telegramBotMessageContact";

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        orders: true,
        notifications: {
          include: {
            order: true,
          },
        },
      },
    });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Не удалось найти пользователя!",
    });
  }
};
const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        orders: true,
        notifications: true,
      },
    });
    res.status(201).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Ошибка при получении всех пользователей: ${error}`,
    });
  }
};
const getServiceType = async (req: Request, res: Response) => {
  try {
    const data = await prisma.serviceType.findMany();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Ошибка при получении данных: ${error}`,
    });
  }
};
const getAllService = async (req: Request, res: Response) => {
  try {
    const data = await prisma.allService.findMany();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Ошибка при получении данных: ${error}`,
    });
  }
};

const TelegramBotContactMessage = async (req: Request, res: Response) => {
  try {
    const { userName, email, text, phonNumber } = req.body;

    sendTelegramMessageContact(
      ` <b>Сообшения:</b> \n <b>Имя:</b> <i>${userName}</i> \n <b>email:</b> <i>${email}</i> \n <b>текст:</b> <i>${text}</i> \n <b>Номер телефона:</b> <i>${phonNumber}</i>`
    );
    return res.status(200).json({
      success: true,
      message: "send message",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error in notification function: ${error}`,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { fullName, userName, email, avatar } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "Пользователь не найден!",
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        fullName: fullName || existingUser.fullName,
        userName: userName || existingUser.userName,
        email: email || existingUser.email,
        avatar: avatar || existingUser.avatar,
      },
    });

    res.status(200).json({
      success: true,
      message: "Профиль успешно обновлён",
      user: updatedUser,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `Ошибка при обновлении профиля: ${error.message}`,
    });
  }
};

export default {
  getAllUser,
  getUser,
  getServiceType,
  getAllService,
  TelegramBotContactMessage,
  updateUser,
};
