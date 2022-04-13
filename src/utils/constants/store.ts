import { EOrderItemTypes } from '@models/orderPageData';
import { IOrderDetailsInitialState } from '@models/store';

const initialState: IOrderDetailsInitialState = {
  orderStep: {
    current: EOrderItemTypes.POINT,
    next: EOrderItemTypes.MODEL,
  },
  point: {
    status: false,
    value: {
      city: 'Ульяновск',
      address: '',
    },
    orderData: {
      cityId: {
        name: '',
        id: '',
      },
      address: '',
      name: '',
      id: '',
    },
  },
  model: {
    status: false,
    value: {
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
  },
  options: {
    color: '',
    rateName: '',
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
