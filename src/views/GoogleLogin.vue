<template>
  <div>
    <h1>google</h1>
    <button id="buttonDiv">登入</button>
  </div>
</template>

<script>
import router from "../router";
import store from "../store";

export default {
  name: "GoogleLogin",
  mounted() {
    google.accounts.id.initialize({
      client_id:
        "1079940537622-qmk3031krlv4aoff9ckf39q9aknb5dkk.apps.googleusercontent.com",
      callback: (res) => {
        const parseJwt = (token) => {
          let base64Url = token.split(".")[1];
          let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          let jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          );

          return JSON.parse(jsonPayload);
        };

        const { name, picture } = parseJwt(res.credential);

        store.commit("setUserInfo", {
          name,
          avatar: picture,
          type: "google",
        });

        router.push("/home");
      },
    });

    google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  },
};
</script>

<style>
</style>