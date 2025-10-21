import axios from "axios";

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID; // можно оставить, если хочешь дефолтную группу
const GROUP_ID = process.env.GROUP_ID;

const sendTelegramMessage = async (text: string, groupId?: number) => {
  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: GROUP_ID || CHAT_ID,
      text,
      parse_mode: "HTML",
    });
  } catch (e: any) {
    console.error("Ошибка отправки в Telegram:", e.response?.data || e.message);
  }
};

export default sendTelegramMessage;
