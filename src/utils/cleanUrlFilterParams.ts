import { ApiFiltersInput, InputMaybe } from '../generated/graphql';

/**
 * Converts GraphQL input to a format accepted by URLSearchParams,
 * removing null values and converting Scalars (Int, String) to string.
 */
export const cleanUrlFilterParams = (
  filters?: InputMaybe<ApiFiltersInput>,
): Record<string, string> => {
  const clean: Record<string, string> = {};
  if (!filters) return clean;

  const { _sort, _order, ...rest } = filters;

  Object.entries(rest).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      clean[key] = String(value);
    }
  });

  if (_sort) {
    const prefix = _order?.toLowerCase() === 'desc' ? '-' : '';
    clean['_sort'] = `${prefix}${_sort}`;
  }

  return clean;
};
