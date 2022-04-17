<template>
  <v-app>
  <div class="current-city" v-show="false">
      <h1>Thành phố đã chọn: {{ currentCity.name }}</h1>
      <h2>Mã thành phố đã chọn: {{ currentCity.code }}</h2>
      <h2>Id thành phố đã chọn: {{ currentCity.id }}</h2>
    </div>
    <city :listCity="listCity" v-show="false"
      @pickCity="setCurrentCity"
      @deleteCity="updateListCity"
    >


    
    <div class="hello">
      <!-- tuan qua cac nam thi 1: xu li rieng 2: sang nam -->
      <div>
        <button @click="emitButtonClick({id: 10, name: 'thai'})">EMIT</button>
      </div>
      <div>
        <input type="text" v-model="inputContent"/>
        <p>{{inputContent}}</p>
        <textarea cols="10" rows = "4" v-model = "textAreaContent"/>
        <p>{{textAreaContent}}</p>
        <input type="checkbox" v-model="checkbox"/>
        <p>{{checkbox}}</p>
        <input type="checkbox" value="value_1" v-model="array_checkbox"/>
        <input type="checkbox" value="value_2" v-model="array_checkbox"/>
        <input type="checkbox" value="value_3" v-model="array_checkbox"/>
        <p> {{array_checkbox}} </p>
        
        <div v-for="city in listCity" :key="city.id">
          <input type="checkbox" :value="city.id" v-model="selectedCity">
          <span>{{city.name}}</span>
        </div>
        <p>{{selectedCity}}</p>
        
        <div v-for="city in listCity" :key="city.id">
          <input type="radio" :value="city.id" v-model="radioCity">
          <span>{{city.name}}</span>
        </div>
        <p>{{radioCity}}</p>

        <select v-model="selectOptionCity" multiple>
          <option value="value_1">value_1</option>
          <option value="value_2">value_2</option>
          <option value="value_3">value_3</option>
        </select>
        <p>{{selectOptionCity}}</p>

        <select v-model="selectOptionCity2" multiple>
          <option v-for="city in listCity" :key="city.id" :value="city.id">{{city.name}}</option>
        </select>
        <p>{{selectOptionCity2}}</p>
      </div>
      <div>
        <label>name</label>
        <input type="text" v-model="newName">
        <p>{{errorName}}</p>
        <label>age</label>
        <input type="text" v-model="newAge">
        <p>{{errorAge}}</p>
        <label>city</label>
        <input type="text" v-model="newCity">
        <p>{{errorCity}}</p>
        <button @click="saveNewPerson()">SAVE</button>
      </div>
      <div v-for="(person, index) in isPerson" :key="index">
        {{person.name}} -- {{person.age}}
        <button @click="removePerson(index)">remove</button>
      </div>
      <div>
          <p v-for="(value, key, index) in newPerson" :key="index">
            {{"new " + key}} - {{value + "hello vietnam"}}
          </p>
          <!-- luon co key --> 
          <h3>16/02/2022</h3>
          <p>{{ moneyFormat }}</p>
          <button @click="clickButton(5)">click me</button>
          <p :class="{'red_text': isRed, 'big_font': isBig}">fdsjafkldsj</p>
          <p>{{isRed}} - isRed</p>
          <p>{{isBig}} - isBig</p>
      </div>
      <h1>{{ tinNhan }}</h1>
      <h2>{{newPerson.name}}</h2>
      <h2>{{newPerson.age}}</h2>
      <h2>{{newPerson.gender}}</h2>
      <hr>
      <input v-model="message" type="text">
      <p>{{message}}</p>    
      <p>{{ newMessage }}</p>    
      
      <button @click.prevent="toggleBox">Toggle box</button>
      <p v-show="!isVisible">hello world</p>
      <div v-show="isVisible" class="box">
        <p v-show="isVisible" class="content">this is !v-show</p>
      </div>
      <p v-if="number == 0">this is 0</p>
      <p v-else-if="number == 1">this is 1</p>
      <p v-else>this is other number</p>
    </div>
  </v-app>
</template>

<script>
// chỉ có một thẻ div chỉ cho một thẻ div
export default {
  name: 'HelloWorld',
  props: [
    'tinNhan', "newPerson"
  ],
  // vua la object(kiem tra object) array
  data() {
    return {
      listCity: [
        {
          id: 1,
          name: "ha noi"
        },
        {
          id: 2,
          name: "da nang"
        },
        {
          id: 3,
          name: "ho chi minh"
        }
      ],
      selectOptionCity2: [],
      selectOptionCity: [], // khi chon mot => chuoi khi chon nhieu => mang
      radioCity: "",
      selectedCity: [],
      array_checkbox: [],
      inputContent: "hello",
      textAreaContent: "",
      checkbox: false,

      newName: "",
      newAge: "",
      newCity: "",
      errorName: "",
      errorAge: "",
      errorCity: "",
      checkError: false,
      message: 'first message',
      isVisible: false,
      isRender: false,
      number: 0,
      money: 123456789,
      isRed: true,
      isBig: true,
      isPerson: [
        {
          name: "Nguyanvana",
          age: 24,
          city: "hanoi"
        },
        {
          name: "Nguyanvana",
          age: 24,
          city: "hanoi"

        },
        {
          name: "Nguyanvana",
          age: 24,
          city: "hanoi"

        }
      ]
    }
  },
  methods: {
    emitButtonClick(object1) {
      console.log("Button clicked");
      this.$emit("buttonSent", object1);
    },
    toggleBox() {
      this.isVisible = !this.isVisible
    },
    clickButton(id) {
      console.log("Click Button");
      console.log(id);
    },
    removePerson(indexPerson) {
      console.log(indexPerson);
      this.isPerson.splice(indexPerson, 1);
    },
    saveNewPerson() {
      console.log(this.newName);
      console.log(this.newAge);
      console.log(this.newCity);
      if (this.newName == "") {
        this.errorName = "nhap ho va ten"
        this.checkError = true
      }
      if (this.newAge == "") {
        this.errorAge = "nhap so"
        this.checkError = true
      }
      if (this.newCity == "") {
        this.errorName = "nhap city"
        this.checkError = true
      }
      if (!this.checkError) {
        this.isPerson.push({
          name: this.newName,
          age: this.newAge,
          city: this.newCity
        });
      }
    }
  },
  watch: { // dem so lan thay doi
    message() { 
      console.log("message change");
    }
  },
  computed: { // bien duoc tinh toan dua tren bien 
    newMessage() {
      return this.message + this.message;
    },
    moneyFormat() {
      return this.money.toLocaleString();
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.box {
   background-color: purple;
   width: 200px;
   height: 200px;
   margin: auto;
   display: flex;
   align-items: center;
   justify-content: center;
}
.content {
  color: white;
}
.red_text {
  color:red;
}
.big_font {
  font: 100px;
}
</style>
