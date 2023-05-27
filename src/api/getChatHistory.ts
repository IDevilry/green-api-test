import { fetcher } from ".";
import { IMessageHistory } from "../types";

export const getChatHistory = async (chatId: string) => {
  const response = await fetcher.post<IMessageHistory[]>(
    `/waInstance${localStorage.getItem(
      "idInstance"
    )}/getChatHistory/${localStorage.getItem("apiToken")}`,
    { chatId: `${chatId}@c.us` }
  );
  return response;
};
