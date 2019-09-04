import { NextComponentType } from "next";
import "../../assets/css/main.css";

interface IProps {
  className?: string;
}
const Layout: NextComponentType<{}, {}, IProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};
export default Layout;
