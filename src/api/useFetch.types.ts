export interface Episode {
  id: number;
  episode: string;
}

export interface Record {
  image: string;
  id: string;
  name: string;
  gender: string;
  species: string;
  episode: Episode[];
}

export interface Data {
  numberOfRecords: number;
  records: Record[];
}

export interface FetchResponse {
  loading: boolean;
  data?: Data;
}

export interface FetchNumberOfRecords {
  loading: boolean;
  data: number;
}
