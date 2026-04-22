export type SendLocationRequest =
  | { type: "success"; lat: number; lng: number }
  | { type: "denied" };

export type SendLocationResponse = {
  status: "ok" | "error" | "denied";
  message: string;
  received?: {
    lat: number;
    lng: number;
  };
};
