<template>
  <div id="map" style="width:800px;height:400px;margin-left: 300px;margin-top: 100px"></div>
</template>

<script>
    export default {
        name: "mendianweihu",
      data(){
          return{
            longitude: "",
            latitude: "",
            shid: sessionStorage.getItem("shid"),
            shlat: sessionStorage.getItem("shlat"),
            shlng: sessionStorage.getItem("shlng"),
            shData:[]
          };
      }, methods: {
        init() {
          let address = "";
          let that = this;
          var center = new qq.maps.LatLng(that.shlat, that.shlng);
          var map = new qq.maps.Map(document.getElementById('map'), {
            center: center,
            zoom: 50,
            disableDefaultUI: true
          });
          var marker = new qq.maps.Marker({
            position: center,
            map: map
          });
          var infoWin = new qq.maps.InfoWindow({
            map: map
          });
          var geocoder = new qq.maps.Geocoder({
            complete: function(res) {
              console.log(res);
              address = res.detail.nearPois[0].name;
            }
          });
          qq.maps.event.addListener(map, "click", function(event) {
            this.longitude = event.latLng.getLat();
            this.latitude = event.latLng.getLng();
            console.log(event);
            let lat = new qq.maps.LatLng(this.longitude, this.latitude);
            geocoder.getAddress(lat);
            setTimeout(() => {
              infoWin.open();
              infoWin.setContent(
                '<div style="text-align:center;white-space:nowrap;">' +
                address +"哇哇哇哇哇"+
                "</div>"
              );
              infoWin.setPosition(event.latLng);
            }, 200);
          });
        }
      },
      mounted() {
        this.init();
      }
    };
</script>

<style scoped>

</style>
