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

const RevenueMonths = ({ width, height }) => {
  const paymentLogReducer = useSelector((state) => ({ ...state.paymentLog }));
  const monthlyRevenue = paymentLogReducer.revenue.monthlyRevenue;
  const monthlyRevenueOfTheYearWithTheHighestRevenue =
    paymentLogReducer.revenue.monthlyRevenueOfTheYearWithTheHighestRevenue;
  const monthlyRevenueOfCurrentYear =
    paymentLogReducer.revenue.monthlyRevenueOfCurrentYear;
  const monthOfTheYearWithTheHighestRevenue =
    paymentLogReducer.revenue.monthOfTheYearWithTheHighestRevenue;

  return (
    <div style={{ width: width, height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={monthlyRevenue}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="months" />
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
        <XAxis type="number" dataKey="months" name="months" unit="" />
        <YAxis type="number" dataKey="total" name="total" unit="$" />
        <XAxis type="number" dataKey="months" name="months" unit="" />
        <ZAxis type="number" range={[100]} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        <Scatter
          name="Th??ng c???a n??m hi???n t???i"
          data={monthlyRevenueOfCurrentYear}
          fill="#8884d8"
          line
          shape="dot"
        />
        <Scatter
          name="Th??ng ?????t doanh thu cao nh???t"
          data={monthOfTheYearWithTheHighestRevenue}
          fill="#ff0000"
          line
          shape="star"
        />
        <Scatter
          name="N??m c?? doanh thu cao nh???t"
          data={monthlyRevenueOfTheYearWithTheHighestRevenue}
          fill="#82ca9d"
          line
          shape="square"
        />
      </ScatterChart>
    </div>
  );
};

export default RevenueMonths;
