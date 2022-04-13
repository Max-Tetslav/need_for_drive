import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query/react';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { ICar, ICarCategory, IOrder, IRate } from '@models/orderPageData';
import { REQUEST_HEADER_KEY } from '@utils/constants/mapboxData';

const needForDriveApi = createApi({
  reducerPath: 'locationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-factory.simbirsoft1.com/api/db',
  }),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    getCitiesList: build.query({
      query: () => ({
        url: '/city',
        headers: {
          'X-Api-Factory-Application-Id': REQUEST_HEADER_KEY,
        },
      }),
    }),
    getPointsList: build.query({
      query: () => ({
        url: '/point',
        headers: {
          'X-Api-Factory-Application-Id': REQUEST_HEADER_KEY,
        },
      }),
    }),
    getCarsCategories: build.query<{ data: Array<ICarCategory> }, string>({
      query: () => ({
        url: '/category',
        headers: {
          'X-Api-Factory-Application-Id': REQUEST_HEADER_KEY,
        },
      }),
    }),
    getCarsList: build.query<{ data: Array<ICar> }, string>({
      query: () => ({
        url: '/car',
        headers: {
          'X-Api-Factory-Application-Id': REQUEST_HEADER_KEY,
        },
      }),
    }),
    getRatesList: build.query<{ data: Array<IRate> }, string>({
      query: () => ({
        url: '/rate',
        headers: {
          'X-Api-Factory-Application-Id': REQUEST_HEADER_KEY,
        },
      }),
    }),
    postOrder: build.mutation<unknown, IOrder>({
      query: (post) => ({
        url: '/order',
        method: 'POST',
        headers: {
          'X-Api-Factory-Application-Id': REQUEST_HEADER_KEY,
        },
        body: post,
      }),
    }),
  }),
});

export default needForDriveApi;
