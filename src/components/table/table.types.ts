export enum ColumnTypes {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  GENDER = "GENDER",
  ACTION = "ACTION",
}

export interface Columns {
  type: ColumnTypes;
  name: string;
}

export interface Field {
  content: string;
}

export interface TableRecord {
  id: string;
  record: Field[];
}
