<template>
  <div class="List-container">
    <div>
      <p>Google profile picture</p>
      <img :src="$store.state.userInfo.google.avatar" alt="" />
    </div>
    <div>
      <p>FB profile picture</p>
      <img :src="$store.state.userInfo.fb.avatar" alt="" />
    </div>
    <div>
      <input type="text" placeholder="請輸入您要查詢的地址" />
      <label for=""
        ><span class="material-symbols-outlined"> search </span>
      </label>
    </div>

    <div
      class="List-item"
      v-for="(item, index) in $store.state.renewalDataGroup"
      :key="index"
    >
      <p>{{ item.stop_name }}</p>
      <p>{{ item.distance }} km</p>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  name: "List",
  data() {
    return {
      url: null,
    };
  },
  created() {
    console.log(typeof store.state.userInfo.google.avatar);
  },
};
</script>

<style lang="scss">
.List {
  &-container {
    background-color: rgb(246, 246, 246);
    width: 100%;
    padding: 20px 0;
  }
  &-item {
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    margin: 20px auto;
    padding-left: 5%;
    padding-right: 5%;
    box-shadow: 0 0 1px 1px rgb(233, 232, 232);
    cursor: pointer;
  }
}
</style>