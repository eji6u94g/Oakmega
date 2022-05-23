<template>
  <div id="app">
    <h1>maps</h1>
    <div id="map"></div>
  </div>
</template>

<script>
// let map = L.map("map").setView([22, 120], 13);
// let osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
// map.addLayer(osm);
// L.tileLayer(osmUrl, {
//   minZoom: 8,
//   maxZoom: 16,
// }).addTo(map);
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  name: "App",
  data() {
    return {
      location: [25.02716, 121.43256],
    };
  },
  methods: {
    setupLeafletMap: function () {
      const map = L.map("map").setView(this.location, 13);
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken:
            "pk.eyJ1IjoiZWppNnU5NCIsImEiOiJjbDNpb3YwMncxNGFpM2J3MWR0bmFmNmt5In0.EOSG6Y3Yue6_a45YEa7r0w",
        }
      ).addTo(map);
    },
  },
  mounted() {
    this.setupLeafletMap();
  },
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#map {
  height: 500px;
}
</style>
