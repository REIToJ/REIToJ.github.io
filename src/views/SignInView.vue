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
              v-model="this.email"
              placeholder="name@example.com"
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
                v-model="this.password"
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
export default {
  name: "SignInView",
  data() {
    return {
      email: "",
      password: "",
      message: "",
      isPasswordVisible: false,
    };
  },
  
  
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
   
}

  </script>