module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = process.env.VUE_APP_SITE_TITLE || "Sub Web Modify";
      args[0].metaDescription =
        process.env.VUE_APP_SITE_DESCRIPTION ||
        "Subscription conversion tool with link generation, short-link conversion, and config parsing.";
      args[0].metaKeywords =
        process.env.VUE_APP_SITE_KEYWORDS ||
        "subscription, subconverter, clash, surge, shadowrocket, sing-box";
      return args;
    });

    config.plugin("copy").tap((args) => {
      args[0].patterns.forEach((pattern) => {
        pattern.globOptions = pattern.globOptions || {};
        pattern.globOptions.ignore = Array.from(
          new Set([...(pattern.globOptions.ignore || []), "**/index.html"])
        );
      });
      return args;
    });
  },
};
