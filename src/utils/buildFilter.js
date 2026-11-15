const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const buildNameFilter = (name) => {
  if (!name || !name.trim()) return {};
  return { name: { $regex: escapeRegExp(name.trim()), $options: 'i' } };
};

export const buildSort = (query, allowedFields, defaultSort) => {
  const { sortBy, sortOrder } = query;
  if (!sortBy || !allowedFields.includes(sortBy)) return defaultSort;
  return { [sortBy]: sortOrder === 'desc' ? -1 : 1, _id: 1 };
};
