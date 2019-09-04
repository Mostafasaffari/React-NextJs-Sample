import { NextComponentType } from "next";

import "./style.css";

interface IProps {
  color: "gray" | "orange" | "blue";
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const Button: NextComponentType<{}, {}, IProps> = ({
  color = "blue",
  text = "Apply",
  onClick
}) => {
  return (
    <button className={`trip-button trip-bg-${color}`} onClick={onClick}>
      {text}
    </button>
  );
};
export default Button;
