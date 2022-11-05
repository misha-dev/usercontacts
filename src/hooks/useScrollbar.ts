import { OverlayScrollbars } from "overlayscrollbars";
import { useEffect } from "react";
const options = {};
let scrollBars: OverlayScrollbars;
export const useScrollbar = (root: React.RefObject<HTMLDivElement>, hasScroll: boolean) => {
  useEffect(() => {
    if (root.current && hasScroll) {
      scrollBars = OverlayScrollbars(root.current, options);
    }

    return () => {
      if (scrollBars) {
        scrollBars.destroy();
      }
    };
  }, [root, root.current, hasScroll]);
};
