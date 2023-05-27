import { type FC, useState } from "react";
import { AddDataModal, ChatBox, ChatList } from "./components";

const App: FC = () => {
  const [isAddInstance, setIsAddInstance] = useState<boolean>(
    localStorage.getItem("idInstance") ? true : false
  );

  const [currentChat, setCurrentChat] = useState<string>('')

  return (
    <main className="flex h-[100vh] relative">
      {/* left side */}
      <section className="max-w-[33%] w-full">
        <ChatList setCurrentChat={setCurrentChat}  />
      </section>
      {/* right side  */}
      <section className="w-full bg-[#f0f2f5]">
        {!isAddInstance ? <AddDataModal cb={setIsAddInstance} /> : null}

        <ChatBox currentChat={currentChat} />
      </section>
    </main>
  );
};

export default App;

