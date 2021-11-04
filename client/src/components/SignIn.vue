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
    <b-form class="py-2" @submit.prevent="signInSubmit">
      <label for="username" class="p-2" block>Login</label>
      <b-form-input
        type="text"
        id="username"
        v-model="formResponse.username"
        placeholder="login"
      ></b-form-input>
      <b-input-group class="">
        <label for="password" class="p-2" block>Password</label>
        <b-form-input
          :type="isVisible ? 'text' : 'password'"
          id="password"
          v-model="formResponse.password"
          placeholder="password"
        ></b-form-input>
        <b-input-group-prepend is-text @click="togglePassword">
          <b-icon :icon="isVisible ? 'eye-fill' : 'eye-slash-fill'" font-scale="1.5"></b-icon>
        </b-input-group-prepend>
      </b-input-group>
      <input type="submit" value="Sign In" :disabled="!status" class="mt-4">
    </b-form>
    <p class="pt-3">
      Don't Have an account? <a href="" @click.prevent="$emit('link-func')">Sign Up</a>
    </p>
  </div>
  <!-- valid-feedback="Thank you!"
          :invalid-feedback="invalidFeedback"
          :state="state" -->
</template>

<script>
import axios from "axios";

export default {
  name: "SignIn",

  data() {
    return {
      formResponse: {
        username: "",
        password: "",
      },
      isVisible: false,
      errorInfo: null,
    }
  },
  computed: {
    status(){
      return this.formResponse.username.length >= 4 && this.formResponse.password.length >= 4
    },
  },
  methods: {
    togglePassword() {
      this.isVisible = !this.isVisible;
    },
    signInSubmit() {
      // const str = JSON.stringify(this.requestBody);
      axios({
        method: "post",
        url: "https://localhost:9000/api/auth/login",
        "Access-Control-Allow-Origin": "*",
        data: this.formResponse,
      })
        .then((res) => {
          const {token, username, favorite} = res.data
          this.errorInfo = null;
          this.formResponse.username = "";
          this.formResponse.password = "";
          this.$store.dispatch("setToken", token);
          this.$store.dispatch("setUsername", username);
          this.$store.dispatch("setFavorite", favorite);
          localStorage.setItem("user-token", token);
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
  height: 100%;
  max-width: 380px;
  border-radius: 0.5rem;
  padding: 1rem 2.5rem;
  margin-top: 4rem;
  background-color: #fff;
  align-self: flex-start;
}
label {
  display: block;
  width: 100%;
  text-align: left;
}
.input-group-text {
  &:hover {
    cursor: pointer;
  }
}

#warning {
  color: red;
  background-color: #ddd;
  padding: 0.8rem 1.2rem;
  font-size: 1.2rem;
  border-radius: 0.5rem;
  margin: auto;
}

@media screen and (max-width: 576px) {
.container {
  margin-top: 0;
  max-width: 100%;
  border-radius: 0;
}
}
</style>
