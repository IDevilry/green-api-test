import { useState, type FC, useEffect, FormEventHandler } from "react";
import { IMessageHistory } from "../../types";
import { getChatHistory } from "../../api/getChatHistory";
import { receiveMessages } from "../../api/receiveMessage";
import { IReceiveMessage } from "../../types";
import { sendMessage } from "../../api/sendMessage";

interface ChatBoxProps {
  currentChat: string;
}

const ChatBox: FC<ChatBoxProps> = ({ currentChat }) => {
  const [messages, setMessages] = useState<IMessageHistory[]>([]);

  const handleSendMessage: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const message = e.currentTarget.newMessage.value;
    if (!message) return;
    sendMessage(currentChat, message);
    e.currentTarget.newMessage.value = "";

    setMessages((prev) => [
      ...prev,
      {
        chatId: currentChat,
        textMessage: message,
        timestamp: Date.now(),
        type: "outgoing",
      },
    ]);
  };

  const addReceivedMessage = (message: IReceiveMessage) => {
    const receivedMessage: IMessageHistory = {
      chatId: message.body.senderData.chatId,
      textMessage: message.body.messageData.textMessageData.textMessage,
      timestamp: message.body.timestamp,
      type: "incoming",
    };
    setMessages((prev) => [...prev, receivedMessage]);
  };

  useEffect(() => {
    receiveMessages(addReceivedMessage);
  }, []);

  useEffect(() => {
    if (!currentChat) return;
    getChatHistory(currentChat).then((res) => {
      setMessages(res.data);
    });
  }, [currentChat]);

  return (
    <div className="flex flex-col justify-between p-4 h-full">
      <div className="">
        {!currentChat && <div>Введите номер телефона получателя</div>}

        <div className="flex items-center h-10 bg-slate-300 rounded-lg px-4">
          {currentChat}
        </div>
      </div>
      <div className="">
        <div className="flex flex-col gap-4 p-8">
          {messages.length > 0 &&
            messages.map((message) =>
              message.type ? (
                <div
                  key={message.timestamp}
                  className={`${
                    message.type === "incoming"
                      ? "bg-gray-500 self-start"
                      : "bg-sky-600 self-end"
                  } rounded-lg px-4 py-2 my-2 text-white max-w-[60%]`}
                >
                  {message.textMessage}
                </div>
              ) : null
            )}
        </div>
        {currentChat ? (
          <div className="">
            <form
              onSubmit={handleSendMessage}
              className="flex justify-between gap-4 p-4"
            >
              <input
                type="text"
                className="w-full p-3 rounded-full"
                name="newMessage"
                placeholder="Введите сообщение"
              />
              <button className="bg-sky-600 text-white p-3 rounded-full">
                Отправить
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ChatBox;
