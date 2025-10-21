import axios from "axios";

const BOT_TOKEN = process.env.BOT_TOKEN;

const CHAT_IDS = ["968101120", "5124900056", "6955955270"];
const sendTelegramMessage = async (text: string) => {
  for (const chatId of CHAT_IDS) {
    try {
      const response = await axios.post(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          chat_id: chatId,
          text,
          parse_mode: "HTML",
        }
      );
      console.log(`Сообщение отправлено в чат ${chatId}:`, response.data);
    } catch (e: any) {
      console.error(
        `Ошибка отправки в чат ${chatId}:`,
        e.response?.data || e.message
      );
    }
  }
};

export default sendTelegramMessage;
