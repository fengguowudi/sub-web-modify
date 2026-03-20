import Vue from "vue";
import locale from "element-ui/lib/locale/lang/zh-CN";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Collapse,
  CollapseItem,
  Col,
  Dialog,
  Form,
  FormItem,
  Input,
  Link,
  Loading,
  Message,
  MessageBox,
  Option,
  OptionGroup,
  Row,
  Select,
  TabPane,
  Tabs,
  Tag,
} from "element-ui";

const components = [
  Alert,
  Button,
  Card,
  Checkbox,
  Collapse,
  CollapseItem,
  Col,
  Dialog,
  Form,
  FormItem,
  Input,
  Link,
  Option,
  OptionGroup,
  Row,
  Select,
  TabPane,
  Tabs,
  Tag,
];

components.forEach((component) => {
  Vue.use(component, {
    locale,
    size: "small",
  });
});

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
