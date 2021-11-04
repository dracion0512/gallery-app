<template>
  <div id="app">
<!--     
    <header id="main-header">
      <nav id="main-nav">
        <img id="logo" src="./assets/logo.svg" alt="">
        <router-link
          :to="{ name: 'gallery', params: {id: 1} }"
          custom
          v-slot="{ href, route, navigate, isActive }"
        >
          <b-link :active="isActive" :href="href" @click="navigate">
            {{ route.name.charAt(0).toUpperCase() + route.name.slice(1) }}
          </b-link>
        </router-link>
        <router-link
          :to="{ name: 'authorization' }"
          custom
          v-slot="{ href, route, navigate, isActive }"
          v-if="!username"
        >
          <b-link :active="isActive" :href="href" @click="navigate">
            {{ route.name.charAt(0).toUpperCase() + route.name.slice(1) }}
          </b-link>
        </router-link>
        <b-dropdown 
        id="user-header"
        v-else 
        right 
        :text="username.charAt(0).toUpperCase() + username.slice(1)" 
        variant="outline-secondary" 
        :class="{
          'active': ['userList','userAccount'].includes($route.name)
        }" 
        >
          <b-dropdown-item 
          :to="{ 
            name: 'userList', 
            query: { 'page': 1 }, 
            params:{ 'id': username} 
          }"
          active-class="active"
          class="m-0"
          >
          Favorite List
          </b-dropdown-item>
          <b-dropdown-item 
          :to="{ 
            name: 'userAccount', 
            params:{ 'id': username} 
          }"
          active-class="active"
          class="m-0"
          >
          Account settings
        </b-dropdown-item>
        </b-dropdown>
      </nav>
    </header> -->
    
    <b-navbar tag="header" id="main-header" toggleable="md" type="dark" variant="info" class="p-0 px-md-3 m-0">

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-navbar-brand href="/" class="m-0 p-0 mr-auto">
      <img id="logo" src="./assets/logo.svg" alt="">
    </b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav class="justify-content-md-end px-0">
      <!-- Right aligned nav items -->
      
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input 
          id="search-input"
          class="d-block mr-2 h-100" 
          size="sm" 
          placeholder="Search"
          v-model="searchTag" 
          ></b-form-input>
        </b-nav-form>
          <b-button id="search-button" size="sm" class="mx-md-2 px-2 py-1" @click="searchContent">
            Search
            <b-icon-search class="ml-3"></b-icon-search>
          </b-button>
        </b-navbar-nav>

        <b-navbar-nav>
          <b-nav-item
            v-if="!username"
            :to="{ name: 'authorization' }"
            class="main-nav-link"
            :class="{'active': $route.name === 'authorization'}"
            exact
          >
            Authorization
          </b-nav-item>
          <b-nav-item-dropdown 
          v-else 
          left 
          offset="-400"
          variant="dark"
          class="main-nav-link"
          :class="{
          'active': ['userList','userAccount'].includes($route.name)
          }"
          >
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{username}}</em>
            </template>
            <b-dropdown-item left
            :to="{ 
              name: 'userList', 
              query: { 'page': 1 }, 
              params:{ 'id': username} 
            }"
            active-class="active"
            >Favorite List</b-dropdown-item>
            <b-dropdown-item 
            :to="{ 
              name: 'userAccount', 
              params:{ 'id': username} 
            }"
            active-class="active"
            >Account settings</b-dropdown-item>
          </b-nav-item-dropdown>
      </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item
            :to="{ name: 'gallery', query: {page: 1} }"
            exact
            class="main-nav-link"
            :class="$route.name == 'gallery' ? 'active' : 'inactive'"
          >
            Gallery
          </b-nav-item>
        </b-navbar-nav>
    </b-collapse>
  </b-navbar>
    <!-- <h4>{{this.data}}</h4> -->
    <router-view v-slot="{ Component }">
      <component :is="Component"></component>
    </router-view>

    <footer>
      <h2>Test app</h2>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "home", 
  data() {
    return {
      data: null,
      searchTag: '',
    }
  },
  computed: {
    connection: {
      get() {
        return {
          status: this.$store.state.status,
          message: this.$store.state.message,
        }
      },
      set(newValue) {
        return [
          this.$store.dispatch('setStatus', newValue.status),
          this.$store.dispatch('setMessage', newValue.message),
        ]
      }
    },
    content: {
      get () {
        return this.$store.state.data
      },
      set (newValue) {
        return this.$store.dispatch('setData', newValue)
      }    
    },
    token: {
      get () {
        return this.$store.state.token
      },
      set (newValue) {
        return this.$store.dispatch('setToken', newValue)
      }    
    },
    username: {
      get () {
        return this.$store.state.username
      },
      set (newValue) {
        return this.$store.dispatch('setUsername', newValue)
      }    
    },
    favorite: {
      get () {
        return this.$store.state.favorite
      },
      set (newValue) {
        return this.$store.dispatch('setFavorite', newValue)
      }    
    },
  },
  methods: {
    handleScroll () {
      const header = document.getElementById("main-header")
      window.pageYOffset > 320 ? (
        header.classList.add('active'), header.classList.remove('hidden')
        ) : (header.classList.remove('active'), header.classList.add('hidden'))
    },
    searchContent () {
      this.$store.dispatch('setSearchTag', this.searchTag)
      if (this.$route.name != 'gallery' || 'userList') {
        this.$router.push({name: 'gallery', query:{page: 1}})
      }
    }
  },    
  created() {
    if (localStorage.getItem('user-token')) {
      this.token = localStorage.getItem('user-token')
    }
    axios
    .get("https://localhost:9000/api/data", {
      headers: { 
        Authorization: `Bearer ${this.token}` 
      }, 
    })
    .then(response => {
      // console.log(response);
      let {data, user} = response.data /*.slice(0, this.contentLimit)*/
      this.content = data.filter(item => !!item)
      this.connection = {
        status: response.status,
        message: 'Succesfull connection',
      };
      if (!!user) {
        this.username = user.username 
        this.favorite = user.favorite
      }
    })
    .catch(e => {
      if (e.response) {
        let { data, status } = e.response;
        this.connection = {
          status,
          message: data.message 
        }
      } else {
        console.error(e)
        this.data = e
        this.connection = {
          status: 404,
          message: "Network error",
        }
      }
    });
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style lang="scss">
  @import './assets/style.scss';
</style>


