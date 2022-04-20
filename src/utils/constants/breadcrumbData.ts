import { IBreadcrumbRoute } from '@models/orderPageData';

const breadcrumbRoutes: IBreadcrumbRoute[] = [
  {
    id: 0,
    path: '/order/place',
    breadcrumbName: 'Местоположение',
    type: 'point',
  },
  {
    id: 1,
    path: '/order/model',
    breadcrumbName: 'Модель',
    type: 'model',
  },
  {
    id: 2,
    path: '/order/options',
    breadcrumbName: 'Дополнительно',
    type: 'options',
  },
  {
    id: 3,
    path: '/order/total',
    breadcrumbName: 'Итого',
    type: 'total',
  },
];

export default breadcrumbRoutes;
