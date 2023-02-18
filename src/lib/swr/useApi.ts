import useSWR from 'swr';

/**
 * Re-usable SWR api implementation.
 *
 * @param {string} url
 * @param {object} params
 * @returns object
 */
function useApi(
  url: string,
  params?: string | string[][] | Record<string, string> | URLSearchParams
) {
  const usp = new URLSearchParams(params);

  // Create a stable key for SWR
  usp.forEach((value, key, parent) => {
    if (value === '') parent.delete(key);
  });
  usp.sort();
  const qs = usp.toString();

  const { data, error, isLoading, isValidating } = useSWR(`${url}?${qs}`);

  return {
    isLoading,
    isValidating,
    data,
    error,
  };
}

export default useApi;
