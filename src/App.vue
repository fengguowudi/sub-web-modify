<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
html,
body,
#app {
  min-height: 100%;
}

html {
  background: #eef3f8;
}

body {
  margin: 0;
  font-family: "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  color: #303133;
  background:
    radial-gradient(circle at top, rgba(64, 158, 255, 0.14), transparent 42%),
    linear-gradient(180deg, #f5f7fa 0%, #edf2f7 100%);
}

body.dark-mode {
  background:
    radial-gradient(circle at top, rgba(56, 189, 248, 0.14), transparent 40%),
    linear-gradient(180deg, #0f172a 0%, #111827 100%);
}

* {
  box-sizing: border-box;
}
</style>
