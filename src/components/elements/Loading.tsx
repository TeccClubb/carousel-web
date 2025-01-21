import React, { FC } from "react";

const Loading: FC = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-[1000]">
    <div className="animate-spin shadow-xl shadow-gray-400 rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
    <p className="absolute text-xl text-black">Loading...</p>
  </div>
);

// const Loading1: React.FC = () => {
//   return (
//     <div className="flex flex-col items-center space-y-4">
//       <div className="animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 h-12 w-12"></div>
//       <p className="text-gray-500 dark:text-gray-400">Loading...</p>
//     </div>
//   );
// };

export default Loading;
