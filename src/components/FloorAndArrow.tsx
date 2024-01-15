import React, { useEffect, useState } from "react";
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";
import { ILiftStatus } from "../api/Config";

interface IProps {
  floor: string;
  title: string;
  destination?: number | undefined;
  stops: number[];
  currentFloor: number;
}

export default function FloorAndArrow({
  floor,
  title,
  destination,
  currentFloor,
  stops,
}: IProps) {
  const [goingUp, setGoingUp] = useState<boolean>(true);

  useEffect(() => {
    stops.map((currentNumber, index, array) => {
      const nextNumber = array[index + 1];
      if (nextNumber != undefined) {
        if (currentFloor > nextNumber) {
          setGoingUp(false);
        } else {
          setGoingUp(true);
        }
      }
    });
  }, [currentFloor]);

  return (
    <div className=" flex flex-row justify-center items-center" key={floor}>
      <div className="text-3xl w-28 h-28 py-4 bg-[#3a5061]">
        <p>{title}</p>
        <p className=" font-extrabold text-5xl">{floor}</p>
      </div>
      <div
        className={`text-3xl ${
          goingUp ? "bg-red-500" : "bg-green-600"
        } w-16 h-28 py-4 flex justify-center items-center`}
      >
        {goingUp ? <FaCircleArrowUp /> : <FaCircleArrowDown />}
      </div>
    </div>
  );
}
