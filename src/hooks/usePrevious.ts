import { useRef, useEffect } from "react";

/**
 * A custom hook that returns the previous value of a state or prop.
 *
 * @template T - The type of the value being tracked.
 * @param {T} value - The current value (state or prop) whose previous value needs to be tracked.
 * @returns {T | undefined} - The previous value of `value`, or `undefined` on the first render.
 */
function usePrevious<T>(value: T): T | undefined {
  // Create a ref to hold the previous value
  const prevRef = useRef<T | undefined>(undefined);

  useEffect(() => {
    // Update the ref with the current value after each render
    prevRef.current = value;
  }, [value]); // Runs every time `value` changes

  // Return the previous value from the ref
  return prevRef.current;
}

export default usePrevious;
