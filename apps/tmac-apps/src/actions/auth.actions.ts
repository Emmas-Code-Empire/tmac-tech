"use server";

import { auth } from "../auth";

export const auth_GetSession = async () => {
  const session = await auth();
  return session;
};
