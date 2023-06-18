import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
dotenv.config();
export class GlobalHelper {
  private static instance: GlobalHelper;
  private constructor() {}

  public static getInstance() {
    if (!GlobalHelper.instance) {
      GlobalHelper.instance = new GlobalHelper();
    }
    return GlobalHelper.instance;
  }
  public getUniqueId() {
    const id = uuidv4();
    return id;
  }
  public isEmpty<T>(input: T): boolean {
    if (typeof input === 'undefined' || input === null) {
      return true; // Variable is empty
    }
    if (Array.isArray(input)) {
      return input.length === 0; // Array is empty
    }
    if (typeof input === 'object') {
      return Object.keys(input).length === 0; // Object is empty
    }
    return false; // Non-empty value
  }
  arrayFirstOrNull<T>(array: T[]): T | null {
    if (array.length === 0) {
      return null;
    }
    return array[0];
  }
  getServerType() {
    let type = process.env.SERVER_TYPE;
    return type;
  }
}
