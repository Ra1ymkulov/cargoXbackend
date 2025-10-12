import { Router } from "express";
import orderControllers from "./order.controllers";

const router = Router();

router.post("/create-order", orderControllers.createOrder);
router.get("/get-all-order", orderControllers.getAllOrder);

export default router;
