import axios from "axios";
import { IFilter } from "../interfaces/IFilter";

const getCities = async () => {
  const response = await axios.get("https://plan.1stquest.com/api/v1/cities");
  return response.data.data;
};
const getItinerariesByFilters = async (filters: IFilter) => {
  const citiesStr = filters.cities.length
    ? `cities[]=${filters.cities.join("&cities[]=")}`
    : "";
  const response = await axios.get(
    `https://plan.1stquest.com/api/v1/itineraries?${citiesStr}`
  );
  return response.data.data;
};

export { getCities, getItinerariesByFilters };
