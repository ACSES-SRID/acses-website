// MessageCard.js
import React, { useState } from "react";
import Modal from "./Modal";

const MessageCard = ({ title, name, imageSrc, message }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Truncate message to 100 characters if necessary
  const truncatedMessage =
    message.length > 300 ? message.slice(0, 300) + "..." : message;

  return (
    <>
      <div className="w-full mt-5 border rounded-lg shadow-md p-6 transition-transform transform hover:scale-105 hover:shadow-lg h-[350px] md:h-[260px]" onClick={() => setIsModalOpen(true)}>
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
            <img
              src={imageSrc}
              alt={name}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-black">{title}</h2>
            <p className="text-sm text-black">{name}</p>
          </div>
        </div>
        <div>
          {/* Make the message clickable to open the modal */}
          <p
            className="text-black leading-relaxed break-words cursor-pointer"
          >
            {truncatedMessage}
          </p>
        </div>
      </div>

      {/* Render the modal if isModalOpen is true */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-black">{message}</p>
        </Modal>
      )}
    </>
  );
};

export default MessageCard;
