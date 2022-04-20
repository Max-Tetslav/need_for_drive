export interface IBreadcrumbRoute {
  id: number;
  path: string;
  type: string;
  breadcrumbName: string;
}

export enum ELocationInputTypes {
  CITY = 'city',
  POINT = 'point',
  COLOR = 'color',
  RATE = 'rate',
  DURATION = 'duration',
  TANK = 'tank',
  CHAIR = 'chair',
  WHEEL = 'wheel',
}

export enum ERadioGroupNames {
  MODEL = 'model',
  COLOR = 'color',
  RATE = 'rate',
}

export interface ICity {
  name: string;
  id: string;
}

export interface IPoint {
  name: string;
  address: string;
  id: string;
  cityId: {
    name: string;
    id: string;
  };
}

export interface ILocationResponse {
  data: ICity[] | IPoint[];
}

export interface ICarCategory {
  name: string;
  id: string;
}

export interface ICar {
  id: string;
  priceMax: number;
  priceMin: number;
  name: string;
  number: string;
  tank?: number;
  thumbnail: {
    path: string;
  };
  categoryId: {
    id: string;
  };
  colors: string[];
}

export enum EOrderItemTypes {
  POINT = 'point',
  MODEL = 'model',
  COLOR = 'color',
  DURATION = 'duration',
  RATE = 'rate',
  TANK = 'tank',
  CHAIR = 'chair',
  WHEEL = 'wheel',
}

export interface IRateTypeId {
  id: string;
  name: string;
  unit: string;
}

export interface IRate {
  price: number;
  rateTypeId?: IRateTypeId;
}

export interface IOrder {
  orderStatusId: { name: string; id: string };
  cityId: ICity;
  pointId: IPoint;
  carId: ICar;
  dateFrom: number;
  dateTo: number;
  price: number;
  color?: string;
  rateId?: IRate;
  isFullTank?: boolean;
  isNeedChildChair?: boolean;
  isRightWheel?: boolean;
}
