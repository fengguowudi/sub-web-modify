const appendIfPresent = (params, key, value) => {
  if (value !== undefined && value !== null && `${value}`.trim() !== "") {
    params.set(key, value);
  }
};

const appendEncoded = (formData, key, value) => {
  formData.append(key, encodeURIComponent(value));
};

const normalizeSourceSubUrl = (sourceSubUrl) =>
  sourceSubUrl.replace(/\r\n|\n|\r/g, "|");

export const getBackendFromSearch = (search) => {
  const params = new URLSearchParams((search || "").replace(/^\?/, ""));
  return params.get("backend") || "";
};

export const buildSubscriptionUrl = (form, fallbackBackend) => {
  const backend = (form.customBackend || fallbackBackend || "").trim();

  if (!backend) {
    throw new Error("未设置后端地址。");
  }

  const params = new URLSearchParams();
  params.set("target", form.clientType);
  params.set("url", normalizeSourceSubUrl(form.sourceSubUrl));
  params.set("insert", String(form.insert));

  appendIfPresent(params, "config", form.remoteConfig);
  appendIfPresent(params, "exclude", form.excludeRemarks);
  appendIfPresent(params, "include", form.includeRemarks);
  appendIfPresent(params, "filename", form.filename);
  appendIfPresent(params, "rename", form.rename);
  appendIfPresent(params, "dev_id", form.devid);
  appendIfPresent(
    params,
    "interval",
    form.interval === "" ? "" : String(Number(form.interval) * 86400)
  );

  if (form.appendType) {
    params.set("append_type", String(form.appendType));
  }

  if (form.tls13) {
    params.set("tls13", String(form.tls13));
  }

  if (form.sort) {
    params.set("sort", String(form.sort));
  }

  params.set("emoji", String(form.emoji));
  params.set("list", String(form.nodeList));
  params.set("xudp", String(form.xudp));
  params.set("udp", String(form.udp));
  params.set("tfo", String(form.tfo));
  params.set("expand", String(form.expand));
  params.set("scv", String(form.scv));
  params.set("fdn", String(form.fdn));

  if (form.clientType.includes("surge") && form.tpl.surge.doh) {
    params.set("surge.doh", "true");
  }

  if (form.clientType === "clash") {
    if (form.tpl.clash.doh) {
      params.set("clash.doh", "true");
    }

    params.set("new_name", String(form.new_name));
  }

  if (form.clientType === "singbox" && form.tpl.singbox.ipv6) {
    params.set("singbox.ipv6", "1");
  }

  appendIfPresent(params, "diyua", form.diyua);

  return `${backend.replace(/\/$/, "")}/sub?${params.toString()}`;
};

export const createShortUrlPayload = (longUrl, shortKey, encodeBase64) => {
  const payload = new FormData();
  payload.append("longUrl", encodeBase64(longUrl));

  const normalizedKey = (shortKey || "").trim();
  if (normalizedKey && !normalizedKey.startsWith("http")) {
    payload.append("shortKey", normalizedKey);
  }

  return payload;
};

export const createConfigUploadPayload = (configText) => {
  const payload = new FormData();
  payload.append("config", encodeURIComponent(configText));
  return payload;
};

export const createScriptUploadPayload = (form, uploadScript, uploadFilter) => {
  const payload = new FormData();

  appendEncoded(payload, "target", form.clientType);
  appendEncoded(payload, "url", form.sourceSubUrl);
  appendEncoded(payload, "config", form.remoteConfig);
  appendEncoded(payload, "exclude", form.excludeRemarks);
  appendEncoded(payload, "include", form.includeRemarks);
  appendEncoded(payload, "rename", form.rename);
  appendEncoded(payload, "tls13", String(form.tls13));
  appendEncoded(payload, "xudp", String(form.xudp));
  appendEncoded(payload, "emoji", String(form.emoji));
  appendEncoded(payload, "list", String(form.nodeList));
  appendEncoded(payload, "udp", String(form.udp));
  appendEncoded(payload, "tfo", String(form.tfo));
  appendEncoded(payload, "expand", String(form.expand));
  appendEncoded(payload, "scv", String(form.scv));
  appendEncoded(payload, "fdn", String(form.fdn));
  appendEncoded(payload, "sdoh", String(form.tpl.surge.doh));
  appendEncoded(payload, "cdoh", String(form.tpl.clash.doh));
  appendEncoded(payload, "newname", String(form.new_name));
  appendEncoded(payload, "diyua", form.diyua);
  appendEncoded(payload, "sortscript", uploadScript || "");
  appendEncoded(payload, "filterscript", uploadFilter || "");

  return payload;
};

export const parseSubscriptionUrl = (rawUrl) => {
  const url = new URL(rawUrl);
  const params = url.searchParams;
  const target = params.get("target");
  const interval = params.get("interval");
  const parsedInterval = interval ? Math.ceil(Number(interval) / 86400) : "";

  return {
    appendType: params.get("append_type") === "true",
    clientType:
      target === "surge"
        ? `surge&ver=${params.get("ver") || "4"}`
        : target || "clash",
    customBackend: url.origin,
    devid: params.get("dev_id") || "",
    diyua: params.get("diyua") || "Shadowrocket",
    emoji: params.get("emoji") === "true",
    excludeRemarks: params.get("exclude") || "",
    expand: params.get("expand") === "true",
    fdn: params.get("fdn") === "true",
    filename: params.get("filename") || "",
    includeRemarks: params.get("include") || "",
    insert: params.get("insert") === "true",
    interval: parsedInterval || "",
    new_name: params.get("new_name") !== "false",
    nodeList: params.get("list") === "true",
    remoteConfig: params.get("config") || "",
    rename: params.get("rename") || "",
    scv: params.get("scv") === "true",
    sort: params.get("sort") === "true",
    sourceSubUrl: (params.get("url") || "").replace(/\|/g, "\n"),
    tfo: params.get("tfo") === "true",
    tls13: params.get("tls13") === "true",
    tpl: {
      clash: {
        doh: params.get("clash.doh") === "true",
      },
      singbox: {
        ipv6: params.get("singbox.ipv6") === "1",
      },
      surge: {
        doh: params.get("surge.doh") === "true",
      },
    },
    udp: params.get("udp") === "true",
    xudp: params.get("xudp") === "true",
  };
};
