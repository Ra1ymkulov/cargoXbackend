import { Router } from "express";
import orderControllers from "./order.controllers";

const router = Router();

router.post("/create-order", orderControllers.createOrder);
router.get("/get-all-order", orderControllers.getAllOrder);
router.put("/user/:id/read", orderControllers.readOrder);
router.post("/status-change/:orderId", orderControllers.statusFunc);

export default router;
