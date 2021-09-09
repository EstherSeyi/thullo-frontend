import { useRef, useEffect } from "react";

import { useModal } from "../context/modal";

const Modal = () => {
  const { modalState, close } = useModal();

  const modalRef = useRef();

  const handleClick = (event) => {
    if (modalRef?.current?.contains(event.target)) {
      return;
    }
    close();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  return (
    <div
      className={`fixed h-screen w-screen top-0 left-0 overflow-auto bg-misc-black  z-10 bg-opacity-50 ${
        modalState?.isModalOpen ? "block" : "hidden"
      }`}
    >
      <div ref={modalRef} className="w-11/12 mx-auto lg:w-max">
        {modalState?.modalComponent}
      </div>
    </div>
  );
};

export default Modal;
