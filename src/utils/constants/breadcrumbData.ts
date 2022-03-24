import { IBreadcrumbRoute } from '@models/orderPageData';

const breadcrumbRoutes: IBreadcrumbRoute[] = [
  {
    id: 0,
    path: '/order/place',
    breadcrumbName: 'Местоположение',
    isComplete: true,
  },
  {
    id: 1,
    path: '/order/model',
    breadcrumbName: 'Модель',
    isComplete: false,
  },
  {
    id: 2,
    path: '/order/options',
    breadcrumbName: 'Дополнительно',
    isComplete: false,
  },
  {
    id: 3,
    path: '/order/submit',
    breadcrumbName: 'Итого',
    isComplete: false,
  },
];

export default breadcrumbRoutes;
