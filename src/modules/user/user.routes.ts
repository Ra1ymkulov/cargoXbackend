import { Router } from "express";
import userControllers from "../user/user.controllers";

const router = Router();

router.get("/get-user/:id", userControllers.getUser);
router.get("/get-all-users", userControllers.getAllUser);
router.get("/get-all-service", userControllers.getAllService);
router.get("/get-service-type", userControllers.getServiceType);
router.post(
  "/message-contact-telegram",
  userControllers.TelegramBotContactMessage
);

export default router;
