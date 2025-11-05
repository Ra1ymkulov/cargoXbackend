import { Request, Response } from "express";
import prisma from "../../config/prisma";

const addReviews = async (req: Request, res: Response) => {
  try {
    const { userId, name, city, email, text, star } = req.body;
    const reviews = await prisma.reviews.create({
      data: {
        userId,
        name,
        city,
        email,
        text,
        star,
      },
    });
    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Ошибка в отправки отзыва! ${error}`,
    });
  }
};
const deleteReviews = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const reviews = await prisma.reviews.delete({
      where: { id },
    });
    res.status(200).json({
      success: true,
      messsage: "Отзыв успешно удалено!",
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      message: `Ошибка при удалений отзыва! ${error}`,
    });
  }
};
const getAllReviews = async (req: Request, res: Response) => {
  try {
    const data = await prisma.reviews.findMany();
    res.status(200).json({
      success: true,
      message: "Данные успешно получены!",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Ошибка при получений данных: ${error}`,
    });
  }
};
export default {
  addReviews,
  deleteReviews,
  getAllReviews,
};
