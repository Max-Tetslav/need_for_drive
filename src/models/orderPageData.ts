export interface IBreadcrumbRoute {
  id: number;
  path: string;
  breadcrumbName: string;
  isComplete: boolean;
}

export enum ELocationInputTypes {
  CITY = 'city',
  POINT = 'point',
}

export interface ICity {
  name: string;
  id: string;
}

export interface IPoint {
  name: string;
  address: string;
  id: string;
  cityId: {
    name: string;
    id: string;
  };
}

export interface ILocationResponse {
  data: ICity[] | IPoint[];
}
