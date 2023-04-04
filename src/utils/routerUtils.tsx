export const resolvePathVariables = (path: string, pathVariables: { [key: string]: string }) =>
  Object.keys(pathVariables).reduce(
    (result, key) => result.replace(`:${key}`, pathVariables[key]),
    path
  )
