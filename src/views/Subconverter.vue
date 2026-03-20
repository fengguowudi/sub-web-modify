<template>
  <div class="page">
    <el-row class="page-row">
      <el-col :span="24">
        <el-card class="panel" shadow="never">
          <div slot="header" class="panel-header">
            <div>
              <h1 class="panel-title">{{ appConfig.title }}</h1>
              <p class="panel-subtitle">{{ appConfig.description }}</p>
            </div>
            <div class="panel-meta">
              <el-tag
                v-if="backendVersion"
                size="small"
                type="success"
              >
                {{ backendVersion }}
              </el-tag>
              <el-tag
                v-else-if="backendVersionError"
                size="small"
                type="danger"
              >
                后端不可用
              </el-tag>
              <el-button
                circle
                icon="el-icon-sunny"
                @click="handleThemeToggle"
              />
            </div>
          </div>

          <el-form
            :model="form"
            label-position="top"
            class="converter-form"
          >
            <el-alert
              :closable="false"
              type="info"
              show-icon
              class="status-alert"
              :title="backendStatusText"
            />

            <div class="form-grid">
              <el-form-item label="订阅链接">
                <el-input
                  v-model.trim="form.sourceSubUrl"
                  type="textarea"
                  :autosize="{ minRows: 4, maxRows: 8 }"
                  placeholder="支持多条订阅链接，按行分隔。"
                />
              </el-form-item>

              <el-form-item label="生成类型">
                <el-select v-model="form.clientType" filterable>
                  <el-option
                    v-for="option in clientTypeOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="后端地址">
                <el-select
                  v-model="form.customBackend"
                  allow-create
                  filterable
                  default-first-option
                  placeholder="请输入可用的 SubConverter 后端"
                  @change="getBackendVersion"
                >
                  <el-option
                    v-for="option in backendOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="短链服务">
                <el-select
                  v-model="form.shortType"
                  allow-create
                  filterable
                  default-first-option
                  placeholder="请输入可用的短链服务"
                >
                  <el-option
                    v-for="option in shortUrlOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="远程配置">
                <el-select
                  v-model="form.remoteConfig"
                  allow-create
                  filterable
                  default-first-option
                  placeholder="可选，也可以直接输入自定义配置地址"
                >
                  <el-option-group
                    v-for="group in remoteConfigOptions"
                    :key="group.label"
                    :label="group.label"
                  >
                    <el-option
                      v-for="option in group.options"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    />
                  </el-option-group>
                </el-select>
              </el-form-item>
            </div>

            <el-collapse class="advanced-options">
              <el-collapse-item title="高级选项">
                <div class="form-grid">
                  <el-form-item label="自定义 User-Agent">
                    <el-input
                      v-model.trim="form.diyua"
                      placeholder="用于后端拉取订阅时的请求头。"
                    />
                  </el-form-item>

                  <el-form-item label="包含节点">
                    <el-input
                      v-model.trim="form.includeRemarks"
                      placeholder="支持正则表达式。"
                    />
                  </el-form-item>

                  <el-form-item label="排除节点">
                    <el-input
                      v-model.trim="form.excludeRemarks"
                      placeholder="支持正则表达式。"
                    />
                  </el-form-item>

                  <el-form-item label="节点重命名">
                    <el-input
                      v-model.trim="form.rename"
                      placeholder="例如：A@B``1@2"
                    />
                  </el-form-item>

                  <el-form-item label="设备 ID">
                    <el-input
                      v-model.trim="form.devid"
                      placeholder="用于 Quantumult X 等客户端。"
                    />
                  </el-form-item>

                  <el-form-item label="更新间隔（天）">
                    <el-input
                      v-model.trim="form.interval"
                      placeholder="将自动转换为秒数传给后端。"
                    />
                  </el-form-item>

                  <el-form-item label="订阅名称">
                    <el-input
                      v-model.trim="form.filename"
                      placeholder="生成结果中使用的文件名。"
                    />
                  </el-form-item>
                </div>

                <div class="checkbox-grid">
                  <el-checkbox v-model="form.nodeList">仅输出节点信息</el-checkbox>
                  <el-checkbox v-model="form.emoji">追加 Emoji</el-checkbox>
                  <el-checkbox v-model="form.insert">插入默认节点</el-checkbox>
                  <el-checkbox v-model="form.udp">启用 UDP</el-checkbox>
                  <el-checkbox v-model="form.xudp">启用 XUDP</el-checkbox>
                  <el-checkbox v-model="form.tfo">启用 TFO</el-checkbox>
                  <el-checkbox v-model="form.sort">基础节点排序</el-checkbox>
                  <el-checkbox v-model="form.appendType">附加节点类型</el-checkbox>
                  <el-checkbox v-model="form.tls13">启用 TLS 1.3</el-checkbox>
                  <el-checkbox v-model="form.expand">展开规则全文</el-checkbox>
                  <el-checkbox v-model="form.scv">跳过证书验证</el-checkbox>
                  <el-checkbox v-model="form.fdn">过滤不支持节点</el-checkbox>
                  <el-checkbox v-model="form.tpl.clash.doh">Clash DoH</el-checkbox>
                  <el-checkbox v-model="form.tpl.surge.doh">Surge DoH</el-checkbox>
                  <el-checkbox v-model="form.new_name">Clash 新字段名</el-checkbox>
                  <el-checkbox v-model="form.tpl.singbox.ipv6">Sing-Box IPv6</el-checkbox>
                </div>
              </el-collapse-item>
            </el-collapse>

            <div class="result-grid">
              <el-form-item label="定制订阅">
                <el-input
                  v-model="customSubUrl"
                  disabled
                  class="result-input"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-document-copy"
                    v-clipboard:copy="customSubUrl"
                    v-clipboard:success="onCopy"
                  >
                    复制
                  </el-button>
                </el-input>
              </el-form-item>

              <el-form-item v-if="hasShortUrlService" label="订阅短链">
                <el-input
                  v-model.trim="customShortSubUrl"
                  class="result-input"
                  placeholder="可自定义短链后缀，留空则自动生成。"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-document-copy"
                    v-clipboard:copy="customShortSubUrl"
                    v-clipboard:success="onCopy"
                  >
                    复制
                  </el-button>
                </el-input>
              </el-form-item>
            </div>

            <div class="action-row">
              <el-button
                type="danger"
                :disabled="!form.sourceSubUrl"
                @click="makeUrl"
              >
                生成订阅链接
              </el-button>
              <el-button
                v-if="hasShortUrlService"
                type="danger"
                :loading="loading.short"
                :disabled="!customSubUrl"
                @click="makeShortUrl"
              >
                生成短链接
              </el-button>
              <el-button
                v-if="hasUploadService"
                type="primary"
                :loading="loading.upload"
                @click="dialogUploadConfigVisible = true"
              >
                上传自定义配置
              </el-button>
              <el-button
                type="primary"
                :loading="loading.parse"
                @click="dialogLoadConfigVisible = true"
              >
                解析现有链接
              </el-button>
            </div>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      v-if="hasUploadService"
      title="上传自定义配置"
      :visible.sync="dialogUploadConfigVisible"
      width="80%"
    >
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane label="远程配置" name="config">
          <el-link
            v-if="docLinks.sampleConfig"
            type="primary"
            :href="docLinks.sampleConfig"
            target="_blank"
            icon="el-icon-link"
            class="dialog-link"
          >
            查看示例
          </el-link>
          <el-input
            v-model="uploadConfig"
            type="textarea"
            :autosize="{ minRows: 14, maxRows: 16 }"
            maxlength="50000"
            show-word-limit
          />
          <div class="dialog-actions">
            <el-button @click="closeUploadDialog">取消</el-button>
            <el-button
              type="primary"
              :disabled="!uploadConfig"
              @click="confirmUploadConfig"
            >
              确认上传
            </el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="排序脚本" name="script">
          <el-link
            v-if="docLinks.scriptConfig"
            type="success"
            :href="docLinks.scriptConfig"
            target="_blank"
            icon="el-icon-link"
            class="dialog-link"
          >
            查看脚本说明
          </el-link>
          <el-input
            v-model="uploadScript"
            type="textarea"
            :autosize="{ minRows: 14, maxRows: 16 }"
            maxlength="50000"
            show-word-limit
            placeholder="输入节点排序脚本。"
          />
          <div class="dialog-actions">
            <el-button @click="closeUploadDialog">取消</el-button>
            <el-button
              type="primary"
              :disabled="!uploadScript"
              @click="confirmUploadScript"
            >
              确认上传
            </el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="筛选脚本" name="filter">
          <el-link
            v-if="docLinks.filterConfig"
            type="warning"
            :href="docLinks.filterConfig"
            target="_blank"
            icon="el-icon-link"
            class="dialog-link"
          >
            查看脚本说明
          </el-link>
          <el-input
            v-model="uploadFilter"
            type="textarea"
            :autosize="{ minRows: 14, maxRows: 16 }"
            maxlength="50000"
            show-word-limit
            placeholder="输入节点筛选脚本。"
          />
          <div class="dialog-actions">
            <el-button @click="closeUploadDialog">取消</el-button>
            <el-button
              type="primary"
              :disabled="!uploadFilter"
              @click="confirmUploadScript"
            >
              确认上传
            </el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <el-dialog
      title="解析现有链接"
      :visible.sync="dialogLoadConfigVisible"
      width="80%"
    >
      <el-input
        v-model.trim="loadConfig"
        type="textarea"
        :autosize="{ minRows: 12, maxRows: 14 }"
        maxlength="5000"
        show-word-limit
        placeholder="支持长链接和短链接。"
      />
      <div class="dialog-actions">
        <el-button @click="closeLoadDialog">取消</el-button>
        <el-button
          type="primary"
          :disabled="!loadConfig"
          @click="confirmLoadConfig"
        >
          解析
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { APP_CONFIG } from "@/config/app";
import {
  BACKEND_OPTIONS,
  CLIENT_TYPE_OPTIONS,
  REMOTE_CONFIG_OPTIONS,
  SHORT_URL_OPTIONS,
  createDefaultForm,
} from "@/config/subconverter";
import {
  buildSubscriptionUrl,
  createConfigUploadPayload,
  createScriptUploadPayload,
  createShortUrlPayload,
  getBackendFromSearch,
  parseSubscriptionUrl,
} from "@/utils/subconverter";
import {
  applyPreferredTheme,
  toggleTheme,
  watchSystemTheme,
} from "@/utils/theme";

