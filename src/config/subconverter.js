import { APP_CONFIG } from "@/config/app";

const dedupeOptions = (options = []) => {
  const visited = new Set();

  return options.filter((option) => {
    if (!option || !option.value || visited.has(option.value)) {
      return false;
    }

    visited.add(option.value);
    return true;
  });
};

export const CLIENT_TYPE_OPTIONS = dedupeOptions(APP_CONFIG.clientTypeOptions);
export const SHORT_URL_OPTIONS = dedupeOptions(APP_CONFIG.shortUrlOptions);
export const BACKEND_OPTIONS = dedupeOptions(APP_CONFIG.backendOptions);
export const REMOTE_CONFIG_OPTIONS = APP_CONFIG.remoteConfigOptions;

export const createDefaultForm = (initialBackend = APP_CONFIG.defaultBackend) => ({
  sourceSubUrl: "",
  clientType: APP_CONFIG.defaultForm.clientType || "clash",
  customBackend: initialBackend || APP_CONFIG.defaultBackend,
  shortType: SHORT_URL_OPTIONS.length > 0 ? SHORT_URL_OPTIONS[0].value : "",
  remoteConfig: APP_CONFIG.defaultRemoteConfig,
  excludeRemarks: "",
  includeRemarks: "",
  filename: "",
  rename: "",
  devid: "",
  interval: "",
  diyua: APP_CONFIG.defaultForm.diyua || "Shadowrocket",
  emoji: APP_CONFIG.defaultForm.emoji !== false,
  nodeList: Boolean(APP_CONFIG.defaultForm.nodeList),
  tls13: Boolean(APP_CONFIG.defaultForm.tls13),
  udp: Boolean(APP_CONFIG.defaultForm.udp),
  xudp: Boolean(APP_CONFIG.defaultForm.xudp),
  tfo: Boolean(APP_CONFIG.defaultForm.tfo),
  sort: Boolean(APP_CONFIG.defaultForm.sort),
  expand: APP_CONFIG.defaultForm.expand !== false,
  scv: Boolean(APP_CONFIG.defaultForm.scv),
  fdn: Boolean(APP_CONFIG.defaultForm.fdn),
  appendType: Boolean(APP_CONFIG.defaultForm.appendType),
  insert: Boolean(APP_CONFIG.defaultForm.insert),
  new_name: APP_CONFIG.defaultForm.new_name !== false,
  tpl: {
    surge: {
      doh: Boolean(APP_CONFIG.defaultForm.tpl?.surge?.doh),
    },
    clash: {
      doh: Boolean(APP_CONFIG.defaultForm.tpl?.clash?.doh),
    },
    singbox: {
      ipv6: Boolean(APP_CONFIG.defaultForm.tpl?.singbox?.ipv6),
    },
  },
});
