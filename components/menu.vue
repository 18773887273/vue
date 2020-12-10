

<template>

<!--导航菜单-折叠后-->
<!--<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
  <li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
    <template v-else-if="!item.leaf">
      <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
      <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
        <li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
      </ul>
    </template>

      <template>
      <li class="el-submenu">
        <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
      </li>
      </template>
</li>
</ul>-->
</template>



<script>
  export default {
    name: 'app',
    data() {
      return {
        menus: [] //当前登录用户所能看到的菜单
      }
    },

    mounted() {
      var user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user.name || '';
        // this.sysUserAvatar = user.avatar || '';  avatar//图片路径
      }
     // 取出当前用户能看到的所有菜单, 并赋值
      let item = sessionStorage.getItem("menus");
      this.menus = JSON.parse(item);
    }
  }
</script>

<style scoped>

</style>
