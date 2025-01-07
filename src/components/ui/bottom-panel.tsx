"use client";
import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";

const BottomPanel: FC<{
  isPanelOpen: boolean;
  setIsPanelOpen: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
}> = ({ isPanelOpen, setIsPanelOpen, children }) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // const handleClickOutside = (event: MouseEvent) => {
  //     // If the click is outside the panel, close the panel
  //     if (panelRef.current && !panelRef.current.contains(event.target)) {
  //       setIsPanelOpen(false);
  //     }
  //   };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsPanelOpen(false);
      }
    },
    [setIsPanelOpen]
  );

  useEffect(() => {
    if (isPanelOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPanelOpen, handleClickOutside]);

  return (
    <div
      ref={panelRef}
      className={`fixed bottom-0 left-0 w-full h-80 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
        isPanelOpen ? "transform translate-y-0" : "transform translate-y-full"
      }`}
    >
      {children}
    </div>
  );
};

export { BottomPanel };
