"use client"
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function StockChart({ ticker, period }) {
  const [chartUrl, setChartUrl] = useState(null);
  const [mse, setMse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChart = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/predict/chart?ticker=${ticker}&period=${period}`);
        const result = await response.json();
        if (response.ok) {
          setChartUrl(`http://127.0.0.1:5000${result.chart_url}`);;
          setMse(result.mse);
          setError(null);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError("Failed to fetch chart");
      }
      setLoading(false);
    };
    fetchChart();
  }, [ticker, period]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prediction Chart</CardTitle>
      </CardHeader>
      <CardContent>
        {chartUrl && (
          <div className="space-y-2">
            <Image
              src={chartUrl}
              alt={`${ticker} prediction chart`}
              width={500}
              height={300}
              className="w-full h-auto"
            />
            <p><strong>Mean Squared Error:</strong> {mse}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}