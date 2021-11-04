<template>
  <section id="user-account">
    <div class="container">
      <div id="warning" class="my-3" v-if="!!errorInfo">
        <h4>{{ errorInfo.message }}</h4>
        <div v-if="errorInfo.errors">
          <h5 v-for="error in errorInfo.errors.errors" :key="error.param">
            {{ error.msg }} in {{ error.param }} field
          </h5>
        </div>
      </div>
      <b-form class="py-2" @submit.prevent>
        <label for="username" class="p-2" block>Set login</label>
        <b-form-input
          :state="formResponse.username.length > 0 ? validationUsername : null"
          type="text"
          id="username"
          v-model="formResponse.username"
          placeholder="new login"
        ></b-form-input>
        <b-form-invalid-feedback
          id="password-check-help-block"
          :state="validationUsername"
          v-if="formResponse.username.length > 0"
        >
          Your personal ID must be 5-20 characters long, contain only letters
          and numbers.
        </b-form-invalid-feedback>
        <b-input-group class="">
          <label for="password" class="p-2" block>Set password</label>
          <b-form-input
            :state="
              formResponse.password.length > 0 ? validationPassword : null
            "
            :type="isVisible ? 'text' : 'password'"
            id="password"
            v-model="formResponse.password"
            placeholder="new password"
          ></b-form-input>
          <b-input-group-prepend is-text @click="togglePassword">
            <b-icon
              :icon="isVisible ? 'eye-fill' : 'eye-slash-fill'"
              font-scale="1.5"
            ></b-icon>
          </b-input-group-prepend>
          <b-form-invalid-feedback
            id="password-check-help-block"
            :state="validationPassword"
            v-if="formResponse.password.length > 0"
          >
            Your password must be 5-20 characters long, contain only letters and
            numbers.
          </b-form-invalid-feedback>
          <label for="password" class="p-2" block>Current password</label>
          <b-form-input
            :state="
              formResponse.currentPassword.length > 0
                ? validationCurrentPassword
                : null
            "
            :type="isVisible ? 'text' : 'password'"
            id="current_password"
            v-model="formResponse.currentPassword"
            placeholder="current password"
          ></b-form-input>
          <b-input-group-prepend is-text @click="togglePassword">
            <b-icon
              :icon="isVisible ? 'eye-fill' : 'eye-slash-fill'"
              font-scale="1.5"
            ></b-icon>
          </b-input-group-prepend>
        </b-input-group>
        <b-form-invalid-feedback
          id="password-check-help-block"
          :state="validationCurrentPassword"
          v-if="
            (formResponse.username.length > 0 && validationUsername) ||
            (formResponse.password > 0 && validationPassword) ||
            (formResponse.currentPassword > 0 && validationCurrentPassword)
          "
        >
          Please input your current password to save changes.
        </b-form-invalid-feedback>
        <input
          type="submit"
          value="Save changes"
          :disabled="!status"
          variant="primary"
          class="mt-4"
          @click="setUser"
        />
        <input type="button" value="Sign Out" class="mt-4" @click="signOut" />
      </b-form>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "UserAccount",
  data() {
    return {
      errorInfo: null,
      formResponse: {
        username: "",
        password: "",
        currentPassword: "",
      },
      isVisible: false,
    };
  },
  computed: {
    connection() {
      return {
        status: this.$store.state.status,
        message: this.$store.state.message,
      };
    },
    token() {
      return this.$store.state.token;
    },
    status() {
      return (
        (this.formResponse.username.length >= 4 && this.validationUsername) ||
        (this.formResponse.password.length >= 4 &&
          this.validationPassword &&
          this.formResponse.currentPassword.length >= 4 &&
          this.validationCurrentPassword)
      );
    },
    validationCurrentPassword() {
      let { currentPassword: pass } = this.formResponse;
      let pattern = /^[a-zA-Z0-9]+$/g;
      return pass.length > 4 && pass.length <= 20 && pattern.test(pass);
    },
    validationPassword() {
      let { password: pass } = this.formResponse;
      let pattern = /^[a-zA-Z0-9]+$/g;
      return pass.length > 4 && pass.length <= 20 && pattern.test(pass);
    },
    validationUsername() {
      let { username } = this.formResponse;
      let pattern = /^[a-zA-Z0-9]+$/g;
      return (
        username.length > 4 && username.length <= 20 && pattern.test(username)
      );
    },
  },
  methods: {
    togglePassword() {
      this.isVisible = !this.isVisible;
    },
    signOut() {
      this.$router.push({ name: "gallery" });
      localStorage.removeItem("user-token");
      this.$store.state.username = null;
      this.$store.state.favorite = [];
    },
    setUser() {
      let { password, currentPassword, username } = this.formResponse;

      axios({
        method: "patch",
        url: `https://localhost:9000/api/auth/login`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        data: {
          data: {
            username,
            password,
            currentPassword,
          },
        },
      })
        .then((res) => {
          this.$store.dispatch("setUsername", res.data.username);
          this.$router.push({ name: "profile" });
          this.errorInfo = null;
        })
        .catch((e) => {
          this.errorInfo = e.response.data;
          console.error(e);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#user-account {
  position: relative;
}

.container {
  background-color: #f8f9fa;
  // min-height: inherit;
  position: relative;
  max-width: 380px;
  margin: auto;
  margin-top: 3rem;
  padding: 1.5rem 3rem;
  border-radius: 0.5rem;
}

label {
  display: block;
  width: inherit;
  text-align: left;
}
</style>
