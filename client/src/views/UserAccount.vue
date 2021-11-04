<template>
  <!-- <b-tabs vertical class="wrapper" :fill="true" :justified="true">
    <b-tab title="Account setting"> -->
      <UserAccount />
    <!-- </b-tab>
    <b-tab title="second tab" active :fill="true" :justified="true">
      <p>antoher tab</p>
    </b-tab>
  </b-tabs> -->
</template>

<script>
import UserAccount from "@/components/UserAccount.vue";
export default {
  name: "userAccount",
  components: {
    UserAccount,
  },
};
</script>
