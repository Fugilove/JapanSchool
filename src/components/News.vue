<template>
    <div class="news">
      <h3>Новости Японии</h3>
      <iframe
        src="https://www3.nhk.or.jp/nhkworld/ru/news/"
        frameborder="0"
        width="100%"
        height="600px"
        allowfullscreen
      ></iframe>
    </div>
  </template>
  
  <style scoped>
  .news {
    padding: 20px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  iframe {
    border: none;
    border-radius: 5px;
  }
  </style>
  