import { useLayoutEffect, useState } from "react";

export function useIsMounted(delay = 0) {
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, delay);
  }, [delay]);

  return isMounted;
}
