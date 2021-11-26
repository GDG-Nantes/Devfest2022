import { useMediaQuery } from "@mui/material";
import theme from "../layout/theme";

export function useResponsiveData() {
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isBig = useMediaQuery(theme.breakpoints.up("lg"));

  return {
    isMobile,
    isTablet,
    isSmallMobile,
    isBig,
    isMobileOrTablet: isMobile || isTablet,
  };
}
