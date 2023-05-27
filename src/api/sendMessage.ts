import { fetcher } from ".";
import { ISendMessage } from "../types";


export const sendMessage = async (id: string, message: string) => {

  const response = await fetcher.post<ISendMessage>(`/waInstance${localStorage.getItem(
    "idInstance"
  )}/sendMessage/${localStorage.getItem("apiToken")}`, {
    chatId: `${id}@c.us`,
    message,
  });
  return response;
}
