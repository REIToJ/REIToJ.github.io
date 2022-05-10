<template>
  <div v-if="todos.length > 0">
    <h4  style="font-family: 'Days One'; cursor: default; color: #7E7E7E;">{{todos[0].date}}</h4>
    <transition-group name="user-list">
      <TodoListItem
          v-for="todo in todos"
          :key="todo"
          :content="todo.content" 
          :id="todo.id" 
          :progress="todo.inProgress" 
          :date="todo.date" 
      />
    </transition-group>
  </div>

</template>

<script>
import TodoListItem from "@/components/TodoListItem.vue";
export default {
  components: {TodoListItem},
  props: {
    todos: {
      type: Array,
      required: true,
    }
  },
  
}
</script>

<style scoped>
.user-list-item {
  display: inline-block;
  margin-right: 10px;
}
.user-list-enter-active,
.user-list-leave-active {
  transition: all 0.4s ease;
}
.user-list-enter-from,
.user-list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateX(130px);
}

.user-list-move {
  transition: transform 0.4s ease;
}
</style>

    