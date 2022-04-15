import { ICar, IPoint, IRate } from './orderPageData';

export interface IOrderPointData {
  status: boolean;
  value: {
    city: string;
    address: string;
  };
  orderData: IPoint;
}

export interface IOrderModelData {
  status: boolean;
  value: ICar;
}

export interface IOrderOptionsData {
  color: string;
  colorId: string;
  rateName: string;
  rateId: string;
  ratePrice: number;
  rate: IRate;
  dateFrom: number;
  dateTo: number;
  duration: string;
  finalPrice: number;
  isFullTank: boolean | null;
  isNeedChildChair: boolean | null;
  isRightWheel: boolean | null;
}

export interface IOrderDetailsInitialState {
  orderStep: {
    current: string;
    next: string;
  };
  point: IOrderPointData;
  model: IOrderModelData;
  options: IOrderOptionsData;
  total: {
    isModalShown: boolean;
  };
}
