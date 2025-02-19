import React, { FC, memo } from "react";
import { useAppState } from "@/hooks/use-app-state";

const Loader: FC = () => {
  const { isLoading, loaderTitle } = useAppState();
  return (
    isLoading && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-[1000]">
        <div className="bg-slate-50 dark:bg-slate-800 p-4 bg-opacity-80 rounded-2xl relative flex items-center justify-center">
          <div className="animate-spin shadow-xl shadow-slate-400 rounded-full h-32 w-32 border-t-2 border-b-2 border-black dark:border-slate-200"></div>
          <p className="absolute text-center align-middle text-xl font-semibold text-black dark:text-slate-200">
            {loaderTitle ? loaderTitle : "Loading..."}
          </p>
        </div>
      </div>
    )
  );
};

// const Loader1: React.FC = () => {
//   return (
//     <div className="flex flex-col items-center space-y-4">
//       <div className="animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 h-12 w-12"></div>
//       <p className="text-gray-500 dark:text-gray-400">Loading...</p>
//     </div>
//   );
// };

export default memo(Loader);
