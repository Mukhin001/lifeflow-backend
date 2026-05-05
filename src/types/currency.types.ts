export type CurrencyResponse =
  | {
      status: "ok";
      base: string;
      rates: Record<string, number>;
    }
  | {
      status: "error";
      message: string;
    };

export interface ExternalApiResponse {
  result: string;
  base_code: string;
  rates: Record<string, number>;
}
