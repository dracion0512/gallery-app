<template>
  <Gallery :content="content" v-if="
  !!content
  && 300 > connection.status 
  && connection.status >= 200
  " 
  />
  <Error v-else-if="connection.status >= 400" :message="connection.message" :status="connection.status" />
  <LoadingAnimation v-else />
</template>

<script>
// @ is an alias to /s1rc
import Gallery from "@/components/Gallery.vue";
import LoadingAnimation from "@/components/LoadingAnimation.vue";
import Error from "@/components/errors/ErrorMessage.vue";

export default {
  name: "gallery",
  components: {
    Gallery,
    LoadingAnimation,
    Error,
  },
  computed: {
    connection() {
      return {
        status: this.$store.state.status,
        message: this.$store.state.message,
      }
    },    
    searchTag() {
      return this.$store.state.searchTag
    },
    content() {
      return this.$store.state.searchTag.length > 0 ?
      this.$store.state.data.filter(item => {
        return item.id === this.searchTag 
        || item.tags.includes(this.searchTag) 
        || new RegExp(this.searchTag).test(item.title)
      })
      : this.$store.state.data
    },    
  },
};
</script>
