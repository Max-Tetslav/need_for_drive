export interface IGeoPoint {
  type: string;
  properties: { [name: string]: unknown } | null;
  geometry: {
    type: string;
    coordinates: number[];
  };
}
