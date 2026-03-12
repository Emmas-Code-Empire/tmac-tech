export type ServerActionResponse<TData> = {
  data: TData | null;
  message?: string;
};
