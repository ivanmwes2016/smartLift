export enum Resource {
  LIFTCONFIG = "/api/lift/config/",
  STATUS = "/api/lift/status/",
  SET_DESTINATION = "/api/lift/request/",
  START_LIFT = "/api/liftstart/",
  GET_REQUEST = "GET",
  POST_REQUEST = "POST",
}

export class LiftHandlers {
  static async FETCHER(endPoint: string, requestType: string, data?: any) {
    try {
      const res: any = await fetch(endPoint, {
        method: requestType,
        headers: {
          "Content-Type": "application/json",
        },
        body: Resource.POST_REQUEST && JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Error status:", res.statusText);
      }
      return await res.json();
    } catch (error) {}
  }

  static SET_BUTTON_CLICK(
    currentState: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean>>,
    setMessage: React.Dispatch<React.SetStateAction<string>>
  ) {
    if (!currentState) {
      setState(!currentState);
    }
  }

  static HANDLE_START_FLOOR(startFloor: number) {
    LiftHandlers.FETCHER(Resource.START_LIFT, Resource.POST_REQUEST, {
      start: startFloor,
    });
  }
}