export default {
  name: "Subconverter",
  data() {
    const initialBackend =
      getBackendFromSearch(window.location.search) || APP_CONFIG.defaultBackend;

    return {
      activeTab: "config",
      appConfig: APP_CONFIG,
      backendOptions: BACKEND_OPTIONS,
      backendVersion: "",
      backendVersionError: "",
      cleanupThemeListener: null,
      clientTypeOptions: CLIENT_TYPE_OPTIONS,
      customShortSubUrl: "",
      customSubUrl: "",
      dialogLoadConfigVisible: false,
      dialogUploadConfigVisible: false,
      docLinks: APP_CONFIG.docs,
      form: createDefaultForm(initialBackend),
      loadConfig: "",
      loading: {
        parse: false,
        short: false,
        upload: false,
      },
      remoteConfigOptions: REMOTE_CONFIG_OPTIONS,
      shortUrlOptions: SHORT_URL_OPTIONS,
      uploadConfig: "",
      uploadFilter: "",
      uploadScript: "",
    };
  },
  computed: {
    backendStatusText() {
      if (this.backendVersion) {
        return `当前后端：${this.backendVersion}`;
      }

      if (this.backendVersionError) {
        return this.backendVersionError;
      }

      return "正在检测后端状态。";
    },
    hasShortUrlService() {
      return this.shortUrlOptions.some((option) => option.value);
    },
    hasUploadService() {
      return Boolean(APP_CONFIG.configUploadBackend);
    },
  },
  created() {
    document.title = APP_CONFIG.title;
  },
  mounted() {
    applyPreferredTheme();
    this.cleanupThemeListener = watchSystemTheme(() => {
      applyPreferredTheme();
    });
    this.getBackendVersion();
  },
  beforeDestroy() {
    if (typeof this.cleanupThemeListener === "function") {
      this.cleanupThemeListener();
    }
  },
  methods: {
    analyzeUrl() {
      if (this.loadConfig.includes("target=")) {
        return Promise.resolve(this.loadConfig);
      }

      return fetch(this.loadConfig, {
        method: "GET",
        redirect: "follow",
      }).then((response) => response.url);
    },
    closeLoadDialog() {
      this.loadConfig = "";
      this.dialogLoadConfigVisible = false;
    },
    closeUploadDialog() {
      this.uploadConfig = "";
      this.uploadFilter = "";
      this.uploadScript = "";
      this.dialogUploadConfigVisible = false;
    },
    confirmLoadConfig() {
      if (!this.loadConfig || !this.loadConfig.includes("http")) {
        this.$message.error("请输入有效的订阅链接。");
        return;
      }

      this.loading.parse = true;

      this.analyzeUrl()
        .then((resolvedUrl) => parseSubscriptionUrl(resolvedUrl))
        .then((nextForm) => {
          this.form = {
            ...this.form,
            ...nextForm,
          };
          this.dialogLoadConfigVisible = false;
          this.$message.success("订阅链接解析完成。");
          this.getBackendVersion();
        })
        .catch(() => {
          this.$message.error("链接解析失败，请确认地址可访问。");
        })
        .finally(() => {
          this.loading.parse = false;
        });
    },
    confirmUploadConfig() {
      if (!APP_CONFIG.configUploadBackend) {
        this.$message.error("未配置自定义配置上传后端。");
        return;
      }

      this.loading.upload = true;

      this.$axios
        .post(
          APP_CONFIG.configUploadBackend,
          createConfigUploadPayload(this.uploadConfig),
          {
            header: {
              "Content-Type": "application/form-data; charset=utf-8",
            },
          }
        )
        .then((response) => {
          if (response.data.code === 0 && response.data.data) {
            this.form.remoteConfig = response.data.data;
            this.$copyText(response.data.data);
            this.$message.success("远程配置上传成功，结果已复制。");
            this.closeUploadDialog();
            return;
          }

          this.$message.error(
            `远程配置上传失败：${response.data.msg || "未知错误"}`
          );
        })
        .catch(() => {
          this.$message.error("远程配置上传失败。");
        })
        .finally(() => {
          this.loading.upload = false;
        });
    },
    confirmUploadScript() {
      if (!APP_CONFIG.configScriptBackend) {
        this.$message.error("未配置脚本上传后端。");
        return;
      }

      if (!this.form.sourceSubUrl) {
        this.$message.error("请先填写订阅链接。");
        return;
      }

      this.loading.upload = true;

      this.$axios
        .post(
          APP_CONFIG.configScriptBackend,
          createScriptUploadPayload(
            this.form,
            this.uploadScript,
            this.uploadFilter
          ),
          {
            header: {
              "Content-Type": "application/form-data; charset=utf-8",
            },
          }
        )
        .then((response) => {
          if (response.data.code === 0 && response.data.data) {
            this.customSubUrl = response.data.data;
            this.$copyText(response.data.data);
            this.$message.success("脚本上传成功，生成结果已复制。");
            this.closeUploadDialog();
            return;
          }

          this.$message.error(
            `脚本上传失败：${response.data.msg || "未知错误"}`
          );
        })
        .catch(() => {
          this.$message.error("脚本上传失败。");
        })
        .finally(() => {
          this.loading.upload = false;
        });
    },
    getBackendVersion() {
      const backend = (this.form.customBackend || "").trim();

      if (!backend) {
        this.backendVersion = "";
        this.backendVersionError = "未设置后端地址。";
        return;
      }

      this.backendVersion = "";
      this.backendVersionError = "";

      this.$axios
        .get(`${backend}/version`)
        .then((response) => {
          const version = response.data
            .replace(/backend\n$/gm, "")
            .replace("subconverter", "SubConverter")
            .trim();

          this.backendVersion = version || "SubConverter";
        })
        .catch(() => {
          this.backendVersionError = "后端版本获取失败，请检查地址是否可用。";
        });
    },
    handleThemeToggle() {
      toggleTheme();
    },
    makeShortUrl() {
      const shortEndpoint = (
        this.form.shortType ||
        APP_CONFIG.shortUrlBackend ||
        ""
      ).trim();

      if (!shortEndpoint) {
        this.$message.error("未配置短链服务。");
        return;
      }

      this.loading.short = true;

      this.$axios
        .post(
          shortEndpoint,
          createShortUrlPayload(
            this.customSubUrl,
            this.customShortSubUrl,
            this.$btoa
          ),
          {
            header: {
              "Content-Type": "application/form-data; charset=utf-8",
            },
          }
        )
        .then((response) => {
          if (response.data.Code === 1 && response.data.ShortUrl) {
            this.customShortSubUrl = response.data.ShortUrl;
            this.$copyText(response.data.ShortUrl);
            this.$message.success("短链接生成成功，结果已复制。");
            return;
          }

          this.$message.error(
            `短链接生成失败：${response.data.Message || "未知错误"}`
          );
        })
        .catch(() => {
          this.$message.error("短链接生成失败。");
        })
        .finally(() => {
          this.loading.short = false;
        });
    },
    makeUrl() {
      if (!this.form.sourceSubUrl || !this.form.clientType) {
        this.$message.error("订阅链接和生成类型为必填项。");
        return;
      }

      try {
        this.customSubUrl = buildSubscriptionUrl(
          this.form,
          APP_CONFIG.defaultBackend
        );
        this.$copyText(this.customSubUrl);
        this.$message.success("订阅链接已生成并复制。");
      } catch (error) {
        this.$message.error(error.message || "订阅链接生成失败。");
      }
    },
    onCopy() {
      this.$message.success("已复制到剪贴板。");
    },
  },
};
</script>

<style scoped>
.page {
  padding: 16px;
}

.page-row {
  max-width: 1080px;
  margin: 0 auto;
}

.panel {
  border-radius: 18px;
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.panel-title {
  margin: 0;
  font-size: 24px;
  line-height: 1.2;
}

.panel-subtitle {
  margin: 8px 0 0;
  color: #606266;
  line-height: 1.6;
}

.panel-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.converter-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.status-alert {
  margin-bottom: 4px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.form-grid .el-form-item:first-child,
.result-grid .el-form-item {
  grid-column: 1 / -1;
}

.advanced-options {
  border-top: 1px solid rgba(144, 147, 153, 0.25);
  border-bottom: 1px solid rgba(144, 147, 153, 0.25);
}

.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 20px;
}

.result-grid {
  display: grid;
  gap: 20px;
}

.result-input {
  width: 100%;
}

.action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.dialog-link {
  margin-bottom: 16px;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .page {
    padding: 10px;
  }

  .panel-header {
    flex-direction: column;
    align-items: stretch;
  }

  .panel-meta {
    justify-content: space-between;
  }

  .form-grid,
  .checkbox-grid {
    grid-template-columns: 1fr;
  }

  .action-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .action-row .el-button {
    margin-left: 0;
  }
}
</style>
