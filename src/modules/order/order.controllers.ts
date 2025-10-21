import { Request, Response } from "express";
import prisma from "../../config/prisma";
import { generateTrackCode } from "../utils/generateTrackCode";
import { calculatePrice } from "../utils/calculatePrice";
import sendTelegramMessage from "../../config/telegram";

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const getOrder = await prisma.order.findMany();
    res.status(201).json({
      success: true,
      getOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Ошибка при получений заказов: ${error}`,
    });
  }
};
const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, fromCityId, toCityId, serviceTypeId, weightKg } = req.body;
    if (!userId || !fromCityId || !toCityId || !serviceTypeId || !weightKg)
      return res.status(400).json({
        success: false,
        message: "Не все поля заполнены!",
      });
    const fromCity = await prisma.allService.findUnique({
      where: { id: fromCityId },
    });
    const toCity = await prisma.allService.findUnique({
      where: { id: toCityId },
    });
    const serviceType = await prisma.serviceType.findUnique({
      where: { id: serviceTypeId },
    });
    if (!fromCity || !toCity || !serviceType)
      return res.status(404).json({
        success: false,
        message: "error in base-date",
      });
    const getTrackCodeForOrders = await prisma.order.findMany({
      select: { trackingCode: true },
    });
    const trackCodeForOrders = getTrackCodeForOrders.map(
      (el: any) => el.trackingCode
    );
    const trackingCode = generateTrackCode({
      trackCodeOrders: trackCodeForOrders,
    });
    const { price, distancekm } = calculatePrice({
      fromCity,
      toCity,
      serviceType,
      weightKg,
    });
    const order = await prisma.order.create({
      data: {
        userId,
        fromCityId,
        toCityId,
        weightKg,
        serviceTypeId,
        trackingCode,
        distancekm,
        price,
      },
    });
    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Ошибка при создании заказа: ${error}`,
    });
  }
};
const readOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const order = await prisma.notifications.update({
      where: { id },
      data: { read: true },
    });
    res.status(201).json({
      success: true,
      message: "Order marked as read",
      order,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: `Error in read funtion: ${error}`,
    });
  }
};

const statusFunc = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const { orderId, status } = req.params;
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order) {
      return res.status(404).json({ message: "Заказ не найден" });
    }
    if (
      order.status === status ||
      (status !== "CREATED" &&
        status !== "IN_TRANSIT" &&
        status !== "DELIVERED" &&
        status !== "CANCELED")
    ) {
      return res.status(400).json({
        success: false,
        message: "Wrong query!",
      });
    }
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
    sendTelegramMessage(
      `<b>📦 Статус заказа</b>\n <b>ID:</b> ${orderId}\n <b>Изменён:</b> <i>${
        order.status
      }</i> ➜ <i>${status}</i>\n <b>ID Пользователя:</b> ${
        userId || "неизвестен"
      }`
    );
    const notif = await prisma.notifications.create({
      data: {
        message: status,
        read: false,
        orderId: orderId,
        userId: userId,
      },
    });
    return res.status(200).json({
      success: true,
      updatedOrder,
      notif,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error in notification function: ${error}`,
    });
  }
};
export default {
  createOrder,
  getAllOrder,
  readOrder,
  statusFunc,
};
