<template>
  <div class="container">
    <div class="row align-items-center min-vh-100">
      <div
        class="col-12 col-sm-8 col-md-6 col-lg-4 offset-0 offset-sm-2 offset-md-3 offset-lg-4"
      >
        <form @submit.prevent="loginWithEmailAndPassword">
          <div class="mb-3 text-center">
            <h1>DSTU To-Do</h1>
          </div>
          <hr />
          <div class="mb-3">
            <label class="form-label" for="email">Email</label>
            <input
              class="form-control"
              type="email"
              name="email"
              id="email"
              v-model="email"
              placeholder="name@example.com"
              required
            />
          </div>
          <div class="mb-3">
            <label class="form-label" for="username">Username</label>
            <input
              class="form-control"
              type="text"
              name="username"
              id="username"
              placeholder="Your username"
              v-model="username"
              required
            />
          </div>
          <div class="mb-4">
            <label class="form-label" for="password">Password</label>
            <div class="input-group mb-3">
              <input
                :type="this.isPasswordVisible ? 'text' : 'password'"
                class="form-control"
                name="password"
                placeholder="Your secure password"
                v-model="password"
                required
              />
              <div class="input-group-text">
                <input
                  class="form-check-input mt-0 me-2"
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                  v-model="this.isPasswordVisible"
                />Show
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <button class="btn btn-primary"  >Sign In</button>
            <span class="ms-3 text-end"
              >Not registered yet?
              <router-link to="/sign-up" class="btn btn-primary">Sign Up</router-link></span
            >
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import {reactive} from 'vue';
import {useRouter} from "vue-router";
import axios from "axios";
export default {
  name: "SignInView",
  data() {
    return {
      email: "",
      password: "",
      username: "",
      isPasswordVisible: false,
    };
    
  },
  methods: {

      async loginWithEmailAndPassword() {
        const data = await axios.post(
            'http://localhost:5000/api/Authentication/login',
            {username:this.username,
            email:this.email,
            password:this.password})
              .then(function (response) {
                console.log(response);
              console.log(response.token);
              localStorage.setItem("userToken", response.token)
              console.log(localStorage.getItem("userToken"))
            })
            .catch(function (error) {
              console.log(error);
            });
          
        await this.$router.push('/')
      },
    }
}
  
  //  setup() {
  //   const data = reactive({
  //     email: '',
  //     username:'',
  //     password: ''
  //   });
  //   const router = useRouter();
  //   const loginWithEmailAndPassword = async () => {
  //     await fetch('http://localhost:5000/api/Authentication/login', {
  //       method: 'POST',
  //       mode: 'no-cors',
  //       headers: {'Content-Type': 'application/json'},
  //       credentials: 'include',
  //       body: {"email":data.email,
  //               "username":data.username,
  //               "password":data.password}
  //     });
  //     await router.push('/');
  //   }
  //    return {
  //     data,
  //     loginWithEmailAndPassword
  //   }
  // },
  
  // methods:{
  //   loginWithEmailAndPassword(e){
  //       e.preventDefault()
  //   const formData = {
  //       email: this.email,
  //       password: this.password,
  //     } 
  //     console.log(formData) 
  //     this.$router.push('/')
  // }
 
  // },
  //       async authorization() {
  //       if (this.login === '' && this.password === '') {
  //         alert('Поля авторизации пустое')
  //         return
  //       }
  //       const data = await axios.post(
  //           'http://localhost:7028/graphql/',
  //           {query:`mutation {
  //     authUser (userInput :{
  //     username: "${this.login}"
  //     password: "${this.password}"
  //   }) {
  //     token
  //     error
  //     status
  //   }
  // }`})
  //       if (data.data.data.authUser.error === "User is not exist") {
  //         alert('Пользователь не найден. Зарегистриуйтесь, пожалуйста')
  //         return
  //       }
  //       if (data.data.data.authUser.error === "Password is not correct") {
  //         alert('Пароль неверен. Попробуйте ещё раз')
  //         return
  //       }
  //       localStorage.setItem("userToken", data.data.data.authUser.token)
  //       this.$router.push('/posts')
  //     },
   


  </script>