import React from "react";
import { DirectionArrows } from "./DirectionArrows";

interface iDirectionHandlerProps {
  direction: string;
  liftToTake: string;
  className?: string;
  InitialMessage: string;
}

export default function DirectionHandler({
  direction,
  liftToTake,
  InitialMessage,
}: iDirectionHandlerProps) {
  return (
    <div
      className={`flex flex-row items-center justify-center ${
        !direction || !liftToTake ? " bg-orange-500" : "bg-green-600"
      }`}
    >
      {direction && liftToTake ? (
        <>
          {direction && direction == "left" && (
            <DirectionArrows direction={direction} />
          )}
          <div className="  py-5 px-5">
            {" "}
            TAKE{" "}
            <span className=" font-extrabold">
              {direction.toUpperCase()}
            </span>{" "}
            TO LIFT{" "}
            <span className=" font-extrabold text-xl p-4 rounded-lg bg-green-700">
              {liftToTake}
            </span>
          </div>

          {direction && direction == "right" && (
            <DirectionArrows direction={direction} />
          )}
        </>
      ) : (
        <p className="py-5">{InitialMessage}</p>
      )}
    </div>
  );
}
