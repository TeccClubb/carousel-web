import React, { FC, ReactNode, useId } from "react";

const ToggleIcon: FC<{
  isOn: boolean;
  onSwitchChange?: (value: boolean) => void;
  offIcon: ReactNode;
  onIcon: ReactNode;
}> = ({ isOn, onSwitchChange, offIcon, onIcon }) => (
  <div
    className="transition-all duration-300 ease-in-out cursor-pointer"
    onClick={() => onSwitchChange && onSwitchChange(!isOn)}
  >
    <input
      id={useId()}
      type="checkbox"
      className="hidden appearance-none"
      checked={isOn}
      onChange={() => {}}
    />

    {isOn && onIcon}

    {!isOn && offIcon}
  </div>
);

export default ToggleIcon;
