import { Request, Response } from "express";
import prisma from "../../config/prisma";
import { generateTrackCode } from "../utils/generateTrackCode";
import { calculatePrice } from "../utils/calculatePrice";

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
      (el) => el.trackingCode
    );
    const trackingCode = generateTrackCode({
      trackCodeOrders: trackCodeForOrders,
    });
    const price = calculatePrice({
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
        read: false,
        price: 23,
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
export default {
  createOrder,
  getAllOrder,
};
