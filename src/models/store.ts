import { ICar, IPoint } from './orderPageData';

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
  rateName: string;
  rateId: string;
  ratePrice: number;
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
