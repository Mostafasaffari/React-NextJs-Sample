import { NextComponentType } from "next";

import "./style.css";
interface IProps {
  value: string;
  checked: boolean;
  title: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const CheckBox: NextComponentType<{}, {}, IProps> = ({
  value,
  checked,
  title,
  onChange
}) => {
  return (
    <div className="trip-checkbox-wrapper">
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span>{title}</span>
    </div>
  );
};
export default CheckBox;
