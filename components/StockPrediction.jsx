"use client"
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StockPrediction({ ticker, period }) {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/predict?ticker=${ticker}&period=${period}`);
        const result = await response.json();
        if (response.ok) {
          setPrediction(result);
          setError(null);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError("Failed to fetch prediction");
      }
      setLoading(false);
    };
    fetchPrediction();
  }, [ticker, period]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Prediction</CardTitle>
      </CardHeader>
      <CardContent>
        {prediction && (
          <div className="space-y-2">
            <p><strong>Ticker:</strong> {prediction.ticker}</p>
            <p><strong>Last Actual Price:</strong> ${prediction.last_actual_price}</p>
            <p><strong>Predicted Price:</strong> ${prediction.last_predicted_price}</p>
            <p><strong>Mean Squared Error:</strong> {prediction.mse}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}