export interface IItinerary {
  blogUrl?: any;
  cities: City[];
  overView: string;
  slug: string;
  title: string;
  totalPrice: string;
}

interface City {
  days: number;
  images: IImage[];
  landingUrl?: any;
  latitude: string;
  longitude: string;
  name: string;
  nextTransportation: INextTransportation;
  services: IService[];
  slug: string;
  thingsToDo: string;
}

interface IService {
  price: IPrice;
  subTitle: string;
  title: string;
  type: string;
}

interface IPrice {
  max?: any;
  min: number;
}

interface INextTransportation {
  duration?: number;
  price?: number;
  type?: string;
}

export interface IImage {
  alt?: any;
  src: string;
  title?: any;
}
