import { useLayoutEffect, useRef } from "react";

const useStageEffect = (
  initialCallback: () => void,
  subsequentCallback: () => void,
  dependencies: React.DependencyList
) => {
  const firstRenderRef = useRef(true);

  useLayoutEffect(() => {
    if (firstRenderRef.current) {
      initialCallback();
      firstRenderRef.current = false;
      return;
    }

    return subsequentCallback();
  }, dependencies);
};

export default useStageEffect;
