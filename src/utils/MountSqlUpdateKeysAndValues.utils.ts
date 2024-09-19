export async function mountSqlUpdateKeysAndValues(id: number, data: object) {
  const validEntries = Object.entries(data).filter(
    ([_, value]) => value !== undefined,
  );

  const keys = validEntries.map(([key]) => key);
  const values = validEntries.map(([_, value]) => value);

  const queryParams = [id, ...values];

  const setQuery = keys
    .map((key, index) => `${key} = $${index + 2}`)
    .join(', ');

  return { setQuery, queryParams };
}
