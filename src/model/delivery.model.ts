export interface IDelivery {
    id?: number;
    name?: string;
    sender?: number;
    recipient?: number;
    send_date?: Date;
    expected_date?: Date;
    status_id?: number;
    lock_status?: number;
    route_id?: string;
    starting_adress?: number;
    destination?: number;
    products?: number;
  }
  
  export interface IDeliveryCode {
    code: number;
  }
  