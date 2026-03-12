import { useEffect, useState } from "react";
import { ServerActionReturn } from "@/types/serverAction.type";

const useServerAction = <TArgs extends any[], TReturn>(
  serverAction: (...args: TArgs) => Promise<ServerActionReturn<TReturn>>,
  args: TArgs,
  dependencies: any[] = []
): {
  response: ServerActionReturn<TReturn> | ServerActionReturn<null>;
  loading: boolean;
} => {
  const initalResponse: ServerActionReturn<null> = {
    data: null,
    status: "LOADING",
    message: "Server action loading.",
  };

  const [response, setResponse] = useState<
    ServerActionReturn<TReturn> | ServerActionReturn<null>
  >(initalResponse);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const executeServerAction = async () => {
      const data = await serverAction(...args);
      setResponse(data);
      setLoading(false);
    };
    executeServerAction();
  }, [...dependencies]);

  return {
    response,
    loading,
  };
};

export default useServerAction;
