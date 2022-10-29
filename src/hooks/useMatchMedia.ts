import { useLayoutEffect, useState } from "react";

const queries = ["(max-width: 1179px)", "(min-width: 1180px)"];

export const useMatchMedia = () => {
  const mediaQueryLists = queries.map((query) => matchMedia(query));

  const getValues = () => mediaQueryLists.map((list) => list.matches);

  const [values, setValues] = useState(getValues);

  useLayoutEffect(() => {
    const handler = () => setValues(getValues);

    mediaQueryLists.forEach((list) => list.addEventListener("change", handler));

    return () => mediaQueryLists.forEach((list) => list.removeEventListener("change", handler));
  }, []);

  return ["isMobile", "isDesktop"].reduce(
    (acc, screen, index) => ({
      ...acc,
      [screen]: values[index],
    }),
    {} as { [key: string]: boolean },
  );
};
