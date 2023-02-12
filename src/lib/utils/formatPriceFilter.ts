const formatPriceFilter = (filter: string) => {
  const [from, to] = filter.split(':');
  return { $gte: Number(from), $lte: Number(to) };
};

export default formatPriceFilter;
