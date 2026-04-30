export interface LatLng {
  lat: number;
  lng: number;
}

type Status = "ok" | "error";
type GeoStatus = "loading" | "success" | "denied";
export type Route = [number, number][];

export interface SendLocationResponse {
  status: GeoStatus;
  message: string;
  received?: LatLng;
}

export type CalculateRouteResponse = {
  status: Status;
  route?: Route;
  message?: string;
};

export type CalculateRouteRequest = {
  start: LatLng;
  end: LatLng;
};
