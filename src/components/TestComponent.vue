<template>
  <div class="hello">
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
</template>

<script>
// chỉ có một thẻ div chỉ cho một thẻ div
export default {
  name: 'TestComponent',
  props: [
    'tinNhan', "newPerson"
  ],
  // vua la object(kiem tra object) array
  data() {
    return {
      message: 'first message',
      isVisible: false,
      isRender: false,
      number: 0,
      money: 123456789,
      isRed: true,
      isBig: true
    }
  },
  methods: {
    toggleBox() {
      this.isVisible = !this.isVisible
    },
    clickButton(id) {
      console.log("Click Button");
      console.log(id);
    }
  },
  watch: {
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
