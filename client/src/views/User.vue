<template>
  <div id="user">
<!-- 
    <b-nav id="user-header" align="right">
      <b-nav-item :to="{ name: 'userList', query: { page: 1 } }" exact-active-class="active">List</b-nav-item>
      <b-nav-item :to="{ name: 'userAccount' }" exact-active-class="active">Account</b-nav-item>
    </b-nav>
 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "user",
};
</script>

<style lang="scss" scoped>
  #user {
    flex-grow: 1;
  }
</style>