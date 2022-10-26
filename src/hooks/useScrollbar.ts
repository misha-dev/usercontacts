import { OverlayScrollbars } from "overlayscrollbars";
import { useEffect } from "react";
const options = {};
export let scrollBars: any;
export const useScrollbar = (root: React.RefObject<HTMLDivElement>, hasScroll: boolean) => {
  useEffect(() => {
    if (root.current && hasScroll) {
      console.log(1000);
      scrollBars = OverlayScrollbars(root.current, options);
      scrollBars.options("overflowBehavior.x", "hidden");
    }

    return () => {
      if (scrollBars) {
        scrollBars.destroy();
      }
    };
  }, [root, hasScroll]);
};
