import Vue from 'vue';

export default new Vue()

/*
作为传递数据的实例
使用方法

this.$emit('send', {data})

this.$on('send',data=>{
    console.log(data)
})
*/