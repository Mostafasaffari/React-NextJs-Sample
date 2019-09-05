import { NextComponentType } from "next";
import Button from "../button/button";

import "./style.css";

interface IProps {
  footerComponent?: React.ReactNode;
  showBox: boolean;
}
const Box: NextComponentType<{}, {}, IProps> = ({
  children,
  showBox,
  footerComponent
}) => {
  return (
    <>
      {showBox && (
        <div className="trip-box-wrapper">
          <div className="trip-box-children">{children}</div>
          <div className="trip-box-footer">{footerComponent}</div>
        </div>
      )}
    </>
  );
};
export default Box;
