import React, { Dispatch, SetStateAction } from "react";
import { ILiftConfig, ILiftStatus } from "../api/Config";
import { LiftHandlers } from "../HelperFunctions/StartLiftHelper";

interface iFloorHandlerProps {
  floors: ILiftConfig[] | any;
  currentFloor: number;
  data: ILiftStatus | undefined;
  HandleOnClick: (floor: number) => void;
  setMessage: Dispatch<SetStateAction<string>>;
  setStart: Dispatch<SetStateAction<boolean>>;
}

export default function FloorHandler({
  floors,
  currentFloor,
  HandleOnClick,
  setStart,
  setMessage,
  data,
}: iFloorHandlerProps) {
  let clicked = false;

  const timer = setTimeout(() => {
    LiftHandlers.SET_BUTTON_CLICK(clicked, setStart, setMessage);
  }, 10000);
  const buttons = document.querySelectorAll(".button-group");
  buttons.forEach((buttons) => {
    buttons.addEventListener("click", () => {
      clicked = true;
      clearTimeout(timer);
    });
  });

  return (
    <div className="button-group grid grid-cols-2 mr-7 w-[40%] ">
      {floors.map((floor: any, idx: number) => (
        <div
          className={`w-20 h-20 m-5 bg-[#587890] text-3xl  rounded-full cursor-pointer ${
            floor === currentFloor &&
            "bg-red-500 shadow-lg shadow-red-600 border-red-600 border"
          }`}
          key={idx}
          onClick={() => HandleOnClick(floor)}
        >
          <p className="w-full h-full flex items-center justify-center">
            {floor}
          </p>
        </div>
      ))}
    </div>
  );
}
