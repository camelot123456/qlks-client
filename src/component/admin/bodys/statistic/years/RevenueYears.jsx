import React, { PureComponent } from "react";
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
} from "recharts";

const RevenueYears = ({width, height}) => {
  const paymentLogReducer = useSelector((state) => ({ ...state.paymentLog }));
  const revenueStatisticsByYear =
    paymentLogReducer.revenue.revenueStatisticsByYear;

  useEffect(() => {
    console.log(revenueStatisticsByYear);
  }, [revenueStatisticsByYear]);

  return (
    <div style={{width: width, height: height}}>
      
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={width}
          height={height}
          data={revenueStatisticsByYear}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="years"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="total" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueYears;
