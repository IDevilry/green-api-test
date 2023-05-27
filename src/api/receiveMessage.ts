import { fetcher } from ".";
import { IReceiveMessage } from "../types";
import { deleteNotification } from "./deleteNotification";

export async function receiveMessages(
  callback: (response: IReceiveMessage) => void
): Promise<void> {
  
  if (!localStorage.getItem("idInstance") || !localStorage.getItem("apiToken"))
    return;

  try {
    const response = await fetcher.get<IReceiveMessage>(
      `/waInstance${localStorage.getItem(
        "idInstance"
      )}/receiveNotification/${localStorage.getItem("apiToken")}`
    );

    if (response.data === null) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return receiveMessages(callback);
    }
    if (response.data.body.typeWebhook === "incomingMessageReceived") {
      callback(response.data);
      await deleteNotification(String(response.data.receiptId));
      return receiveMessages(callback);
    } else {
      if (response.data.receiptId !== undefined) {
        await deleteNotification(String(response.data.receiptId));
      }

      return receiveMessages(callback);
    }
  } catch (error) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return receiveMessages(callback);
  }
}
