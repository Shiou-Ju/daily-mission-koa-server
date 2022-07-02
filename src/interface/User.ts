// TODO: can interface be converted to schemas, or vice versa
export interface User {
  id: number;
  name: string;
  // TODO: encrypt password if possible
  password: string;
  /** 連續達成天數 */
  streak: number;
}
