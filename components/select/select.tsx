import { NextComponentType } from "next";

import "./style.css";

interface IProps {
  text: string | string[];
}
const Select: NextComponentType<{}, {}, IProps> = ({ text }) => {
  return (
    <span className="trip-select-wrapper">
      <span>{text instanceof Array ? text.join(", ") : text}</span>
    </span>
  );
};
export default Select;
