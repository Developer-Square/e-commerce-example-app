/**
 * Returns the url formatted with params
 * @param {string} url api url
 * @param {string | string[][] | Record<string, string> | URLSearchParams} params query params
 * @returns {string} url with query params
 */
const getKey = (
  url: string,
  params?: string | string[][] | Record<string, string> | URLSearchParams
): string => {
  const usp = new URLSearchParams(params);

  // Create a stable key for SWR
  usp.forEach((value, key, parent) => {
    if (value === '') parent.delete(key);
  });
  usp.sort();
  return `${url}?${usp.toString()}`;
};

export default getKey;
