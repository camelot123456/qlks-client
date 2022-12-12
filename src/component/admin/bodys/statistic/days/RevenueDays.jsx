import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  ZAxis,
  Scatter,
  Brush,
  ReferenceLine,
} from "recharts";

const RevenueDays = ({ width, height }) => {
  const paymentLogReducer = useSelector((state) => ({ ...state.paymentLog }));
  const todaysRevenue = paymentLogReducer.revenue.todaysRevenue;
  const highestRevenueDay = paymentLogReducer.revenue.highestRevenueDay;

  return (
    <div style={{ width: width, height: "100%" }}>
      <ScatterChart
        width={1000}
        height={250}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="days" name="days" unit="" />
        <YAxis type="number" dataKey="total" name="total" unit="$" />
        <ZAxis type="number" range={[50]} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        <Scatter
          name="Ngày của năm hiện tại"
          data={todaysRevenue}
          fill="#8884d8"
          line
          shape="star"
        />
        <Scatter
          name="Ngày đạt doanh thu cao nhất"
          data={highestRevenueDay}
          fill="#ff0000"
          line
          shape="star"
        />
      </ScatterChart>
    </div>
  );
};

export default RevenueDays;
