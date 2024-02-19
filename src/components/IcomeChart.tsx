
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

const data = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Feb",
    uv: 15000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Mar",
    uv: 0,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Apr",
    uv: 0,
    pv: 3908,
    amt: 2000
  },
  {
    name: "May",
    uv: 0,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Jun",
    uv: 0,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Jul",
    uv: 0,
    pv: 4300,
    amt: 2100
  },
  {
    name: "Aug",
    uv: 0,
    pv: 4300,
    amt: 2100
  },
  {
    name: "Sep",
    uv: 0,
    pv: 4300,
    amt: 2100
  },
  {
    name: "Oct",
    uv: 0,
    pv: 4300,
    amt: 2100
  },
  {
    name: "Nov",
    uv: 0,
    pv: 4300,
    amt: 2100
  },
  {
    name: "Dec",
    uv: 0,
    pv: 0,
    amt: 0
  },
];

export default function IncomeChart() {
  return (
    <AreaChart
      width={1100}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );
}
