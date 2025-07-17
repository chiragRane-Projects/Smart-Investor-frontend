"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StockDataTable from "@/components/StockDataTable";
import StockPrediction from "@/components/StockPrediction";

export default function Home() {
  const [ticker, setTicker] = useState("AAPL");
  const [period, setPeriod] = useState("1y");
  const [interval, setInterval] = useState("1d");

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Stock Analysis Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Enter stock ticker (e.g., AAPL)"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              className="max-w-xs"
            />
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="border rounded-md p-2"
            >
              <option value="1mo">1 Month</option>
              <option value="6mo">6 Months</option>
              <option value="1y">1 Year</option>
              <option value="2y">2 Years</option>
            </select>
            <select
              value={interval}
              onChange={(e) => setInterval(e.target.value)}
              className="border rounded-md p-2"
            >
              <option value="1d">Daily</option>
              <option value="1wk">Weekly</option>
              <option value="1mo">Monthly</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StockDataTable ticker={ticker} period={period} interval={interval} />
            <StockPrediction ticker={ticker} period={period} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}