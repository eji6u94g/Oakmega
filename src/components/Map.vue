<template>
  <div id="map"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import store from "../store";

export default {
  name: "Map",
  methods: {
    initializeMap() {
      const map = L.map("map").setView(store.state.userLocation, 13);

      /// implement basic map
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

      /// implement polygon
      for (let polygon of store.state.polygonDataGroup) {
        L.polygon(polygon, {
          color: "red",
        }).addTo(map);
      }

      /// implement icons of renewal locations on map
      const defaultIcon = L.icon({
        iconUrl: require("../../node_modules/leaflet/src/images/marker.svg"),
        iconSize: 20,
      });

      for (let renewalData of store.state.renewalDataGroup) {
        L.marker([renewalData.latitude, renewalData.longitude], {
          icon: defaultIcon,
        }).addTo(map);
      }

      ///implement icons of user picture
      const userFbIcon = L.icon({
        iconUrl: store.state.userInfo.fb.avatar,
        iconSize: 100,
      });
      const userGoogleIcon = L.icon({
        iconUrl: store.state.userInfo.google.avatar,
        iconSize: 50,
      });

      L.marker(store.state.userLocation, {
        icon: userFbIcon,
      }).addTo(map);
      L.marker(store.state.userLocation, {
        icon: userGoogleIcon,
      }).addTo(map);
    },
  },
  mounted() {
    this.initializeMap();
  },
};
</script>

<style lang="scss">
#map {
  height: 500px;
}
</style>