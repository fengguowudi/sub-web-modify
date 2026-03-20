const subwebConfig = {
  docs: {
    sampleConfig:
      "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_NoAuto.ini",
    scriptConfig:
      "https://github.com/tindy2013/subconverter/blob/a24cb7c00a7e5a71ef2e6c0d64d84d91bc7a21d6/README-cn.md?plain=1#L703-L719",
    filterConfig:
      "https://github.com/tindy2013/subconverter/blob/a24cb7c00a7e5a71ef2e6c0d64d84d91bc7a21d6/README-cn.md?plain=1#L514-L531",
  },

  clientTypeOptions: [
    { label: "Clash", value: "clash" },
    { label: "Shadowrocket", value: "shadowrocket" },
    { label: "Surge 4/5", value: "surge&ver=4" },
    { label: "Sing-Box", value: "singbox" },
    { label: "V2Ray", value: "v2ray" },
    { label: "Trojan", value: "trojan" },
    { label: "ShadowsocksR", value: "ssr" },
    { label: "混合订阅", value: "mixed" },
    { label: "Surfboard", value: "surfboard" },
    { label: "Quantumult", value: "quan" },
    { label: "Quantumult X", value: "quanx" },
    { label: "Loon", value: "loon" },
    { label: "Mellow", value: "mellow" },
    { label: "Surge 3", value: "surge&ver=3" },
    { label: "Surge 2", value: "surge&ver=2" },
    { label: "ClashR", value: "clashr" },
    { label: "Shadowsocks (SIP002)", value: "ss" },
    { label: "Shadowsocks Android (SIP008)", value: "sssub" },
    { label: "SSD", value: "ssd" },
    { label: "自动判断客户端", value: "auto" },
  ],

  backendOptions: [
    {
      label: "默认后端",
      value: "https://url.v1.mk",
      default: true,
    },
    {
      label: "本地后端 (127.0.0.1)",
      value: "http://127.0.0.1:25500",
    },
  ],

  shortUrlOptions: [
    {
      label: "默认短链服务",
      value: "https://v1.mk/short",
      default: true,
    },
    {
      label: "d1.mk",
      value: "https://d1.mk/short",
    },
    {
      label: "dlj.tf",
      value: "https://dlj.tf/short",
    },
    {
      label: "suo.yt",
      value: "https://suo.yt/short",
    },
    {
      label: "sub.cm",
      value: "https://sub.cm/short",
    },
  ],

  remoteConfigOptions: [
    {
      label: "基础规则",
      options: [
        {
          label: "默认规则",
          value:
            "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_NoAuto.ini",
          default: true,
        },
        {
          label: "ACL4SSR 全量规则",
          value:
            "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_NoAuto.ini",
        },
        {
          label: "ACL4SSR 去广告规则",
          value:
            "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_AdblockPlus.ini",
        },
        {
          label: "ACL4SSR 精简规则",
          value:
            "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini.ini",
        },
      ],
    },
    {
      label: "进阶规则",
      options: [
        {
          label: "ACL4SSR 无 Reject",
          value:
            "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_NoReject.ini",
        },
        {
          label: "ACL4SSR 多国家分组",
          value:
            "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_MultiCountry.ini",
        },
        {
          label: "ACL4SSR 全量规则（含 Google 分组）",
          value:
            "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_Google.ini",
        },
        {
          label: "ACL4SSR 精简规则（去广告）",
          value:
            "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_AdblockPlus.ini",
        },
      ],
    },
    {
      label: "特殊用途",
      options: [
        {
          label: "Netease Unblock",
          value:
            "https://raw.githubusercontent.com/SleepyHeeead/subconverter-config/master/remote-config/special/netease.ini",
        },
        {
          label: "Basic",
          value:
            "https://raw.githubusercontent.com/SleepyHeeead/subconverter-config/master/remote-config/special/basic.ini",
        },
      ],
    },
  ],

  defaultForm: {
    clientType: "clash",
    diyua: "Shadowrocket",
    emoji: true,
    nodeList: false,
    tls13: false,
    udp: false,
    xudp: false,
    tfo: false,
    sort: false,
    expand: true,
    scv: false,
    fdn: false,
    appendType: false,
    insert: false,
    new_name: true,
    tpl: {
      surge: {
        doh: false,
      },
      clash: {
        doh: false,
      },
      singbox: {
        ipv6: false,
      },
    },
  },
};

export default subwebConfig;
