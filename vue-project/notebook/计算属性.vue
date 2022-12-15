<template>
    <div>
      <input type="text" v-model="msg">
      <p>{{value}}</p>
      <div>list中price的和:{{res}}</div>
    </div>
  </template>
  
  <script>
  // 计算属性 本质就是对data中的值进行计算，减少模板中的逻辑
  export default {
    data(){
      return{
        msg:"vue",
        list:[
          {name:"html",price:30},
          {name:"css",price:20},
          {name:"vue",price:40}
        ]
      }
    },
    computed:{
      value(){
        return this.msg.split("").reverse().join("").toUpperCase()
      },
      res(val){
        var res = 0;
        this.list.forEach(item=>{
          res+=item.price
        })
        return res
      }
  
    }
  }
  </script>
  
  <style>
  
  </style>