import { useMediaQuery } from "@suid/material";

export const useBreakpoint = () => {
  const objBreakpoint = {
    xs: useMediaQuery("(min-width:0px) and (max-width:576px)"),
    sm: useMediaQuery("(min-width:576px) and (max-width:768px)"),
    md: useMediaQuery("(min-width:768px) and (max-width:992px)"),
    lg: useMediaQuery("(min-width:992px) and (max-width:1200px)"),
    xl: useMediaQuery("(min-width:1200px) and (max-width:1400px)"),
    xxl: useMediaQuery("(min-width:1400px)"),
  };

  return objBreakpoint;
};
