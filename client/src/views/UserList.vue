<template>
  <Gallery v-bind:content="favorite" /> 
</template>

<script>
import Gallery from "@/components/Gallery.vue";

export default {
  name: 'userList',
  components: {
    Gallery,
  },
  computed: {
    content() {
      return this.$store.state.data
    },
    searchTag() {
      return this.$store.state.searchTag
    },
    favorite() {
      return this.searchTag.length > 0 ?
      this.$store.state.favorite.filter(item => {
        return item.id == this.searchTag 
        || item.tags.includes(this.searchTag) 
        || new RegExp(this.searchTag).test(item.title)
      })
      : this.$store.state.favorite
    },
  },
}
</script>