export interface IDatabaseReturnModel {
  command: string;
  rowCount: number;
  oid: any;
  rows: object[];
  fields: [];
  _parsers: [];
  _types: object;
  RowCtor: any;
  rowAsArray: boolean;
  _prebuiltEmptyResultObject: object;
}
