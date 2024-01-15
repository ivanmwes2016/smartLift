import React from "react";
import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import App from "./App";
import { Registry, Server, createServer } from "miragejs";
import { AnyModels, AnyFactories, AnyRegistry } from "miragejs/-types";
import CREATE_SERVER from "./api/Config";
import { LiftHandlers } from "./HelperFunctions/StartLiftHelper";
import Home from "./components/Home";

let server: Server<AnyRegistry>;
beforeEach(() => {
  server = createServer({
    routes() {
      this.get("/config/", (schema, request) => {
        return {
          lifts: {
            0: {
              serviced_floors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              direction: "left",
            },
            1: { serviced_floors: [0, 7, 8, 9, 10], direction: "right" },
          },
        };
      });
    },
  });
});
afterEach(() => {
  server.shutdown();
});

test("Renders without Errors", () => {
  const { container, getByText } = render(<App />);
  // console.log(prettyDOM(container))
  expect(getByText("Next Customer")).toBeInTheDocument();
  expect(getByText("Smart Lift")).toBeInTheDocument();
});

describe("FETCHER", () => {
  it("Should Return the lift Config", async () => {
    const res = await LiftHandlers.FETCHER("/config/", "GET");
    expect(res?.lifts[0].serviced_floors.length).toBe(11);
  });

  it("Should Return the lift Config", async () => {
    const res = await LiftHandlers.FETCHER("/config/", "GET");
    expect(res?.lifts[0].serviced_floors.length).toBe(11);
  });
});

describe("Home Component", () => {
  test("renders with the provided title", () => {
    render(<Home title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  test("handles click and sets destination", async () => {
    render(<Home title="Test Title" />);

    const click = fireEvent.click(screen.getByText("Take"));
  });
});
