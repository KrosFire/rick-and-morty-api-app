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

export interface Action {
  icon: string;
  actionID: number;
}

export interface Field {
  content: string | Action;
}
