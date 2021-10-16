import useIsBrowser from "@docusaurus/useIsBrowser";
import React, { useEffect } from "react";

// Default implementation, that you can customize
function Root({ children }) {
  
  /**
   * Forcing theme to be light
   */
  const isBrowser = useIsBrowser()
  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('theme', 'light')
    }
  }, [isBrowser])
  
  return (
    <>
      {children}
    </>
  );
}

export default Root;
