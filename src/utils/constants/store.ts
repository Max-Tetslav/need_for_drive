import { IPoint } from '@models/orderPageData';
import { IOrderDetailsInitialState } from '@models/store';
import { DEFAULT_CITY } from './locationData';

export const initialLocationOrderData: IPoint = {
  cityId: {
    name: DEFAULT_CITY,
    id: '',
  },
  address: '',
  name: '',
  id: '',
};

const initialState: IOrderDetailsInitialState = {
  point: initialLocationOrderData,
  model: {
    id: '',
    priceMax: 0,
    priceMin: 0,
    name: '',
    number: '',
    tank: 0,
    thumbnail: {
      path: '',
    },
    categoryId: {
      id: '',
    },
    colors: [],
  },
  options: {
    color: '',
    colorId: '',
    rateName: '',
    rate: {
      price: 0,
      rateTypeId: {
        name: '',
        id: '',
        unit: '',
      },
    },
    rateId: '',
    ratePrice: 0,
    dateFrom: 0,
    dateTo: 0,
    duration: '',
    finalPrice: 0,
    isFullTank: null,
    isNeedChildChair: null,
    isRightWheel: null,
  },
  total: {
    isModalShown: false,
  },
};

export default initialState;
