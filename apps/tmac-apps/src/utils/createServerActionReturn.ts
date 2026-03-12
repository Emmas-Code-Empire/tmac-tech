import {
  SERVER_ACTION_STATUS,
  ServerActionReturn,
} from "@/types/serverAction.type";

const createServerActionReturn = <T>(
  data: T,
  status: SERVER_ACTION_STATUS,
  message: string
): ServerActionReturn<T> => {
  return {
    data,
    status,
    message,
  };
};

export default createServerActionReturn;
