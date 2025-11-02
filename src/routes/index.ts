import { Router } from "express";
import authRouter from "../modules/auth/auth.routes";
import orderRouter from "../modules/order/order.routes";
import userRouter from "../modules/user/user.routes";
// import reviewsRouter from "../modules/reviews/reviews.routes";
const router = Router();

router.use("/auth", authRouter);
router.use("/order", orderRouter);
router.use("/user", userRouter);
// router.use("/reviews", reviewsRouter);

export default router;
