import React from "react";
import { Server, createServer } from "miragejs";

export type ILiftConfig = {
  lifts: {
    [key: number | string]: {
      serviced_floors: number[];
      direction: string;
    };
  };
};

export type ILiftStatus = {
  lifts: {
    [key: number | string]: {
      floor: number;
      destinations: number[];
    };
  };
};

// export default function CREATE_SERVER(label: string) {
//   const liftConfigData: ILiftConfig = {
//     lifts: {
//       0: {
//         serviced_floors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//         direction: "left",
//       },
//       1: { serviced_floors: [0, 7, 8, 9, 10], direction: "right" },
//     },
//   };

//   let liftStatusData: ILiftStatus = {
//     lifts: {
//       0: { floor: 0, destinations: [] },
//       1: { floor: 0, destinations: [] },
//     },
//   };

//   createServer({
//     environment: "dev",
//     routes() {
//       this.get("/api/lift/config/", () => liftConfigData);

//       this.get("/api/lift/status/", (schema, request) => {
//         return liftStatusData;
//       });

//       this.post("/api/lift/request/", async (schema, request) => {
//         let req = JSON.parse(request.requestBody);

//         const { start, destination, liftStart } = req;

//         Object.keys(liftConfigData.lifts || {}).forEach((liftID) => {
//           if (
//             liftConfigData.lifts[liftID].serviced_floors.includes(destination)
//           ) {
//             if (
//               !liftStatusData.lifts[liftID].destinations.includes(
//                 destination
//               ) &&
//               liftStatusData.lifts[liftID].destinations.length <= 3
//             ) {
//               liftStatusData.lifts[liftID].destinations.unshift(destination); // add elements to the beggining of the array.
//             }
//           }
//         });
//       });

//       this.post("/api/liftstart", async (schema, request) => {
//         let req = JSON.parse(request.requestBody);
//         const { start, destination, liftStart } = req;
//         console.log(start);
//         Object.keys(liftStatusData.lifts || {}).forEach((keys) => {
//           const destinations = liftStatusData.lifts[keys].destinations;
//           if (destinations.length > 0) {
//             liftStatusData.lifts[keys].floor = start;
//             !liftStatusData.lifts[keys].destinations.pop();
//           }
//         });

//         // return liftStatusData;
//       });
//     },
//   });
// }

export default function CREATE_SERVER(en: string): Server {
  const liftConfigData: ILiftConfig = {
    lifts: {
      0: {
        serviced_floors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        direction: "left",
      },
      1: { serviced_floors: [0, 7, 8, 9, 10], direction: "right" },
    },
  };

  let liftStatusData: ILiftStatus = {
    lifts: {
      0: { floor: 0, destinations: [] },
      1: { floor: 0, destinations: [] },
    },
  };
  return createServer({
    routes() {
      this.get("/api/lift/config/", () => liftConfigData);

      this.get("/api/lift/status/", (schema, request) => {
        return liftStatusData;
      });

      this.post("/api/lift/request/", async (schema, request) => {
        let req = JSON.parse(request.requestBody);

        const { start, destination, liftStart } = req;

        Object.keys(liftConfigData.lifts || {}).forEach((liftID) => {
          if (
            liftConfigData.lifts[liftID].serviced_floors.includes(destination)
          ) {
            if (
              !liftStatusData.lifts[liftID].destinations.includes(
                destination
              ) &&
              liftStatusData.lifts[liftID].destinations.length <= 3
            ) {
              liftStatusData.lifts[liftID].destinations.unshift(destination); // add elements to the beggining of the array.
            }
          }
        });
      });

      this.post("/api/liftstart", async (schema, request) => {
        let req = JSON.parse(request.requestBody);
        const { start, destination, liftStart } = req;
        console.log(start);
        Object.keys(liftStatusData.lifts || {}).forEach((keys) => {
          const destinations = liftStatusData.lifts[keys].destinations;
          if (destinations.length > 0) {
            liftStatusData.lifts[keys].floor = start;
            !liftStatusData.lifts[keys].destinations.pop();
          }
        });

        // return liftStatusData;
      });
    },
  });
}
