import {useEffect, useRef} from 'react';

/**
 * Track a previous value. This can be used for leveraging close buttons
 * on views within the dashboard
 * @param {*} value
 * @return {*}
 */
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious;
