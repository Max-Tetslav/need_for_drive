export interface IBreadcrumbRoute {
  id: number;
  path: string;
  type: string;
  breadcrumbName: string;
  isComplete: boolean;
  isCurrent: boolean;
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
  id: string;
  price: number;
  rateTypeId?: IRateTypeId;
}
