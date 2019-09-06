import { NextComponentType } from "next";
import { IImage } from "../../../interfaces/IItinerary";

import "./style.css";

interface IProps {
  images: IImage[];
  days: number;
  cities: string[];
  price: string;
}
const CardInfo: NextComponentType<{}, {}, IProps> = ({
  images,
  days,
  cities,
  price
}) => {
  return (
    <div className="trip-cardinfo-wrapper">
      <h4>
        {days} days in{" "}
        {cities.length === 1
          ? cities[0]
          : cities.map((item, index) => {
              if (index === cities.length - 1) {
                return " and " + item;
              } else if (index === cities.length - 2) {
                return item;
              } else {
                return item + ", ";
              }
            })}
      </h4>
      <span>From ${price} per person</span>
      <div className="images">
        {images.map(item => (
          <img src={item.src} alt={item.alt} />
        ))}
      </div>
    </div>
  );
};

export default CardInfo;
