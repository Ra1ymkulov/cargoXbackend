import { Request, Response } from "express";
import prisma from "../../config/prisma";

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
import sendTelegramMessageContact from "../../config/telegramBotMessageContact";

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

export default {
  getAllUser,
  getUser,
  getServiceType,
  getAllService,
  TelegramBotContactMessage,
};
