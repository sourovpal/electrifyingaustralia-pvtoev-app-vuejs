import { createApp } from "vue";
import App from "./App.vue";
import registerGlobalComponents from "./plugins/register-global-components";

var app = createApp(App);

registerGlobalComponents(app);

app.mount("#app");
