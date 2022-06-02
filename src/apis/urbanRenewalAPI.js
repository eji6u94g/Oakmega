import { apiHelper } from "../utilities/axiosSetting";

export default {
  getPolygonData() {
    return apiHelper.post('', {
      "directory": "tucheng.json",
      "function": "xinbei_json"
    })
  },
  getRenewalData(lng, lat) {
    return apiHelper.post('', {
      lng, lat, "function": "xinbei_distance"
    })
  },
}