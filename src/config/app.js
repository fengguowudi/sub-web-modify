import subwebConfig from "@/config/subweb.config";

const ensureTrailingPath = (base, path) => {
  if (!base) {
    return "";
  }

  return `${base.replace(/\/$/, "")}${path}`;
};

const pickDefaultOption = (options = []) =>
  options.find((option) => option.default) || options[0] || null;

const pickDefaultRemoteConfig = (groups = []) => {
  for (const group of groups) {
    const options = group?.options || [];
    const matched = options.find((option) => option.default);

    if (matched) {
      return matched;
    }
  }

  for (const group of groups) {
    const firstOption = group?.options?.[0];

    if (firstOption) {
      return firstOption;
    }
  }

  return null;
};

const defaultBackend = pickDefaultOption(subwebConfig.backendOptions)?.value || "";
const defaultShortUrl = pickDefaultOption(subwebConfig.shortUrlOptions)?.value || "";
const defaultRemoteConfig =
  pickDefaultRemoteConfig(subwebConfig.remoteConfigOptions)?.value || "";

export const APP_CONFIG = {
  title: process.env.VUE_APP_SITE_TITLE || "在线订阅转换工具",
  description:
    process.env.VUE_APP_SITE_DESCRIPTION ||
    "纯净版在线订阅转换工具，支持订阅链接生成、短链转换与配置解析。",
  keywords:
    process.env.VUE_APP_SITE_KEYWORDS ||
    "订阅转换,SubConverter,Clash,Surge,Shadowrocket,Sing-Box",
  defaultBackend,
  defaultRemoteConfig,
  shortUrlBackend: defaultShortUrl,
  configUploadBackend: ensureTrailingPath(
    process.env.VUE_APP_CONFIG_UPLOAD_BACKEND,
    "/sub.php"
  ),
  configScriptBackend: ensureTrailingPath(
    process.env.VUE_APP_CONFIG_UPLOAD_BACKEND,
    "/api.php"
  ),
  docs: subwebConfig.docs,
  clientTypeOptions: subwebConfig.clientTypeOptions,
  backendOptions: subwebConfig.backendOptions,
  shortUrlOptions: subwebConfig.shortUrlOptions,
  remoteConfigOptions: subwebConfig.remoteConfigOptions,
  defaultForm: subwebConfig.defaultForm,
};
