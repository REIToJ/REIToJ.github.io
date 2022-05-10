<template>
<UserInfo/>
 <div class="mb-3 mt-5 text-center">
            <h1>DSTU To-Do</h1>
            <router-link to="/sign-in" class="btn btn-primary">Leave</router-link>
          </div>
  
  <div class="navv">
    <span :class="{'navs' : !view_all, 'navs-active' : view_all}" @click="selectNav(1)">VIEW ALL</span>
    <span :class="{'navs' : !completed, 'navs-active' : completed}" @click="selectNav(2)">COMPLETED</span>
    <span :class="{'navs' : !ongoing, 'navs-active' : ongoing}" @click="selectNav(3)">ONGOING</span>
    <span :class="{'navs' : !datanav, 'navs-active' : datanav}" @click="selectNav(5)">BY DATA</span>
    <span :class="{'navsPlus' : !addit, 'navs-activePlus' : addit}" @click="selectNav(4)">+</span>
  </div>

  <div v-if="view_all">
    <div class="content" v-for="todo in todos" :key="todo">
      <Todo :content="todo.content" :id="todo.id" :progress="todo.inProgress" :date="todo.date" @changedProgress="toggleOngoing" @remmed="removeTodo" @updatedContent="changeContent"/>
    </div>
  </div>
  <div v-if="completed">
    <div class="content" v-for="todo in Completed" :key="todo">
      <Todo :content="todo.content" :id="todo.id" :progress="todo.inProgress" :date="todo.date" @changedProgress="toggleOngoing" @remmed="removeTodo" @updatedContent="changeContent"/>
    </div>
  </div>
  <div v-if="ongoing">
    <div class="content" v-for="todo in Ongoing" :key="todo">
     <Todo :content="todo.content" :id="todo.id" :progress="todo.inProgress" :date="todo.date" @changedProgress="toggleOngoing" @remmed="removeTodo" @updatedContent="changeContent"/>
    </div>
  </div>
    <div v-if="datanav">
    <div class="content" >
      <TodoGroup v-for="group in Datanav" :todos="group" :key="group"/>  
    </div>
  </div>
  <div v-if="addit">
    <NewTodo @addtodo="updateTodos"/>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import Todo from "../components/Todo.vue"
import NewTodo from "../components/NewTodo.vue"
import UserInfo from "../components/UserInfo.vue"
import TodoGroup from "../components/TodoGroup.vue"
import TodoListItem from "../components/TodoListItem.vue"

export default {
  name: 'HomeView',
  components: {
    Todo, NewTodo, UserInfo, TodoGroup, TodoListItem
  },
  setup(){
    //initial navigation

    const view_all = ref(true)
    const completed = ref(false)
    const ongoing = ref(false)
    const addit = ref(false)
    const datanav = ref(false)
    let dataGroupDone = [];

    function selectNav(num){
      if(view_all.value && num != 1){
        view_all.value = false;
      }
      if(completed.value && num != 2){
        completed.value = false;
      }
      if(ongoing.value && num != 3){
        ongoing.value = false;
      }
      if(addit.value && num != 4){
        addit.value = false;
      }
      if(datanav.value && num != 5){
        datanav.value = false;
      }

      if(num == 1){
        view_all.value = true;
      }
      else if(num == 2){
        completed.value = true;
      }
      else if(num == 3){
        ongoing.value = true;
      }
      else if (num ==4){
        addit.value = true;
      }
      else {
        datanav.value = true;


     }
    }

    //main todo content

    let todos = ref([
      {content: "This is a Todo", inProgress: true, date:"24.11.2001", id: 1},
      {content: "This is another Todo", inProgress: true, date:"23.11.2001", id: 2},
      {content: "This is yet another Todo", inProgress: false, date:"23.11.2001", id: 3},
    ])
    

    const Completed = computed(() => {
      return todos.value.filter((todo) => todo.inProgress === false)

    })
    const Ongoing = computed(() => {
      return todos.value.filter((todo) => todo.inProgress === true)
    })
    let Datanav = computed(() => {
              let Data = []
        for (let i = 0; i < todos.value.length; i++) {

          Data.push(todos.value[i].date)
        }
        let uniqueData = [...new Set(Data)]
        let dataGroup=[];
       
          
        for (let i = 0; i < uniqueData.length; i++) {
          let temp = []
         
          for (let j = 0; j < todos.value.length; j++) {
           
            if (todos.value[j].date == uniqueData[i]) {
            
              temp.push(todos.value[j])
            
            } 
          }
          dataGroup.push(temp)
         
          

        }    
                dataGroupDone = dataGroup
                 

        return dataGroupDone
    })

    function toggleOngoing(theId){
      todos.value.forEach((todo) => {
        if(todo.id == theId){
          todo.inProgress = !todo.inProgress
        }
      })
    }

    function removeTodo(theId){
      let idx = 1
      todos.value = todos.value.filter((todo) => todo.id != theId)
      todos.value.forEach((todo) => {
        todo.id = idx;
        idx++
      })
    }

    function updateTodos(stuff, stuff2){
      todos.value.push({content: stuff, date:stuff2, inProgress: true, id: todos.value.length + 1})
    }

    function changeContent(theId, newContent, newDate){
      todos.value.forEach((todo) => {
        if(todo.id == theId){
          todo.content = newContent
          todo.date = newDate
        }
      })
    }
    let array = [[{content:'aaa'}],[{content:'bbb'}]]
    return {view_all, completed, ongoing, addit, selectNav, todos, dataGroupDone, Completed, Ongoing, datanav, Datanav, array,  toggleOngoing, removeTodo, updateTodos, changeContent}
  }
}
</script>

<style scoped>
.navv{
  margin-top: 10px;
  text-align: center;
}
.navs{
  display: inline-block;
  margin: 25px;
  font-size: 0.85em;
  color: gray;
  transition: all 0.2s ease;
}
.navs-active{
  display: inline-block;
  margin: 25px;
  font-size: 0.9em;
  color: rgb(40, 40, 40);
  transition: all 0.2s ease;
}
.navs:hover, .navs-active:hover, .navsPlus:hover, .navs-activePlus:hover{
  cursor: pointer;
}
.content{
  text-align: center;
  margin: 20px auto;
}
.navsPlus{
  transform: translateY(10%);
  margin: 25px;
  display: inline-block;
  font-size: 1.5em;
  color: gray;
  transition: all 0.2s ease;
}
.navs-activePlus{
  transform: translateY(10%);
  display: inline-block;
  margin-left: 22.5px;
  margin-right: 22.5px;
  margin-top: 17.5px;
  margin-bottom: 17.5px;
  font-size: 2em;
  color: rgb(40, 40, 40);
  transition: all 0.2s ease;
}
</style>
