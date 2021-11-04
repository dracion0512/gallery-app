<template>
  <div class="container">
    <div id="warning" class="my-3" v-if="!!errorInfo">
      <h4>{{ errorInfo.message }}</h4>
      <div v-if="errorInfo.errors" >
        <h5 v-for="error in errorInfo.errors.errors" :key="error.param">
          {{error.msg}} in {{error.param}} field
        </h5>
      </div>
    </div>
    <b-form @submit.prevent="registrationSubmit">
      <b-input-group class="">
      <label for="username" class="p-2 block">Username</label>
      <b-form-input
        type="text"
        id="username"
        placeholder="username"
        aria-describedby="username-help-block"
        :state="validationUsername"
        v-model="formResponse.username"
      ></b-form-input>
      <b-form-invalid-feedback id="username-check-help-block" :state="validationUsername">
        Your personal ID must be 5-20 characters long, contain only letters and numbers.
      </b-form-invalid-feedback>
      </b-input-group>
      <b-input-group class="">
      <label for="password" class="p-2 block">Password</label>
      <b-form-input
        :type="isVisible ? 'text' : 'password'"
        id="password"
        placeholder="password"
        aria-describedby="password-help-block"
        :state="validationPassword"
        v-model="formResponse.password"
      ></b-form-input>
        <b-input-group-prepend is-text @click="togglePassword">
          <b-icon :icon="isVisible ? 'eye-fill' : 'eye-slash-fill'" font-scale="1.5"></b-icon>
        </b-input-group-prepend>
      <b-form-invalid-feedback id="password-check-help-block" :state="validationPassword">
        Your password must be 5-20 characters long, contain only letters and numbers.
      </b-form-invalid-feedback>
      </b-input-group>
      <input type="submit" value="Sign Up" :disabled="!isValid" class="mt-4">
    </b-form>
    <p class="pt-4">
      Have an account?
      <a href="" @click.prevent="$emit('link-func')">Sign In</a>
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignUp",

  data() {
    return {
      formResponse: {
        username: "",
        password: "",
      },
      isVisible: false,
      errorInfo: null,
    };
  },
  computed: {
    validationUsername() {
      let { username } = this.formResponse;
      let pattern = /^[a-zA-Z0-9]+$/g;
      return (
        username.length > 4 && username.length <= 20 && pattern.test(username)
      );
    },
    validationPassword() {
      let { password } = this.formResponse;
      let pattern = /^[a-zA-Z0-9]+$/g;
      return (
        password.length > 4 && password.length <= 20 && pattern.test(password)
      );
    },
    isValid() {
      return this.validationUsername && this.validationPassword
    }
  },
  methods: {
    togglePassword() {
      this.isVisible = !this.isVisible;
    },
    registrationSubmit() {
      // const str = JSON.stringify(this.requestBody);
      axios({
        method: "post",
        url: "https://localhost:9000/api/auth/registration",
        "Access-Control-Allow-Origin": "*",
        data: this.formResponse,
      })
        .then((res) => {
          this.formResponse.username = "";
          this.formResponse.password = "";
          this.errorInfo = null; 
          this.$store.dispatch("setToken", res.data.token);
          this.$store.dispatch("setUsername", res.data.username);
          this.$store.dispatch("setFavorite", res.data.favorite);
          localStorage.setItem("user-token", res.data.token);
          this.$router.push({ name: 'gallery' })
        })
        .catch((e) => {
          console.error(e);
          this.errorInfo = e.response.data;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container {
  padding: 2rem 3rem;
  max-width: 380px;;
  margin: auto;
  margin-top: 3rem;
  margin-bottom: 3rem;
  background-color: #fffffd;
  border-radius: 0.25rem;
  position: relative;
}
.block{
  display: block;
  text-align: left;
  width: 100%;
}
small {
  display: block;
}

#warning {
  color: red;
  background-color: #ddd;
  padding: 0.8rem 1.2rem;
  font-size: 1.2rem;
  border-radius: 0.5rem;
  margin: auto;
}

@media screen and (max-width:576px) {
  .container {
    margin-top: 0;
  }
}
</style>
