<template>
  <div>
    <h1>用户列表</h1>
  <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: "userlist",
      created(){
          console.log("用户组件创建完成了")
      }
    }
</script>

<style scoped>

</style>
