import type { Request, Response } from "express";
import type {
  CurrencyResponse,
  ExternalApiResponse,
} from "../types/currency.types.js";

export const getRates = async (
  req: Request<{}, {}, {}, { base?: string }>,
  res: Response<CurrencyResponse>,
) => {
  try {
    const base = req.query.base || "USD";

    const response = await fetch(`https://open.er-api.com/v6/latest/${base}`);

    if (!response.ok) {
      return res.status(500).json({
        status: "error",
        message: "Ошибка запроса к внешнему API",
      });
    }

    const raw = await response.json();

    if (
      raw.result !== "success" ||
      typeof raw.base_code !== "string" ||
      typeof raw.rates !== "object" ||
      !raw.rates
    ) {
      return res.status(500).json({
        status: "error",
        message: "Некорректный ответ API https://open.er-api.com",
      });
    }

    const data: ExternalApiResponse = raw;

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
