import React from "react";

const MessageCard = ({ title, name, imageSrc, message }) => {
  return (
    <div className="w-full border rounded-lg shadow-md p-6 min-h-[16rem] md:min-h-[20rem] transition-transform transform hover:scale-105 hover:shadow-lg bg-acses-green-500">

      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <img
            src={imageSrc}
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <p className="text-sm text-white">{name}</p>
        </div>
      </div>
      <div>
      <p className="text-white font-bold">{message}</p>

      </div>
    </div>
  );
};

export default MessageCard;
