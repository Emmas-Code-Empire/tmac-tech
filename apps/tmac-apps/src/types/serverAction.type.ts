export type SERVER_ACTION_STATUS = "SUCCESS" | "ERROR" | "LOADING" | "IDLE";

export type ServerActionReturn<T> = {
  status: SERVER_ACTION_STATUS;
  message: string;
  data: T;
};
