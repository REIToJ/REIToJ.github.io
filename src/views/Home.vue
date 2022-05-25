<template>
  <UserInfo />
  <div class="mb-3 mt-5 text-center">
    <h1>DSTU To-Do</h1>
    <router-link to="/" class="btn btn-primary" @click="leaveUser"
      >Leave</router-link
    >
  </div>

  <div class="navv">
    <span
      :class="{ navs: !view_all, 'navs-active': view_all }"
      @click="selectNav(1)"
      >VIEW ALL</span
    >
    <span
      :class="{ navs: !completed, 'navs-active': completed }"
      @click="selectNav(2)"
      >COMPLETED</span
    >
    <span
      :class="{ navs: !ongoing, 'navs-active': ongoing }"
      @click="selectNav(3)"
      >ONGOING</span
    >
    <span
      :class="{ navs: !datanav, 'navs-active': datanav }"
      @click="selectNav(5)"
      >BY DATA</span
    >
    <span
      :class="{ navsPlus: !addit, 'navs-activePlus': addit }"
      @click="selectNav(4)"
      >+</span
    >
  </div>

  <div v-if="view_all">
    <div class="content" v-for="todo in todos" :key="todo">
      <Todo
        :content="todo.content"
        :id="todo.id"
        :progress="todo.inProgress"
        :date="todo.date"
        @changedProgress="toggleOngoing"
        @remmed="removeTodo"
        @updatedContent="changeContent"
      />
    </div>
  </div>
  <div v-if="completed">
    <div class="content" v-for="todo in Completed" :key="todo">
      <Todo
        :content="todo.content"
        :id="todo.id"
        :progress="todo.inProgress"
        :date="todo.date"
        @changedProgress="toggleOngoing"
        @remmed="removeTodo"
        @updatedContent="changeContent"
      />
    </div>
  </div>
  <div v-if="ongoing">
    <div class="content" v-for="todo in Ongoing" :key="todo">
      <Todo
        :content="todo.content"
        :id="todo.id"
        :progress="todo.inProgress"
        :date="todo.date"
        @changedProgress="toggleOngoing"
        @remmed="removeTodo"
        @updatedContent="changeContent"
      />
    </div>
  </div>
  <div v-if="datanav">
    <div class="content">
      <TodoGroup v-for="group in Datanav" :todos="group" :key="group" />
    </div>
  </div>
  <div v-if="addit">
    <NewTodo @addtodo="updateTodos" />
  </div>
</template>

