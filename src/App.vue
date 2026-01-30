<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* KHÔNG cho app bị bóp quá nhỏ */
#app {
  min-width: 320px;
  /* iPhone SE trở lên */
  overflow-x: hidden;
}
</style>
