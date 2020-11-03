<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
html,
body {
  height: 100%;
  background-color: #f4f8f9;
}
#app {
  width: 100%;
  height: 100%;
  position: absolute;
}
* {
  margin: 0;
  padding: 0;
}
</style>
