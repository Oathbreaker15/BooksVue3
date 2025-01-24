export type Card = {
  key: string,
  title: string,
  subject: string[],
  authorName: string[],
  coverEditionKey: string
}

export function camalizeCardKeys<T extends object>(obj: T): T {
  const result = {} as {
    [K in keyof T]: T[K]
  };

  for (const [key, value] of Object.entries(obj)) {
    const camelCaseKey = key.replace(/_([a-z])/g, (_, char) => char.toUpperCase()) as keyof T;
    result[camelCaseKey] = value;
  }

  return result;
}