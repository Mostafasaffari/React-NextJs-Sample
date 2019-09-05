import { NextComponentType } from "next";

import "./style.css";

interface IProps {
  text: string | string[];
  onClick?: () => void;
}
const Select: NextComponentType<{}, {}, IProps> = ({ text, onClick }) => {
  return (
    <span className="trip-select-wrapper" onClick={onClick}>
      <span>{text instanceof Array ? text.join(", ") : text}</span>
    </span>
  );
};
export default Select;
