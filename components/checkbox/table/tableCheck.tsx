import { NextComponentType } from "next";

import "./style.css";
interface IProps {
  values: string[];
  titles: string[];
  onClick?: (
    value: string
  ) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const TableCheck: NextComponentType<{}, {}, IProps> = ({
  values,
  titles,
  onClick
}) => {
  return (
    <div className="trip-table-check-wrapper">
      {titles.map((item, index) => (
        <div key={index} onClick={onClick(item)}>
          <span className={values.includes(item) ? "checked" : ""}>{item}</span>
        </div>
      ))}
    </div>
  );
};
export default TableCheck;
