<template>
    <div class="diary">
      <h2>Дневник символов</h2>
      <div class="canvas-container">
        <canvas ref="canvas" width="400" height="400" @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing"></canvas>
        <button @click="clearCanvas">Очистить</button>
        <button @click="saveDrawing">Сохранить рисунок</button>
      </div>
      <div class="entries">
        <h3>Записи</h3>
        <ul>
          <li v-for="(entry, index) in entries" :key="index">
            <img :src="entry.image" alt="Рисунок" width="100" />
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const canvas = ref(null);
  const context = ref(null);
  const isDrawing = ref(false);
  const entries = ref([]);
  
 
  const startDrawing = (event) => {
    isDrawing.value = true;
    draw(event);
  };
  
  
  const draw = (event) => {
    if (!isDrawing.value) return;
  
    const rect = canvas.value.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    context.value.beginPath();
    context.value.arc(x, y, 5, 0, Math.PI * 2);
    context.value.fillStyle = 'black';
    context.value.fill();
  };
  
 
  const stopDrawing = () => {
    isDrawing.value = false;
  };
  
 
  const clearCanvas = () => {
    context.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  };
  
 
  const saveDrawing = () => {
    const image = canvas.value.toDataURL('image/png');
    entries.value.push({
      id: Date.now(),
      image
    });
  };
  
 
  onMounted(() => {
    context.value = canvas.value.getContext('2d');
  });
  </script>
  
  <style scoped>
  .diary {
    padding: 20px;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 10px;
    max-width: 600px;
    margin: auto;
  }
  
  .canvas-container {
    position: relative;
    margin-bottom: 20px;
  }
  
  canvas {
    border: 1px solid #ccc;
    background: #fff;
  }
  
  button {
    margin-right: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .entries img {
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  </style>
  