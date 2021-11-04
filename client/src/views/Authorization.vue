<template>
    <SignIn @link-func="changeRegistedStatus" v-if="isRegistred" />
    <SignUp @link-func="changeRegistedStatus" v-else />
</template>

<script>
// @ is an alias to /src
import SignIn from "@/components/SignIn.vue";
import SignUp from "@/components/SignUp.vue";

export default {
  name: "authorization",
  components: {
    SignIn,
    SignUp,
  },
  data() {
    return {
      isRegistred: true,
    }
  },
  methods: {
    changeRegistedStatus() {
      this.isRegistred = !this.isRegistred
    },
  },
};
</script>
