import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import style from "../../css/graphics.module.css";

export default function Column({ data }) {
  return (
    <div className={style.container}>
      <h1 className={style.title}> Quantidade de Usuários por Faixa Etária</h1>
      <BarChart width={530} height={380} data={Array.isArray(data) ? data : []}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={"idade"} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="valor" fill="#0048adff" />
      </BarChart>
    </div>
  );
}
