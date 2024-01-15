import React from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

interface IProps {
  direction: string;
}

export const DirectionArrows = ({ direction }: IProps) => {
  return (
    <div>
      {direction && direction == "right" ? (
        <div className=" bg-green-600 py-5 px-2">
          <FaArrowRight size={20} />
        </div>
      ) : (
        direction == "left" && (
          <div className=" bg-green-600 py-5 px-2">
            <FaArrowLeft size={20} />
          </div>
        )
      )}
    </div>
  );
};
