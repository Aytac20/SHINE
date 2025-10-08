import React from "react";
const Loading = () => {
  return (
    <div className="w-full gap-x-2 flex justify-center items-center h-screen">
      <div className="w-4 h-4 rounded-full bg-[#d991c2] animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-[#9869b8] animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-[#6756cc] animate-bounce [animation-delay:-.5s]"></div>
    </div>
  );
};

export default Loading;
