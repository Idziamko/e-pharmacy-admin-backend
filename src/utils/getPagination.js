import { DEFAULT_PER_PAGE } from '../constants/index.js';

export const getPagination = (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const perPage = Math.max(Number(query.perPage) || DEFAULT_PER_PAGE, 1);
  const skip = (page - 1) * perPage;

  return { page, perPage, skip };
};

export const getPaginationData = (totalItems, page, perPage) => ({
  page,
  perPage,
  totalItems,
  totalPages: Math.ceil(totalItems / perPage) || 1,
});
