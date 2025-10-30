import { Router } from "express";
import orderControllers from "./order.controllers";

const router = Router();

router.post("/create-order", orderControllers.createOrder);
router.get("/get-all-order", orderControllers.getAllOrder);
router.get("/get-service-type", orderControllers.getServiceType);
router.get("/get-all-service", orderControllers.getAllService);
router.post("/calculate-price", orderControllers.calculatePriceCreate);
router.put("/user/:id/read", orderControllers.readOrder);
router.post("/status-change/:orderId", orderControllers.statusFunc);
router.delete("/order-delete/:id", orderControllers.deleteOrder);

export default router;
