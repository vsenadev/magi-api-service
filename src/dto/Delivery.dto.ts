import { IProduct } from '@src/model/Product.model';
import { CreateDeliverySchema } from '@src/schema/Delivery.Schema';
import { IRoute } from '@src/model/Delivery.model';

export class CreateDeliveryDto {
  name: string;
  sender: string;
  recipient: string;
  send_date: Date;
  expectedDate?: Date;
  routeId?: string;
  startingAddress: number;
  destinationAddress: number;
  startingCep?: string;
  startingNeighborhood: string;
  startingCity?: string;
  startingNumber?: number;
  startingState?: string;
  startingStreet?: string;
  destinationCep?: string;
  destinationNeighborhood: string;
  destinationCity?: string;
  destinationNumber?: number;
  destinationState?: string;
  destinationStreet?: string;
  expectedRoute?: IRoute[];
  tracedRoute?: IRoute[];
  products: IProduct[];
  distance: number;
  pdf: any;

  constructor(props: CreateDeliveryDto) {
    const parsed = CreateDeliverySchema.parse(props);
    this.name = parsed.name;
    this.sender = parsed.sender;
    this.recipient = parsed.recipient;
    this.send_date = parsed.send_date;
    this.expectedDate = parsed.expected_date;
    this.routeId = parsed.route_id;
    this.startingAddress = parsed.starting_address;
    this.destinationAddress = parsed.destination_address;
    this.startingCep = parsed.starting_cep;
    this.startingCity = parsed.starting_city;
    this.startingNumber = parsed.starting_number;
    this.startingState = parsed.starting_state;
    this.startingStreet = parsed.starting_street;
    this.destinationCep = parsed.destination_cep;
    this.destinationCity = parsed.destination_city;
    this.destinationNumber = parsed.destination_number;
    this.destinationState = parsed.destination_state;
    this.destinationStreet = parsed.destination_street;
    this.startingNeighborhood = parsed.starting_neighborhood;
    this.destinationNeighborhood = parsed.destination_neighborhood;
    this.products = parsed.products;
    this.expectedRoute = parsed.expected_route;
    this.tracedRoute = parsed.traced_route;
    this.distance = parsed.distance;
  }
}

export class ValidateDeliveryDto {
  email: string;
  password: string;
  id_route: string;

  constructor(props: ValidateDeliveryDto) {
    this.email = props.email;
    this.password = props.password;
    this.id_route = props.id_route;
  }
}
