<template>
  <div id="app" v-cloak>
    <h1>Weather App</h1>
    <v-card-text>
      <v-row
        align="center"
        justify="center"
        @click="selectCity(city)" v-for="(city,index) in listCity" :key="index" value="city.id"
      >
        <v-btn>{{city.name}}</v-btn>
      </v-row>
    </v-card-text>
    <div class="grid-container">
      <div class="grid-item" v-html="img">

      </div>
      <div class="grid-item">
        <img width="100%" height="100%" src="https://www.daysoftheyear.com/cdn-cgi/image/dpr=1%2Cf=auto%2Cfit=pad%2Cheight=675%2Cmetadata=none%2Conerror=redirect%2Cq=85%2Cwidth=1200/wp-content/uploads/look-up-at-the-sky-day-1.jpg">
        <div class="information">
          <p class="day">Ngày</p>
          <p class= "weather">{{dayPhase}}</p>
          <p class="temp">{{maxTemp}}&deg;C</p>
          <p class="banner"></p>
          <div class="prediction">
            <div class="predicted_weather" v-for="(day,index) in fourDay" :key="index">
              <p>{{getDayOfWeek(day.Date)}}</p>
              <img width="20px" height="30px" v-bind:src="require('@/assets/' + urlIconDay(day.Day.Icon))">
              <p>{{fahrenheitToCelcius(day.Temperature.Maximum.Value)}}&deg;C</p>
            </div>
          </div>
        </div>
      </div>
      <div class="grid-item">
        <img width="100%" height="100%" src="https://thumbs.dreamstime.com/b/vector-drawing-weather-icon-cloud-style-glass-morphism-lightning-raindrops-dark-background-illustration-effect-212579434.jpg">
        <div class="information">
          <p class="day">Đêm</p>
          <p class= "weather">{{nightPhase}}</p>
          <p class="temp">{{minTemp}}&deg;C</p>
          <p class="banner"></p>
          <div class="prediction">
            <div class="predicted_weather" v-for="(day,index) in fourDay" :key="index">
              <p>{{getDayOfWeek(day.Date)}}</p>
              <img width="20px" height="30px" v-bind:src="require('@/assets/' + urlIconNight(day.Night.Icon))">
              <p>{{fahrenheitToCelcius(day.Temperature.Minimum.Value)}}&deg;C</p>
            </div>
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
// import City from './components/City';
import axios from "axios";
export default {
  name: 'App',
  // components: {
  // },
  data() {
    return {
        img: `
        <img width="100%" height="100%" src="https://lp-cms-production.imgix.net/image_browser/Ho%20Chi%20Minh%20City%20skyline.jpg?auto=format&fit=crop&sharp=10&vib=20&ixlib=react-8.6.4&w=850">
        <div class="city_name">
          <p>Hà Nội</p>
        </div>  
        `,
        currentCity: "",
        dayPhase: "",
        nightPhase: "",
        minTemp: "",
        maxTemp: "",
        fourDay: [],
        listCity: [
          {
            id: 1,
            code: 'HN',
            name: 'Hà Nội',
            location_Key: '353412',
            img_address: "https://i.ytimg.com/vi/FClS4ni4zfo/maxresdefault.jpg",
          },
          {
            id: 2,
            code: 'ĐN',
            name: 'Đà Nẵng',
            location_Key: '353954',
            img_address: "https://res.klook.com/image/upload/c_crop,w_1125,h_624,x_1,y_0/w_1125,h_624/w_80,x_15,y_15,g_south_west,l_klook_water/destination/ur2mrg23d91mex03l4mw.jpg",
          },
          {
            id: 3,
            code: 'HCM',
            name: 'Hồ Chí Minh',
            location_Key: '353981',
            img_address: "https://lp-cms-production.imgix.net/image_browser/Ho%20Chi%20Minh%20City%20skyline.jpg?auto=format&fit=crop&sharp=10&vib=20&ixlib=react-8.6.4&w=850",
          },
        ]
    }
  },
  methods: {
    getDayOfWeek(date) {
      // "2022-04-17T07:00:00+08:00"
      let fullDate = new Date(date);
      // object
      let indexDayOfWeek = fullDate.getDay();
      let dayOfWeek = '';
      switch (indexDayOfWeek) {
        case 0:
          dayOfWeek = "Chủ Nhật";
          break;
        case 1:
          dayOfWeek = "Thứ hai";
          break;
        case 2:
          dayOfWeek = "Thứ ba";
          break;
        case 3:
          dayOfWeek = "Thứ tư";
          break;
        case 4:
          dayOfWeek = "Thứ năm";
          break;
        case 5:
          dayOfWeek = "Thứ sáu";
          break;
        case 6:
          dayOfWeek = "Thứ bảy";
          break;
      }  
      return dayOfWeek;
    },
    async selectCity(city) {
      console.log(city);
      this.img = `
      <img width="100%" height="100%" src="${city.img_address}">
      <div class="city_name">
        <p>
          ${city.name}
        </p>
      </div>      
      `;
      this.currentCity = city.name;
      let locationKey = city.location_Key;
      let secretKey = 'gHuEn9ghiy20CHSHAJ4ccgWcdU0XWkGS';
      let url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?language=vi&apikey=${secretKey}`;
      await this.getAxios(url);
    },
    async getAxios(url) {
      await axios.get(url)
        .then(data => {
          console.log(data.data);
          let firstDay = data.data.DailyForecasts[0];
          console.log(firstDay);
          this.dayPhase = firstDay.Day.IconPhrase;
          this.nightPhase = firstDay.Night.IconPhrase;
          this.minTemp = this.fahrenheitToCelcius(firstDay.Temperature.Minimum.Value);
          this.maxTemp = this.fahrenheitToCelcius(firstDay.Temperature.Maximum.Value);
          this.fourDay = data.data.DailyForecasts.splice(1,4);
          console.log(this.fourDay);
        })
        .catch(error => {
          console.log(error);
          this.error = "Please enter again";
        });
    },
    fahrenheitToCelcius(f) {
      return Math.round((f-32)*5/9);
    },
    urlIconDay(i) {
      if([1,2].includes(i)) return '1.svg';
      if([3,4,5,6].includes(i)) return '2.svg';
      if([7,8,11].includes(i)) return '3.svg';
      if([12,13,14,18].includes(i)) return '4.svg';
      if([15,16,17].includes(i)) return '5.svg';
    },
    urlIconNight(i) {
      if([33,34].includes(i)) return '10.svg';
      if([35,36,37,38].includes(i)) return '11.svg';
      if([7,8,11].includes(i)) return '3.svg';
      if([12,13,14,18].includes(i)) return '4.svg';
    }
    // setCurrentCity(city) {
    //   this.currentCity = {
    //     id: city.id,
    //     code: city.code,
    //     name: city.name
    //   }
    // },
    // updateListCity(indexCity) {
    //   this.listCity.splice(indexCity, 1);
    // },
    // reserve () {
    //     this.loading = true
    //     setTimeout(() => (this.loading = false), 2000)
    // },
  },
  created() {
    this.selectCity(this.listCity[0]);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px auto;
  width: 100%;
  height: 1000px;
}
.current-city {
  border: 2px solid red;
}
.flex-container {
  display: flex;
  justify-content: center;
}
.col {
  height: 300px;
}
.rounded-pill {
  position: relative;
}
.p {
  position: absolute;
  right: 39%;
  display: block;
  font-size: 20px;
}

.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 0px 200px 0px 200px;
}

.grid-item {
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 0px;
  font-size: 20px;
  text-align: center;
  position: relative;
  color:black;
}
.information {
  position: absolute;
  transform: translate(-50%, 0%);
  bottom: 0%;
  left: 50%;
  width: 100%;
}
.city_name {
  position: absolute;
  bottom: 87%;
  width: 100%;
  color:white;
}
.prediction {
  display: grid;
  grid-template-columns: auto auto auto auto;
  margin-top: 50px;
}
.predicted_weather {
  font-size: 15px;
  color:white;
}
.day {
  transform: translate(0, -110px);
  color: white;
}
.weather {
  transform: translate(0, -50px);
}
.temp {
  transform: translate(0, -5px);
}
.banner {
  width: 80%;
  border: 0.005mm solid white;
  transform: translate(0px, 40px);
  display:center;
  margin:auto;
}
[v-cloak] {
  display: none;
}

</style>
