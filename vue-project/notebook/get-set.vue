<template>
    <div>
      <input type="checkbox" v-model="myCheck">
    </div>
  </template>
  
  <script>
  import { set } from 'vue'
  export default {
    data(){
      return{
        checked:false,
      }
    },
    computed:{
      myCheck:{
        get(){
          return this.checked
        },
        set(val){
            console.log(val);
            this.checked = val;
        }
      }
    }
  
  }
  </script>
  
  <style>
  
  </style>