import { useEffect, useRef, useState } from "react";

export default function useDebounce(defaultValue, timing = 500) {
  const timingRef = useRef();
  const [debouncedValue, _setDebouncedValue] = useState(defaultValue);
  const setDebouncedValue = (value) => {
    if (timingRef.current) {
      clearTimeout(timingRef.current);
    }
    timingRef.current = setTimeout(() => {
      _setDebouncedValue(value);
      timingRef.current = null;
    }, timing);
  };
  return [debouncedValue, setDebouncedValue];
}
