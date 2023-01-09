// Regular expression to check if string is a longitude and latitude
export function isLongLat(str: string): boolean {
  const regexExp = /^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/gi;

  return regexExp.test(str);
}
