import { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface props {
  children?: ReactNode;
}

export const Portal = ({ children }: props) => {
  const [container] = useState(() => document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return ReactDOM.createPortal(children, container);
};


