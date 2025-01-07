import React, { Dispatch, FC, ReactNode, SetStateAction } from "react";

const ToggleIcon: FC<{
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  offIcon: ReactNode;
  onIcon: ReactNode;
}> = ({ checked, setChecked, offIcon, onIcon }) => {
  const handleToggle = () => setChecked(!checked);

  return (
    <div
      className="relative inline-grid place-content-center cursor-pointer"
      onClick={handleToggle}
    >
      {/* Hidden checkbox for accessibility */}
      <input
        type="checkbox"
        className="appearance-none absolute inset-0 w-full h-full"
        checked={checked}
        onChange={() => {}}
      />

      {/* Off Icon */}
      <div
        className={`transition-transform duration-300 ease-[cubic-bezier(0, 0, 0.2, 1)] ${
          checked ? "opacity-0 scale-50" : "opacity-100 scale-100"
        }`}
      >
        {offIcon}
      </div>

      {/* On Icon */}
      <div
        className={`absolute transition-transform duration-300 ease-[cubic-bezier(0, 0, 0.2, 1)] ${
          checked ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        {onIcon}
      </div>
    </div>
  );
};

export default ToggleIcon;
