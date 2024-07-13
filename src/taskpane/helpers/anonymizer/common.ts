const replacer = (text: string, pattern: RegExp, replacement: string, flag: "g" = "g") => {
  const regex = new RegExp(pattern, flag);
  return text.replaceAll(regex, replacement);
};

export { replacer };
