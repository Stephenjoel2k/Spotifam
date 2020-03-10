//MAKE CHANGES SO THAT THE ACCESS TOKEN FUNCTION IS IN A NEW COMPONENT.
//FIND A WAY TO DISPLAY IT AND FIND A WAY TO MAKE CALLS TO BACKEND FUNCTIONS.

<template>
  <div class="container">
    <h1>Recently Recommended Songs</h1>
    <button v-on:click="login">Login</button>
    <p>Your access token is: {{ this.token }}</p>
    <div class="add-song">
      <label for="add-song">Look up songs</label>
      <br>
      <input type="text" id="add-artist" v-model="artist" placeholder="artist name">
      <br>
      <input type="text" id="add-track" v-model="title" placeholder="track name">
      <br>
      <button v-on:click="addTrack">Recommend</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="tracks-container">
      <div class="track"
        v-for="(track, index) in tracks"
        v-bind:item="track"
        v-bind:index="index"
        v-bind:key="track._id"
        v-on:dblclick="deleteTrack(track._id)"
      >
        <div class="track_info">
          <h2>{{ track.artist }}</h2>
          <p>{{ track.title }} </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import QueueService from '../QueueService.js'

export default {
  name: 'Tracks',
  data(){
    return {
      tracks: [],
      error: '',
      title: '',
      artist: '',
      token: ''
    }
  },
  async created(){
    try{
      this.tracks = await QueueService.getTracks()
      var url_string = window.location.href
      var url = new URL(url_string)
      var access_token = url.searchParams.get("access_token");
      this.token = access_token
    }catch(err){
      this.error =  err.message
    }
  },
  methods:{
    async addTrack(){
      await QueueService.insertTrack(this.title, this.artist)
      this.tracks = await QueueService.getTracks()
    },
    async deleteTrack(id){
      await QueueService.deleteTrack(id)
      this.tracks = await QueueService.getTracks()
    },
    async login(){
      await window.location.replace('http://localhost:8888/auth/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.track{
  background-color: black;
  color: white;
  margin: 20px;
  padding: 20px;
}

</style>
