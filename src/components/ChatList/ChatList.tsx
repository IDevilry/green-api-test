import { FormEventHandler, type FC } from "react";

interface ChatListProps {
  setCurrentChat: (chat: string) => void;
}

const ChatList: FC<ChatListProps> = ({ setCurrentChat }) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setCurrentChat(e.currentTarget.chat.value);
  };
  return (
    <div
      className="p-4"
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input className="bg-gray-300 p-2 rounded-lg" name="chat" type="tel" placeholder="Номер телефона" />
        <button className="bg-blue-500 p-2 rounded-lg text-white" type="submit" >Написать</button>
      </form>
    </div>
  );
};

export default ChatList;
