<template>
  <div class="container">
    <p text-align="center">购物车</p>
    <ul v-for="item of arr" :key="item.name">
      <li>
        <input type="checkbox" v-model="item.state">
      {{item.name}}
      </li>
      <li>{{item.public}}</li>
      <li>{{item.price}}</li>
      <li>{{item.num}}</li>
    </ul>
    <h4><input type="checkbox" v-model="allstate">全选</h4>
  </div>
</template>

<script>
export default {
  data(){
    return {
      arr: [
        {
          name: "算法导论",
          public: "2006-9",
          price: 85,
          num: 1,
          state:false
        },
        {
          name: "Unix编程艺术",
          public: "2006-2",
          price: 59,
          num: 2,
          state:false
        },
        {
          name: "编程珠玑",
          public: "2006-9",
          price: 65,
          num: 3,
          state:false
        },
      ],

    }
  },
  computed:{
    allstate:{
      get(){
        //遍历每一项，当每一项都满足条件时，为true
        return this.arr.every(item=>item.state)
      },
      set(val){
        console.log(val)
        this.arr.forEach(item=>{
          item.state = val
        })
      }
    }
  }
}
</script>

<style>
.container{
  width: 700px;
  height: 700px;
  position: relative;
}
.container ul{
  overflow: hidden;
  margin-left: 20px;
}
.container li{
  list-style: none;
  float: left;
  margin-top: 40px;
  margin-left: 50px;
}
.container h4{
  position: absolute;
  right: 0px;
}
</style>