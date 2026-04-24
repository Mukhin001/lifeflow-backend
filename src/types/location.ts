export type LatLng = {
  lat: number;
  lng: number;
};

export type GeoStatus = "loading" | "success" | "denied";

export type SendLocationResponse = {
  status: "ok" | "error" | "denied";
  message: string;
  received?: LatLng;
};
