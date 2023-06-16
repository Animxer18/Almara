export const idToTitle = (str) => {
  const arrStr = str?.split("-");
  const modifiedText = arrStr
    ?.map(
      (word) =>
        `${word?.charAt(0)?.toUpperCase()}${word?.slice(1)?.toLowerCase()}`
    )
    ?.join(" ");
  return modifiedText;
};

export const pascalCase = (str) => {
  const arrStr = str.split(" ");

  const modifiedText = arrStr
    ?.map(
      (word) =>
        `${word?.charAt(0)?.toUpperCase()}${word?.slice(1)?.toLowerCase()}`
    )
    ?.join(" ");
  return modifiedText;
};
export const camelToUpperLowerCase = (str) => {
  return str.replace(/([A-Z])/g, " $1").trim();
};
