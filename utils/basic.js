import { ObjectId } from "mongodb";


const basicUtils = {
  /**
   * Checks if Id is Valid for Mongo
   */
  isValidId(id) {
    try {
      ObjectId(id);
    } catch (err) {
      return false;
    }
    return true;
  },
};

export default basicUtils;
