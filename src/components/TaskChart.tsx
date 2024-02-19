import { PieChart, Pie, Tooltip } from "recharts";

const data01 = [
  { name: "Task Pending", value: 5 },
  { name: "Task Completed", value: 2 },
  { name: "Task Need To Review", value: 3 },
];

export default function App() {
  return (
    <PieChart width={1000} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data01}
        cx={400}
        cy={150}
        outerRadius={120}
        fill="#8884d8"
        label
      />
      
      <Tooltip />
    </PieChart>
  );
}
