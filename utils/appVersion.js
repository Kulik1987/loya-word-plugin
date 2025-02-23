const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

const packageJson = require("../package.json");

const appVersion = () => {
  const version = packageJson.version;
  const timestamp = dayjs().tz("Europe/Moscow").format("YYYY.MM.DD.HHmm");
  const appBuildNumber = `${version}.${timestamp}`;
  return appBuildNumber;
};

module.exports = appVersion;
