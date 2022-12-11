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

const RevenueYears = ({ width, height }) => {
  const paymentLogReducer = useSelector((state) => ({ ...state.paymentLog }));
  const quarterlyRevenueForTheCurrentYear =
    paymentLogReducer.revenue.quarterlyRevenueForTheCurrentYear;
  const quarterOfTheYearWithTheHighestRevenue =
    paymentLogReducer.revenue.quarterOfTheYearWithTheHighestRevenue;
  const quarterlyRevenueOfEachYear =
    paymentLogReducer.revenue.quarterlyRevenueOfEachYear;

  return (
    <div style={{ width: width, height: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={quarterlyRevenueOfEachYear}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="quarters" />
          <YAxis unit="$"/>
          <Tooltip />
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
          <ReferenceLine y={0} stroke="#000" />
          <Brush dataKey="years" height={30} stroke="#8884d8" />
          <Bar dataKey="total" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
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
        <XAxis type="number" dataKey="quarters" name="quarters" unit="" />
        <YAxis type="number" dataKey="total" name="total" unit="$" />
        <ZAxis type="number" range={[100]} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        <Scatter
          name="Quý của năm hiện tại"
          data={quarterlyRevenueForTheCurrentYear}
          fill="#8884d8"
          line
          shape="dot"
        />
        <Scatter
          name="Quý đạt doanh thu cao nhất"
          data={quarterOfTheYearWithTheHighestRevenue}
          fill="#ff0000"
          line
          shape="star"
        />
      </ScatterChart>
      
    </div>
  );
};

export default RevenueYears;
