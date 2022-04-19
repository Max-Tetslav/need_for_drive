import { ICar, IPoint, IRate } from './orderPageData';

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
  point: IPoint;
  model: ICar;
  options: IOrderOptionsData;
  total: {
    isModalShown: boolean;
  };
}
