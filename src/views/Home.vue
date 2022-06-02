<template>
  <main>
    <Map />
    <List />
  </main>
</template>

<script>
import Map from "../components/Map.vue";
import List from "../components/List.vue";

export default {
  name: "Home",
  components: {
    Map,
    List,
  },
};
</script>
