
export const DEFAULT_LIMIT = 10;

export const DEFAULT_PAGE = 1;

export const MAX_LIMIT = 1000;

export function parseQuery(query: any) {
    const { page, limit, sort, ...filters } = query;
    const pageNumber = Math.min(Number(page) || DEFAULT_PAGE, MAX_LIMIT);
    const limitNumber = Number(limit) || DEFAULT_LIMIT;
    const sortObject = sort 
    ? sort 
        .split(',')
        .map((field) => {
            const arr = field.split(':');
            return {key : arr[0], value: arr[1] === 'asc' ? -1 : 1};
        })
        .reduce((a,b) => ({...a, [b.key]: b.value}), {})
        : {};

    return {
        options: {page: pageNumber, limit: limitNumber, sort: sortObject},
        filters,
    }
}

export function parseClass<T>(obj: any, model: new () => T): T {
  const instance = new model();
  const allowedKeys = Object.keys(instance as object);

  return Object.keys(obj).reduce((acc, key) => {
    if (allowedKeys.includes(key)) {
      (acc as any)[key] = obj[key];
    }

    return acc;
  }, {} as T);
}
