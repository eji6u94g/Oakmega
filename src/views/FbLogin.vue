<template>
  <div>
    <h1>FB Login</h1>
    <button @click.prevent.stop="ifFbLogin">登入</button>
  </div>
</template>

<script>
import router from "../router";
import store from "../store";

export default {
  name: "FbLogin",
  methods: {
    ifFbLogin: () => {
      FB.getLoginStatus(function (response) {
        if (response.status !== "connected") {
          this.bind(Vue).loginFb();
        } else {
          FB.api(
            "/me",
            {
              fields: "id,name,picture",
            },
            function (response) {
              store.commit("setUserInfo", {
                name: response.name,
                avatar: response.picture.data.url,
                type: "fb",
              });
            }
          );

          router.push("/GoogleLogin");
        }
      });
    },
    loginFb() {
      FB.login(
        function (response) {
          if (response.status === "connected") {
            FB.api(
              "/me",
              {
                fields: "id,name,picture",
              },
              function (response) {
                store.commit("setUserInfo", {
                  name: response.name,
                  avatar: response.picture.data.url,
                  type: "fb",
                });
              }
            );

            router.push("/GoogleLogin");
          } else {
            alert("請登入FB");
          }
        },
        { scope: "public_profile" }
      );
    },
  },
};
</script>

<style>
</style>