export const parseNumber = (value) => {
  if (typeof value === 'number') return value;
  const cleaned = String(value).replace(/[^\d.-]/g, '');
  return Number(cleaned) || 0;
};

export const parseDate = (value) => {
  const date = new Date(`${value} UTC`);
  return Number.isNaN(date.getTime()) ? new Date() : date;
};

export const fixImageUrl = (url) => {
  if (!url) return null;
  return url.replace(/\.png\d+$/, '.png');
};
