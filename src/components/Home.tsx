import { useEffect, useRef, useState } from "react";
import { ILiftConfig, ILiftStatus } from "../api/Config";
import DirectionHandler from "./DirectionHandler";
import LiftDestinationHandler from "./LiftDestinationHandler";
import FloorHandler from "./FloorHandler";
import { LiftHandlers, Resource } from "../HelperFunctions/StartLiftHelper";

interface IProps {
  title: string;
}

export default function Home({ title }: IProps) {
  const [destination, setDestination] = useState<number>();
  const [currentFloor, setCurrentFloor] = useState<any>(0);
  const [LiftoTake, setLiftToTake] = useState<string>();
  const [direction, setDirection] = useState<string>("");
  const [data, setData] = useState<ILiftConfig>();
  const [stops, setStops] = useState<ILiftStatus>();
  const [liftStart, setliftStart] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  //Get all serviced Floors
  let floors = new Set<number>();
  for (const key in data?.lifts) {
    floors = new Set([...floors, ...(data?.lifts[key].serviced_floors || [])]);
  }
  const allFloors = Array.from(floors);

  const HandleClick = (floor: number) => {
    setDestination(floor);

    //Setting Direction for customers
    Object.keys(data?.lifts || {}).forEach((keys) => {
      if (data?.lifts[keys].serviced_floors.includes(floor)) {
        setDirection(data.lifts[keys].direction);
        setLiftToTake(keys);
        setTimeout(() => {
          setDirection("");
          // setLiftToTake();
        }, 2000);
      }
    });
  };

  function StartLiftHelper2(data: ILiftStatus | any) {
    //Looping through each Lift
    Object.keys(data?.lifts || {}).forEach((keys) => {
      const destinations = data?.lifts[keys].destinations ?? [];
      if (destinations.length > 0) {
        setTimeout(() => {
          setCurrentFloor(destinations.pop() || 0);
          StartLiftHelper2(data);
        }, 5000);
      }
    });
  }

  useEffect(() => {
    LiftHandlers.HANDLE_START_FLOOR(currentFloor);
  }, [currentFloor]);

  useEffect(() => {
    if (liftStart === true) {
      StartLiftHelper2(stops);
    }
  }, [liftStart === true]);

  useEffect(() => {
    LiftHandlers.FETCHER(Resource.LIFTCONFIG, Resource.GET_REQUEST).then(
      (res) => setData(res)
    );
  }, []);

  useEffect(() => {
    LiftHandlers.FETCHER(Resource.SET_DESTINATION, Resource.POST_REQUEST, {
      start: currentFloor ?? 0,
      destination: destination,
    });

    LiftHandlers.FETCHER(Resource.STATUS, Resource.GET_REQUEST).then((res) =>
      setStops(res)
    );
  }, [destination, currentFloor]);

  return (
    <div className=" bg-[#213446] w-full min-h-screen flex flex-col  items-center  text-white">
      <p className=" font-extrabold text-4xl w-full h-32 bg-red-500 flex items-center justify-center">
        {title}
      </p>
      <p>{message}</p>
      <div className="max-w-5xl min-w-[600px] flex flex-row mt-12">
        <FloorHandler
          setMessage={setMessage}
          setStart={setliftStart}
          floors={allFloors}
          currentFloor={currentFloor}
          HandleOnClick={HandleClick}
          data={stops}
        />
        <div className=" h-92 flex flex-col  p-3 rounded-lg bg-black/20">
          <DirectionHandler
            direction={direction}
            liftToTake={LiftoTake ?? ""}
            InitialMessage="Next Customer"
          />
          <LiftDestinationHandler stops={stops} current={currentFloor} />
        </div>
      </div>
    </div>
  );
}
