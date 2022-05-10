<template>
  <div class="container">
    <div class="row align-items-center min-vh-100">
      <div
        class="col-12 col-sm-8 col-md-6 col-lg-4 offset-0 offset-sm-2 offset-md-3 offset-lg-4"
      >
        <form @submit.prevent="signUpWithEmailAndPassword">
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
              placeholder="name@example.com"
              v-model="data.email"
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
              v-model="data.username"
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
                v-model="data.password"
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
            <button type="submit" class="btn btn-primary">Sign Up</button>
            <button
              class="ms-3 btn btn-outline-danger"
              @click="this.$router.push('/sign-in')"
            >
              Cancel
            </button>
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
  name: "SignUpView",
  data() {
    return {
      email: "",
      username:"",
      password: "",
      message: "",
      isPasswordVisible: false,
    };
  },
  setup() {

    const data = reactive({
      email: '',
      username:'',
      password: ''
    });
    const router = useRouter();
    const signUpWithEmailAndPassword = async () => {
      await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
      await router.push('/sign-in');
    }
     return {
      data,
      signUpWithEmailAndPassword
    }
  },
  // methods: {
  //   async signUpWithEmailAndPassword(event) {
  //     event.preventDefault();

  //     const formData = {
  //       email: this.email,
  //       password: this.password,
  //     };
  //       console.log(formData) 
  //   },
  // },
};
</script>