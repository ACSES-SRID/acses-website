/*************  ✨ Codeium Command 🌟  *************/
import React from "react";

const MessageCard = ({ title, name, imageSrc, message }) => {
  return (
    <div className="w-full border rounded-lg shadow-md p-6 transition-transform transform hover:scale-105 hover:shadow-lg h-[350px] md:h-[360px]">
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
        <p className="text-black leading-relaxed break-words">{message}</p>
      </div>
    </div>
  );
};

export default MessageCard;
