import { checkAppUpdate } from "@/components/AppUpdate";
import { useSuspenseQuery } from "@tanstack/react-query";
import { once } from "lodash";

export const appUpdateCheck = once(async function () {
  checkAppUpdate();
  return;
});
