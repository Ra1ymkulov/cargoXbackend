import { Router } from "express";
import authRouter from "../modules/auth/auth.routes";
import orderRouter from "../modules/order/order.routes";
import userRouter from "../modules/user/user.routes";
import cors from "cors";
const router = Router();

const corsConfig = {
  origin: ["http://localhost:3000"],
};

router.use("/auth", cors(corsConfig), authRouter);
router.use("/order", orderRouter);
router.use("/user", userRouter);

export default router;
