import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="flex justify-center items-center">
        <div className="animate-spin  rounded-full border-double h-20 w-20 border-t-[5px] border-slate"></div>
      </div>
      <p className="mt-6 text-xl font-semibold text-gray-400">Connecting...</p>
    </div>
  );
};

export default LoadingSpinner;
