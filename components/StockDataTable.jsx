"use client"
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StockDataTable({ ticker, period, interval }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/api/stock?ticker=${ticker}&period=${period}&interval=${interval}`
        );
        const result = await response.json();
        if (response.ok) {
          setData(result);
          setError(null);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError("Failed to fetch stock data");
      }
      setLoading(false);
    };
    fetchData();
  }, [ticker, period, interval]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Data</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Open</TableHead>
              <TableHead>High</TableHead>
              <TableHead>Low</TableHead>
              <TableHead>Close</TableHead>
              <TableHead>Volume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(row.Date).toLocaleDateString()}</TableCell>
                <TableCell>{row.Open.toFixed(2)}</TableCell>
                <TableCell>{row.High.toFixed(2)}</TableCell>
                <TableCell>{row.Low.toFixed(2)}</TableCell>
                <TableCell>{row.Close.toFixed(2)}</TableCell>
                <TableCell>{row.Volume}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}