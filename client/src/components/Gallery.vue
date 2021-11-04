<template>
  <section class="gallery" v-if="content.length > 0">
    <b-badge 
    v-if="searchTag" 
    variant="primary" 
    class="search-message mb-5" 
    @click="clearSearchTag"
    >Search result of: {{this.searchTag}} 
      <b-icon-backspace-fill></b-icon-backspace-fill>
    </b-badge>
    <b-container class="bv-example-row bv-example-row-flex-cols">
      <b-row align-v="stretch" align-h="center">
        <b-col 
        class="pb-4 gallery-item d-flex flex-column align-items-start"
        v-for="item in pageContent" 
        :key="item._id" cols="10" 
        offset="0" md="6" lg="4" 
        >
        <!-- icon place -->
        <b-icon 
            class="gallery-icon pl-4" 
            :class="{
              'active': favorite.includes(item),
              'disabled': !$store.state.username
            }" 
            :icon="favorite.includes(item) ? 'x-circle' : 'heart-fill'" 
            font-scale="1.5" 
            v-bind:variant="favorite.includes(item) 
            ? 'danger' : !!$store.state.username ? 'white' : 'secondary'" 
            @click="setFavoriteList(item)"
        ></b-icon>
          <b-img-lazy 
          class="gallery-image"
          :src="item.url" 
          :alt="item.title"
          :blank="true"
          blank-color="#ded3d3"
          :fluid="true"
          ></b-img-lazy>
<!-- 
      <span>#{{item.id}}</span>          
      <b-icon 
          class="gallery-icon" 
          :class="{
            'active': favorite.includes(item.id),
            'disabled': !$store.state.username
          }" 
          :icon="$route.name === 'userList' ? 'x-circle' : 'heart-fill'" 
          font-scale="1.2" 
          v-bind:variant="favorite.includes(item.id.toString()) 
          ? 'danger' : !!$store.state.username ? 'white' : 'secondary'" 
          @click="setFavoriteList(item.id)"
      ></b-icon>
       -->
            <p class="item-footer align-self-stretch text-start px-4 m-0">
              <span>#{{item.id}}</span>   
              {{ item.tags.join(', ') }}       
            </p>
        </b-col >
      </b-row>
    </b-container>
    <b-pagination-nav
      class="mb-4 gallery-pagination"
      v-if="pageLimit > 1"
      :link-gen="linkGen"
      :page="pageContent"
      :number-of-pages="pageLimit"
      :index="pageIndex"
      :limit="pagination.size"
      :first-number="pagination.size > 7"
      :last-number="pagination.size > 7"
      :hide-ellipsis="pagination.size <= 7"
      align="center"
    ></b-pagination-nav>
  </section>
  <b-badge 
    v-else
    variant="primary" 
    class="search-message my-5" 
    @click="clearSearchTag"
    >No search result of: {{this.searchTag}}, try another one... 
      <b-icon-backspace-fill></b-icon-backspace-fill>
    </b-badge>
</template>
<script>

export default {
  name: "Gallery",
  data() {
    return {
      pagination: {
        size: 3,
        limit: 12,
      },
    };
  },
  props: {
    content: Array,
  },
  methods: {
    linkGen(pageNum) {
      return {
        path: this.$route.path,
        query: { page: pageNum }
      }
    },
    onResize() {
      window.innerWidth > 992 ? 
      this.pagination.size = 9
      : window.innerWidth > 762 
      ? this.pagination.size = 7 
      : this.pagination.size = 5
    },
    setFavoriteList(id) {
      if(this.$store.state.username) this.favorite = id
    },
    clearSearchTag() {
      this.$store.dispatch('setSearchTag', '')
    }
  },
  computed: {
    favorite: {
      get() {
        return this.$store.state.favorite
      },
      set(id) {
        return this.$store.dispatch('updateFavorite', id)
      },
    },
    pageIndex() {
      if(!!this.$route.query.page) return this.$route.query.page
    },
    pageLimit() {
      return Math.ceil(this.content.length / this.pagination.limit)
    },
    pageContent() {
      return this.content.slice(
          this.pagination.limit * this.pageIndex - this.pagination.limit,
          this.pagination.limit * this.pageIndex
        )
    },
    searchTag() {
      return this.$store.state.searchTag
    },
  },
  created() {
    if (!this.$route.query.page || !/^[0-9]+$/g.test(this.$route.query.page)) this.$router.push({path: this.$route.path, query:{page: 1}})
    window.addEventListener("resize", this.onResize);
    this.onResize();
    if (this.$store.state.searchTag) this.clearSearchTag
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },

/* !!!  use this block if want get data without server request
  created() {           
    // Simple GET request using fetch
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(data => {
        this.content = data.map((obj, index) => obj.url = `https://picsum.photos/200/300?random=${index}`)
        this.pagesLimit = Math.ceil(this.content.length / this.pageLimit)
        this.pageContent = this.content.slice(0, this.pageLimit)
      })
  }                     
*/
};
// vue module scope ends
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 p.gallery-title {
  border-radius: 0 0 4px 4px;
  position: relative;

  text-overflow: ellipsis; /* will make [...] at the end */
  white-space: nowrap; /* paragraph to one line */
  overflow:hidden; /* older browsers */
  padding: 0.75rem 1rem;
  margin: 0;
  text-align: left;
  font-size: 1.2rem;
  background-color: #334;
  color: #fff;

  user-select: none;
}

.gallery {
  margin-top: 3rem;

  .gallery-item { 
    position: relative;

    .item-footer {
      flex-grow: 1;
      flex-gap: 1rem;
      background-color: #334;
      color: #fdfefe;
      border-radius: 0 0 0.35rem 0.35rem;
    }

    .gallery-image {
      width: 100%;
      min-width: 120px;
      min-height: 320px;
      cursor: pointer;
    }

    .gallery-icon {
      // padding: inherit;
      position: absolute;
      right: 1.25rem;
      top: 0.5rem;
      opacity: 0.8;
      transition: cubic-bezier(0.86, 0, 0.07, 1);

      &:not(.disabled):hover {
        cursor: pointer;
        opacity: 1;
        transform: scale(1.1);
      }

      &:not(.disabled):active {
        transform: scale(1.4);
      }

      &.active {
        opacity: 1;
      }

      &.disabled {
        opacity: .4;
      }
    }
  }
}

.search-message {
  font-size: 1.5rem !important;
  background-color: #334 !important;

  :hover {
    cursor: pointer;
  }
}
</style>