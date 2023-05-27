import { FormEventHandler, type FC } from "react";

interface AddDataModalProps {
  cb: (bool: boolean) => void;
}

const AddDataModal: FC<AddDataModalProps> = ({ cb }) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    cb(true);
    localStorage.setItem("idInstance", e.currentTarget.idInstance.value);
    localStorage.setItem("apiToken", e.currentTarget.apiTokenInstance.value);
  };

  return (
    <div
      className="
        absolute
        top-[50%]
        left-[50%]
        w-full
        translate-x-[-50%]
        translate-y-[-50%]
        h-full
        bg-gray-400
        flex
        flex-col
        items-center
        justify-center
        gap-4
        rounded-lg
        "
    >
      <form
        onSubmit={handleSubmit}
        className="flex
          flex-col
          items-center
          justify-center
          gap-4"
      >
        <input className="p-3 text-black rounded-lg bg-slate-200 placeholder:text-gray-500" type="text" name="idInstance" placeholder="Введите idInstance" />
        <input className="p-3 text-black rounded-lg bg-slate-200 placeholder:text-gray-500"
          type="text"
          name="apiTokenInstance"
          placeholder="Введите apiTokenInstance"
        />
        <button
          className="
            p-3 text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-all"
        >Подтвердить</button>
      </form>
    </div>
  );
};

export default AddDataModal;
