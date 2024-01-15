import React from "react";
import FloorAndArrow from "./FloorAndArrow";
import { ILiftStatus } from "../api/Config";

interface iLiftDestinationHandlerProps {
  stops: ILiftStatus | undefined;
  current: number;
}

export default function LiftDestinationHandler({
  stops,
  current,
}: iLiftDestinationHandlerProps) {
  return (
    <div className=" grid grid-flow-col gap-5 mt-3 " key={"x"}>
      {Object.keys(stops?.lifts || {}).map((key) => {
        return (
          <div key={`l-${key}`}>
            <FloorAndArrow
              floor={key}
              title={"Lift"}
              currentFloor={current}
              stops={stops?.lifts[key].destinations ?? []}
            />
            <>
              {stops?.lifts[key].destinations?.map((dest) => (
                <ul className="mt-5">
                  <li className={`m-auto w-12 h-12 bg-[#587890] rounded-full`}>
                    <p
                      className={`h-full w-full flex justify-center items-center`}
                    >
                      {dest}
                    </p>
                  </li>
                </ul>
              ))}
            </>
          </div>
        );
      })}
    </div>
  );
}
