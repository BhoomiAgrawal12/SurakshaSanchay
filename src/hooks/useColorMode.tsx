// import { useEffect } from "react";
// import useLocalStorage from "./useLocalStorage";

// const useColorMode = () => {
//   const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");

//   useEffect(() => {
//     const className = "dark";
//     const bodyClass = window.document.body.classList;

//     colorMode === "dark"
//       ? bodyClass.add(className)
//       : bodyClass.remove(className);
//   }, [colorMode]);

//   return [colorMode, setColorMode];
// };

// export default useColorMode;

import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    if (colorMode === "dark") {
      bodyClass.add(className);
    } else {
      bodyClass.remove(className);
    }
  }, [colorMode]);

  return [colorMode, setColorMode] as const;
};

export default useColorMode;
