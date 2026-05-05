import type { Request, Response } from "express";
import type { CurrencyResponse } from "../types/currency.types.js";

export const getRates = async (
  req: Request<{}, CurrencyResponse, {}, { base?: string }>,
  res: Response<CurrencyResponse>,
) => {
  try {
    const base = req.query.base || "USD";

    const response = await fetch(`https://open.er-api.com/v6/latest/${base}`);

    const data = await response.json();

    if (data.result !== "success") {
      return res.status(500).json({
        status: "error",
        message: "Ошибка внешнего API",
      });
    }

    return res.json({
      status: "ok",
      base: data.base_code,
      rates: data.rates,
    });
  } catch (e) {
    console.error("Currency API error:", e);

    return res.status(500).json({
      status: "error",
      message: "Ошибка получения курсов",
    });
  }
};
