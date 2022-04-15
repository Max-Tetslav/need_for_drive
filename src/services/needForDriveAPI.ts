import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query/react';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { ICar, ICarCategory, IOrder, IRate } from '@models/orderPageData';
import { REQUEST_HEADER_KEY } from '@utils/constants/mapboxData';

const needForDriveApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-factory.simbirsoft1.com/api/db',
    prepareHeaders: (headers) => {
      if (REQUEST_HEADER_KEY) {
        headers.set('X-Api-Factory-Application-Id', REQUEST_HEADER_KEY);
      }

      return headers;
    },
  }),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    getCitiesList: build.query({
      query: () => ({
        url: '/city',
      }),
    }),
    getPointsList: build.query({
      query: () => ({
        url: '/point',
      }),
    }),
    getCarsCategories: build.query<{ data: Array<ICarCategory> }, string>({
      query: () => ({
        url: '/category',
      }),
    }),
    getCarsList: build.query<{ data: Array<ICar> }, string>({
      query: () => ({
        url: '/car',
      }),
    }),
    getRatesList: build.query<{ data: Array<IRate> }, string>({
      query: () => ({
        url: '/rate',
      }),
    }),
    postOrder: build.mutation<{ data: { id: string } }, IOrder>({
      query: (post) => ({
        url: '/order',
        method: 'POST',
        body: post,
      }),
    }),
    getOrder: build.query<{ data: IOrder }, string>({
      query: (id) => ({
        url: `/order/${id}`,
      }),
    }),
  }),
});

export default needForDriveApi;