<script>
import { computed, ref } from "vue";
import Todo from "../components/Todo.vue";
import NewTodo from "../components/NewTodo.vue";
import UserInfo from "../components/UserInfo.vue";
import TodoGroup from "../components/TodoGroup.vue";
import TodoListItem from "../components/TodoListItem.vue";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    Todo,
    NewTodo,
    UserInfo,
    TodoGroup,
    TodoListItem,
  },
  data() {
    return {
      todos: [],
    };
  },
  setup() {
    const view_all = ref(true);
    const completed = ref(false);
    const ongoing = ref(false);
    const addit = ref(false);
    const datanav = ref(false);

    function selectNav(num) {
      if (view_all.value && num != 1) {
        view_all.value = false;
      }
      if (completed.value && num != 2) {
        completed.value = false;
      }
      if (ongoing.value && num != 3) {
        ongoing.value = false;
      }
      if (addit.value && num != 4) {
        addit.value = false;
      }
      if (datanav.value && num != 5) {
        datanav.value = false;
      }

      if (num == 1) {
        view_all.value = true;
      } else if (num == 2) {
        completed.value = true;
      } else if (num == 3) {
        ongoing.value = true;
      } else if (num == 4) {
        addit.value = true;
      } else {
        datanav.value = true;
      }
    }

    return { view_all, selectNav, addit, completed, ongoing, datanav };
  },
  methods: {
    toggleOngoing(theId) {
      console.log("Зашел");
      console.log("Айди" + theId);
      this.todos.forEach((todo) => {
        if (todo.id == theId) {
          todo.inProgress = !todo.inProgress;
          this.changePost(todo);
        }
      });
    },
    removeTodo(theId) {
      let idx = 1;
      this.todos = this.todos.filter((todo) => todo.id != theId);
      this.deletePost(theId);
      this.todos.forEach((todo) => {
        todo.id = idx;
        this.changePost(todo);
        idx++;
      });
    },

    updateTodos(stuff, stuff2) {
      this.todos.push({
        content: stuff,
        date: stuff2,
        inProgress: true,
        id: this.todos.length + 1,
      });
      this.sendPost(this.todos[lenght]);
    },

    changeContent(theId, newContent, newDate) {
      this.todos.forEach((todo) => {
        if (todo.id == theId) {
          todo.content = newContent;
          todo.date = newDate;
          this.changePost(todo);
        }
      });
    },
    async fetchPosts() {
      const data = await axios
        .get("http://localhost:5000/api/ToDoItems", {
          headers: {
            Authorization: `Bearer${localStorage.getItem("userToken")}`,
          },
        })
        .then(function (response) {
          this.todos.push(response.data);
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async sendPosts() {
      for (let i = 0; i < this.todos.lenght; i++) {
        const data = await axios
          .post(
            "http://localhost:5000/api/toDoItems",
            {
              id: this.todos[i].id,
              content: this.todos[i].content,
              inProgress: this.todos[i].inProgress,
              date: this.todos[i].date,
            },
            {
              headers: {
                Authorization: `Bearer${localStorage.getItem("userToken")}`,
              },
            }
          )
          .then(function (response) {
          console.log(response);
        })
          .catch(function (error) {
            console.log(error);
          });
          
      }
    },
    async sendPost(todo) {
      const data = await axios
        .post(
          "http://localhost:5000/api/toDoItem",
          {
            id: this.todo.id,
            content: this.todo.content,
            inProgress: this.todo.inProgress,
            date: this.todo.date,
          },
          {
            headers: {
              Authorization: `Bearer${localStorage.getItem("userToken")}`,
            },
          }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async changePost(todo) {
      const data = await axios
        .put(
          `http://localhost:5000/api/toDoItem/${todo.id}`,
          {
            id: this.todo.id,
            content: this.todo.content,
            inProgress: this.todo.inProgress,
            date: this.todo.date,
          },
          {
            headers: {
              Authorization: `Bearer${localStorage.getItem("userToken")}`,
            },
          }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async deletePost(theId) {
      const data = await axios
        .delete(`http://localhost:5000/api/toDoItem/${theId}`, {
          headers: {
            Authorization: `Bearer${localStorage.getItem("userToken")}`,
          },
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    leaveUser() {
      localStorage.removeItem("userToken");
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    Ongoing() {
      return todos.value.filter((todo) => todo.inProgress === true);
    },
    Completed() {
      return todos.value.filter((todo) => todo.inProgress === false);
    },
    Datanav() {
      let Data = [];
      for (let i = 0; i < todos.value.length; i++) {
        Data.push(todos.value[i].date);
      }
      let uniqueData = [...new Set(Data)];
      let dataGroup = [];

      for (let i = 0; i < uniqueData.length; i++) {
        let temp = [];

        for (let j = 0; j < todos.value.length; j++) {
          if (todos.value[j].date == uniqueData[i]) {
            temp.push(todos.value[j]);
          }
        }
        dataGroup.push(temp);
      }
      dataGroupDone = dataGroup;

      return dataGroupDone;
    },
  },
};
</script>

<style scoped>
.navv {
  margin-top: 10px;
  text-align: center;
}
.navs {
  display: inline-block;
  margin: 25px;
  font-size: 0.85em;
  color: gray;
  transition: all 0.2s ease;
}
.navs-active {
  display: inline-block;
  margin: 25px;
  font-size: 0.9em;
  color: rgb(40, 40, 40);
  transition: all 0.2s ease;
}
.navs:hover,
.navs-active:hover,
.navsPlus:hover,
.navs-activePlus:hover {
  cursor: pointer;
}
.content {
  text-align: center;
  margin: 20px auto;
}
.navsPlus {
  transform: translateY(10%);
  margin: 25px;
  display: inline-block;
  font-size: 1.5em;
  color: gray;
  transition: all 0.2s ease;
}
.navs-activePlus {
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
