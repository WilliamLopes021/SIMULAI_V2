import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import style from "../../css/graphics.module.css";

export default function LineGraphic({ data }) {
  return (
    <div className={style.container}>
      <h1 className={style.title}> Quantidade de Usuários por Faixa Etária</h1>

      <LineChart width={530} height={380} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="idade" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="valor"
          stroke="#8884d8"
          strokeWidth={3}
        />
      </LineChart>
    </div>
  );
}
