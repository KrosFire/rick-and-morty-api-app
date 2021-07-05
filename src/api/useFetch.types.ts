export interface Episode {
  id: number;
  episode: string;
}

export interface Result {
  image: string;
  id: string;
  name: string;
  gender: string;
  species: string;
  episode: Episode[];
}

export interface Info {
  count: string;
}

export interface ApiResponse {
  info: Info;
  results: Result[];
}

export interface Data {
  numberOfRecords: number;
  records: Result[];
}

export interface FetchResponse {
  loading: boolean;
  data?: Data;
}

export interface FetchNumberOfRecords {
  loading: boolean;
  data: number;
}
