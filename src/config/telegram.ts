import axios from "axios";

const BOT_TOKEN = "8334027775:AAGLqxLZWpWvqTSOo87O98p83AdjIMD5gEs";
const CHAT_ID = "968101120";

const sendTelegramMessage = async (text: string) => {
  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text,
    });
  } catch (e) {
    console.error("Ошибка отправки в Telegram:", e);
  }
};
export default sendTelegramMessage;
