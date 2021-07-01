import { createApp, provide, h } from "vue";
import "@/assets/tailwind.scss";
import App from "@/App.vue";
import router from "@/router";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";

createApp({
  setup() {
    provide(
      "DefaultApolloClient",
      new ApolloClient({
        uri: "https://rickandmortyapi.com/graphql",
        cache: new InMemoryCache(),
      })
    );
  },
  render() {
    return h(App);
  },
})
  .use(router)
  .mount("#app");
