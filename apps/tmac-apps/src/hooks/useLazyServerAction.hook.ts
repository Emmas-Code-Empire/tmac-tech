import { useState, useCallback } from "react";
import { ServerActionReturn } from "@/types/serverAction.type";

const useLazyServerAction = <TArgs extends any[], TReturn>(
  serverAction: (...args: TArgs) => Promise<ServerActionReturn<TReturn>>
) => {
  const initialResponse: ServerActionReturn<null> = {
    data: null,
    status: "IDLE",
    message: "Server action ready to execute.",
  };

  const [response, setResponse] = useState<
    ServerActionReturn<TReturn> | ServerActionReturn<null>
  >(initialResponse);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(
    async (...args: TArgs): Promise<ServerActionReturn<TReturn>> => {
      setLoading(true);

      setResponse({
        data: null,
        status: "LOADING",
        message: "Server action loading.",
      });

      const data = await serverAction(...args);

      setResponse(data);
      setLoading(false);

      return data;
    },
    [serverAction]
  );

  return {
    execute,
    response,
    loading,
  };
};

export default useLazyServerAction;
