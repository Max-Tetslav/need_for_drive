import { IBreadcrumbRoute } from '@models/orderPageData';

const breadcrumbRoutes: IBreadcrumbRoute[] = [
  {
    id: 0,
    path: '/order/place',
    breadcrumbName: 'Местоположение',
    type: 'point',
    isComplete: true,
    isCurrent: true,
  },
  {
    id: 1,
    path: '/order/model',
    breadcrumbName: 'Модель',
    type: 'model',
    isComplete: false,
    isCurrent: false,
  },
  {
    id: 2,
    path: '/order/options',
    breadcrumbName: 'Дополнительно',
    type: 'options',
    isComplete: false,
    isCurrent: false,
  },
  {
    id: 3,
    path: '/order/total',
    breadcrumbName: 'Итого',
    type: 'total',
    isComplete: false,
    isCurrent: false,
  },
];

export default breadcrumbRoutes;
