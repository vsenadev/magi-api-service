import { IProduct } from '@src/model/Product.model';

export interface IDelivery {
  id?: number;
  name: string;
  sender: string | number;
  recipient: string | number;
  send_date: Date;
  expected_date?: Date;
  status_id?: number | string;
  lock_status?: number | string;
  route_id?: string;
  startingAddress: string | number;
  destination: string | number;
  products: IProduct[];
  expected_route?: IRoute[];
  traced_route?: IRoute[];
}

export interface IRoute {
  longitude?: number;
  latitude?: number;
}

export interface IRoutePoint {
  geometry: string;
  legs: ILegs[];
  weight_name: string;
  weight: number;
  duration: number;
  distance: number;
}

export interface ILegs {
  steps: [];
  summary: string;
  weight: number;
  duration: number;
  distance: number;
}

export interface ISteps {
  geometry: any;
}

export interface IRouteInfo {
  coordinates: IRoute[];
  duration: number;
  distance: number;
}
