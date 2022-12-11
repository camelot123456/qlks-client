import React from "react";
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

const RevenueWeeks = ({ width, height }) => {
  const paymentLogReducer = useSelector((state) => ({ ...state.paymentLog }));
  const weeklyRevenue = paymentLogReducer.revenue.weeklyRevenue;
  const weekOfTheYearWithTheHighestRevenue =
    paymentLogReducer.revenue.weekOfTheYearWithTheHighestRevenue;
  const weeklyRevenueOfTheYearWithTheHighestRevenue =
    paymentLogReducer.revenue.weeklyRevenueOfTheYearWithTheHighestRevenue;
  const currentYearsWeeklyRevenue =
    paymentLogReducer.revenue.currentYearsWeeklyRevenue;

  return (
    <div style={{ width: width, height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={weeklyRevenue}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="weeks" />
          <YAxis unit="$" />
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
        <XAxis type="number" dataKey="weeks" name="weeks" unit="" />
        <YAxis type="number" dataKey="total" name="total" unit="$" />
        <XAxis type="number" dataKey="weeks" name="weeks" unit="" />
        <ZAxis type="number" range={[50]} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        <Scatter
          name="Tuần của năm hiện tại"
          data={currentYearsWeeklyRevenue}
          fill="#8884d8"
          line
          shape="star"
        />
        <Scatter
          name="Tuần đạt doanh thu cao nhất"
          data={weekOfTheYearWithTheHighestRevenue}
          fill="#ff0000"
          line
          shape="star"
        />
        <Scatter
          name="Năm có tuần doanh thu cao nhất"
          data={weeklyRevenueOfTheYearWithTheHighestRevenue}
          fill="#82ca9d"
          line
          shape="square"
        />
      </ScatterChart>
    </div>
  );
};

export default RevenueWeeks;
