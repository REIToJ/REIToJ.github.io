<template>
  <div class="todo">
    <div class="colorline" :class="{'colorLineDoneCompleted': !progress}"/>
    <div class="colorline2" :class="{'colorLineDoneCompleted': !progress}"/>
    <div class="todobg"/>
      <div class="todotext" :class="{'textDoneCompleted': !progress}"> {{ content }}  </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  props: ['content', 'id', 'progress', 'date'],
  emits: ['changedProgress', 'remmed', 'updatedContent'],
}
</script>

<style scoped>
.todo{
  position: relative;
  height: 100px;
  width: 500px;
  margin: auto;
  text-align: center;
}
.todobg{
  position: absolute;
  top: 0;
  left: 1%;
  z-index: -1;
  margin: auto ;
  background: whitesmoke;
  border-radius: 20px;
  height: 100%;
  width: 99%;
}
.colorline{
  position: absolute;
  top: 2%;
  left: 0;
  margin: auto;
  z-index: -2;
  margin: auto ;
  background: coral;
  border-radius: 20px;
  height: 96%;
  width: 100%;
}
.colorline2{
  position: absolute;
  top: 2%;
  left: 1%;
  right: 10;
  margin: auto;
  z-index: -2;
  margin: auto ;
  background: coral;
  border-radius: 20px;
  height: 96%;
  width: 100%;
}
.colorLineDoneCompleted{
   background: green; 
}
.todotext{
    font-size: 20px;
  position: absolute;
  margin-left: 16%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  height: 100%;
  width: 67%;
}
.tododate{
    font-size: 20px;
  position: absolute;
  margin-left: 15%;
  margin-top: 3%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  height: 100%;
  width: 67%;
}
.textDoneCompleted{
    text-decoration: line-through;
}
.controlButtons{
  margin-right: 5%;
  position: absolute;
  top: 0;
  right: 0;
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.controlButtonDone,  .controlButtonCancel, .controlButtonEdit, .controlButtonAdd{
  color: black;
  cursor: pointer;
  padding: 0;
  margin: 0;
  border: none;
  text-align: center;
  background: whitesmoke;
  transition: all 0.2s ease;
}
.controlButtonDone:hover,  .controlButtonCancel:hover, .controlButtonEdit:hover, .controlButtonAdd:hover{
  transition: all 0.2s ease;
  transform: scale(1.2);
}
.controlButtonDoneCompleted, .controlButtonAdd{
  color: green;
}

.controlButtonCancel{
  color: red;
}
.todoinput{
    color: rgb(60, 60, 60);
    width: 100%;
    border-radius: 20px;
    border: 1px lightslategray solid;
    padding-top: 10px;
    padding-bottom: 10px;;
    padding-left: 10px;
    padding-right: 10px;
    transition: all 0.2s ease;
    background: whitesmoke;
}
.todoinput:focus{
    transition: all 0.2s ease;
    transform: scale(1.025);
    border: 2px lightslategray solid;
    outline: none;
}
</style>