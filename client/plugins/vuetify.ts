// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";
import { VNumberInput } from "vuetify/labs/VNumberInput";

import "vuetify/styles";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    components: {
      VNumberInput,
    },
  });
  app.vueApp.use(vuetify);
});
