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
