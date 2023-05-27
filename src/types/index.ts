export interface IReceiveMessage {
  receiptId: number;
  body: IMessageBody;
}

export interface IMessageBody {
  typeWebhook: string;
  instanceData: {
    idInstance: number;
    wid: string;
    typeInstance: string;
  };
  timestamp: number;
  idMessage: string;
  senderData: {
    chatId: string;
    sender: string;
    senderName: string;
  };
  messageData: {
    typeMessage: string;
    textMessageData: {
      textMessage: string;
    };
  };
}

export interface ISendMessage {
  idMessage: string;
}

export interface IMessageHistory {
  type: "incoming" | "outgoing";
  timestamp: number;
  chatId: string;
  textMessage: string;
}
