<template>
  <div class="hello">
    <div id="main-wrapper">
      <div id="map-wrapper">
        <!--<h1 class="has-text-left title" style="padding-left: 25px;">What's new in Chattanooga?</h1>-->
        <a class="button" id="results-toggle" v-on:click="showResults = !showResults">Toggle Controls</a>
        <gmap-map id="map" :options="options" :center="center" :zoom="14" :clickable="true">
          <transition name="fade">
            <gmap-info-window :options="iwOptions" @closeclick="selectedMarker = ''" v-if="selectedMarker"
                              :position="{lat: Number(selectedMarker.lat), lng: Number(selectedMarker.lng)}">
              <b>{{selectedMarker.name}}</b>
              <br> {{selectedMarker.address}}
              <br> {{selectedMarker.notes}}
              <br>
              <br>
              <div v-if="selectedMarker.image" style="font-size:.75rem;">
                <figure class="image is-96x96" style="margin:auto">
                  <img v-on:click="showImageLarge(selectedMarker)" class="location-image" :src="selectedMarker.image">
                </figure>
              </div>
              <div v-if="selectedMarker.replies">
                <div v-for="replies in selectedMarker.replies">
                  <span class="message"><b>Reply:</b> {{replies.reply}}</span>
                </div>
              </div>
              <br>
            </gmap-info-window>
          </transition>
          <gmap-marker :icon="icon" v-for="location in filteredLocations"
                       :position="{lat: Number(location.lat), lng: Number(location.lng)}"
                       @click="selectedMarker = location">
          </gmap-marker>
        </gmap-map>
      </div>
      <transition name="fade">
        <div v-if="showResults" id="results-box" ref="results">
          <div class="box" id="table-header">
            <h1 class="subtitle is-4 ">Search you want</h1>
            <b-field class="has-text-centered" id="controls" style="justify-content:center">
              <b-input id="search" placeholder="Type to search" type="input" v-model="search"></b-input>
              <p class="control">
                <a id="add-button" class="button is-primary" v-on:click="show = true">Add an Post</a>
              </p>
            </b-field>
            <br>
            <br>

          </div>
          <br>
          <!--<div-->
            <!--id="e3"-->
            <!--style="max-width: 400px; margin: auto;"-->
            <!--class="grey lighten-3"-->
          <!--&gt;-->
            <!--<v-toolbar-->
              <!--floating-->
              <!--dense-->
            <!--&gt;-->
              <!--<v-text-field prepend-icon="search" hide-details single-line></v-text-field>-->
              <!--<v-btn icon>-->
                <!--<v-icon>my_location</v-icon>-->
              <!--</v-btn>-->
              <!--<v-btn icon>-->
                <!--<v-icon>more_vert</v-icon>-->
              <!--</v-btn>-->
            <!--</v-toolbar>-->
            <!--<v-card>-->
              <!--<v-container-->
                <!--fluid-->
                <!--style="min-height: 0;"-->
                <!--grid-list-lg-->
              <!--&gt;-->
                <!--<v-layout row wrap>-->

                  <!--<paginate name="rows" :list="filteredLocations" :per="10" ref="paginator">-->
                    <!--<v-flex xs12 v-for="location in paginated('rows')">-->
                      <!--<v-card>-->
                        <!--<v-container fluid grid-list-lg>-->
                          <!--<v-layout row>-->
                            <!--<v-flex xs5>-->
                              <!--<v-card-media v-if="location.image"-->
                                            <!--:src="location.image"-->
                                            <!--height="125px"-->
                                            <!--contain-->
                                            <!--v-on:click="showImageLarge(location)"-->
                              <!--&gt;</v-card-media>-->
                              <!--<v-card-media v-if="!location.image"-->
                                            <!--src="../assets/placeholder.png"-->
                                            <!--height="125px"-->
                                            <!--contain-->
                                            <!--v-on:click="replyWithImage(location)"-->
                              <!--&gt;</v-card-media>-->
                            <!--</v-flex>-->
                            <!--<v-flex xs7>-->
                              <!--<div>-->
                                <!--<div class="headline">{{location.name}}</div>-->
                                <!--<div><div style="font-size:.75rem;">Added: {{location.created}}</div>-->
                                  <!--{{location.address}}-->
                                  <!--<br>{{location.notes}}-->
                                  <!--<br>-->
                                  <!--<div v-for="replies in location.replies">-->
                                    <!--<span class="message">Reply: {{replies.reply}}</span>-->
                                  <!--</div>-->
                                  <!--<a class="is-pulled-right" v-on:click="replyToLocation(location)"> + Reply</a></div>-->
                              <!--</div>-->
                            <!--</v-flex>-->
                          <!--</v-layout>-->
                        <!--</v-container>-->
                      <!--</v-card>-->
                    <!--</v-flex>-->
                  <!--</paginate>-->
                  <!--<paginate-links for="rows">-->
                  <!--</paginate-links>-->
                <!--</v-layout>-->
              <!--</v-container>-->
            <!--</v-card>-->
          <!--</div>-->
          <div id="results">
            <paginate name="rows" :list="filteredLocations" :per="10" ref="paginator">
              <table class="table is-narrow" id="location-table">
                <tr>
                </tr>
                <tbody>
                <tr v-for="location in paginated('rows')">
                  <td>
                    <div v-if="location.image" style="font-size:.75rem;">
                      <b-tooltip label="Tap to enlarge image" position="is-right">
                        <figure class="image is-96x96">
                          <img v-on:click="showImageLarge(location)" class="location-image" :src="location.image">
                        </figure>
                      </b-tooltip>
                    </div>
                    <div v-if="!location.image" style="font-size:.75rem;">
                      <b-tooltip label="Tap to upload an image" position="is-right">
                        <figure class="image is-96x96">
                          <img v-on:click="replyWithImage(location)" src="../assets/placeholder.png">
                        </figure>
                      </b-tooltip>
                    </div>
                  </td>
                  <td @mousedown="selectedMarker = location">
                    <b>{{location.name}}</b>
                    <div style="font-size:.75rem;">Added: {{location.created}}</div>
                    {{location.address}}
                    <br>{{location.notes}}
                    <br>
                    <div v-for="replies in location.replies">
                      <span class="message">Reply: {{replies.reply}}</span>
                    </div>
                    <a class="is-pulled-right" v-on:click="replyToLocation(location)"> + Reply</a>
                  </td>
                </tr>
                </tbody>
              </table>
            </paginate>
            <paginate-links for="rows">
            </paginate-links>
          </div>
        </div>
      </transition>
      <div id="tip" class="subtitle is-5">Tip: clicking a row opens the location details on the map</div>
    </div>
    <transition name="fade">
      <span v-if="scrolled" id="scroll-top" class="tag is-dark" href="#" v-scroll-to="'#map'">Scroll to map</span>
    </transition>
    <transition name="fade">
      <div id="modal" class="modal is-active" v-if="show">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">CHATTANOSY</p>
            <button id="closeModal" class="delete" v-on:click="show = false, usingCurrentLocation = false"></button>
          </header>
          <section class="modal-card-body">
            <div class="content">
              <form id="form" class="field" v-on:submit.prevent="addLocation">
                <p class="control">
                  <label class="label" for="locationName">Name</label>
                  <input type="text" placeholder="Name of this location" id="locationName" class="input"
                         v-model="newLocation.name">
                </p>
                <p class="control">
                  <label class="label" for="locationAddress">Address</label>
                  <input type="text" placeholder="123 Main St" id="locationAddress" class="input"
                         v-model="newLocation.address">
                </p>
                <p class="control">
                  <a v-bind:class="{ 'is-loading': isLoading }" v-on:click="getLocation()" class="button is-primary">Use
                    Current Location</a>
                </p>
                <div class="field is-horizontal">
                  <div class="field-body">
                    <p style="display:none" class="control">
                      <label class="label" for="locationLatitude">Latitude</label>
                      <input type="text" id="locationLatitude" class="input" v-model="newLocation.lat">
                    </p>
                    <p style="display:none" class="control">
                      <label class="label" for="locationLongitude">Longitude</label>
                      <input type="text" id="locationLongitude" class="input" v-model="newLocation.lng">
                    </p>
                  </div>
                </div>
                <p class="control">
                  <label class="label" for="locationNotes">Detail</label>
                  <b-input type="textarea" maxlength="125" placeholder="Detail about this post" id="locationNotes"
                           v-model="newLocation.notes"></b-input>
                </p>
                <p class="control">
                  <label class="label" for="locationImage">Upload an image:</label>
                  <input type="file" name="image" id="locationImage" accept="image/*" @change="previewImage">
                </p>
                <p class="control">
                  <button v-bind:class="{ 'is-loading': isLoading }" type="submit" v-on:click="show = false"
                          class="button is-primary">Submit
                  </button>
                </p>
              </form>
            </div>
          </section>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div id="modal2" class="modal is-active" v-if="showReply">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">new reply</p>
            <button id="closeModal" class="delete" v-on:click="showReply = false"></button>
          </header>
          <section class="modal-card-body">
            <div class="content">
              <form id="form" class="field" v-on:submit.prevent="submitReply">
                <p class="control">
                  <label class="label" for="locationReply">Reply</label>
                  <b-input type="textarea" placeholder="Reply" id="locationReply" maxlength="100"
                           v-model="reply"></b-input>
                </p>
                <p class="control">
                  <button type="submit" v-on:click="showReply = false" class="button is-primary">Submit</button>
                </p>
              </form>
            </div>
          </section>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div id="modal2" class="modal is-active" v-if="showUpload">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">New Post</p>
            <button id="closeModal" class="delete" v-on:click="showUpload = false"></button>
          </header>
          <section class="modal-card-body">
            <div class="content">
              <form id="form" class="field" v-on:submit.prevent="addImage">
                <p class="control">
                  <label class="label" for="locationImage">Upload an image:</label>
                  <input type="file" class="input" name="image" id="locationImage" accept="image/*" @change="addImage">
                </p>
                <p class="control">
                  <button v-bind:class="{ 'is-loading': isLoading }" type="submit" v-on:click="showUpload = false"
                          class="button is-primary">Submit
                  </button>
                </p>
              </form>
            </div>
          </section>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div id="modal2" class="modal is-active" v-if="showImage">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Food share</p>
            <button id="closeModal" class="delete" v-on:click="showImage = false"></button>
          </header>
          <section class="modal-card-body">
            <div class="content">
              <img id="big-image">
            </div>
          </section>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {db, storage} from '../firebase/index'
  import axios from 'axios'

  let locationsRef = db.child('locations/')
  let placeToUpdate
  export default {
    name: 'app',
    firebase: {
      locations: locationsRef
    },
    data() {
      return {
        center: {lat: 35.0456, lng: -85.3097},
        newLocation: {
          name: '',
          address: '',
          notes: '',
          lat: '',
          lng: '',
          errors: '',
          replies: '',
          visible: false,
          created: '',
          image: ''
        },
        show: false,
        selectedMarker: '',
        location: '',
        showReply: false,
        showUpload: false,
        showImage: false,
        showResults: true,
        reply: '',
        replies: '',
        visible: false,
        search: '',
        color: '#42b983',
        size: '15px',
        scrolled: false,
        icon: {
          path: 'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0',
          fillColor: '#FFFFFF',
          fillOpacity: 0.6,
          scale: 0.3,
          strokeColor: '#42b983',
          strokeWeight: 1
        },
        iwOptions: {
          maxWidth: 250
        },
        options: {
          scrollwheel: false,
          mapTypeControlOptions: {mapTypeIds: []},
          styles: [
            {
              'featureType': 'water',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#e9e9e9'
                },
                {
                  'lightness': 17
                }
              ]
            },
            {
              'featureType': 'landscape',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#f5f5f5'
                },
                {
                  'lightness': 20
                }
              ]
            },
            {
              'featureType': 'road.highway',
              'elementType': 'geometry.fill',
              'stylers': [
                {
                  'color': '#ffffff'
                },
                {
                  'lightness': 17
                }
              ]
            },
            {
              'featureType': 'road.highway',
              'elementType': 'geometry.stroke',
              'stylers': [
                {
                  'color': '#ffffff'
                },
                {
                  'lightness': 29
                },
                {
                  'weight': 0.2
                }
              ]
            },
            {
              'featureType': 'road.arterial',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#ffffff'
                },
                {
                  'lightness': 18
                }
              ]
            },
            {
              'featureType': 'road.local',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#ffffff'
                },
                {
                  'lightness': 16
                }
              ]
            },
            {
              'featureType': 'poi',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#f5f5f5'
                },
                {
                  'lightness': 21
                }
              ]
            },
            {
              'featureType': 'poi.park',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#dedede'
                },
                {
                  'lightness': 21
                }
              ]
            },
            {
              'elementType': 'labels.text.stroke',
              'stylers': [
                {
                  'visibility': 'on'
                },
                {
                  'color': '#ffffff'
                },
                {
                  'lightness': 16
                }
              ]
            },
            {
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'saturation': 36
                },
                {
                  'color': '#333333'
                },
                {
                  'lightness': 40
                }
              ]
            },
            {
              'elementType': 'labels.icon',
              'stylers': [
                {
                  'visibility': 'off'
                }
              ]
            },
            {
              'featureType': 'transit',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#f2f2f2'
                },
                {
                  'lightness': 19
                }
              ]
            },
            {
              'featureType': 'administrative',
              'elementType': 'geometry.fill',
              'stylers': [
                {
                  'color': '#fefefe'
                },
                {
                  'lightness': 20
                }
              ]
            },
            {
              'featureType': 'administrative',
              'elementType': 'geometry.stroke',
              'stylers': [
                {
                  'color': '#fefefe'
                },
                {
                  'lightness': 17
                },
                {
                  'weight': 1.2
                }
              ]
            }
          ]
        },
        isLoading: false,
        usingCurrentLocation: false,
        paginate: ['rows']
      }
    },
    methods: {
      addLocation: function () {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=` + this.newLocation.address + ',+Chattanooga,+TN&key=AIzaSyDni8xEY3eGI6q0ewpUjxYfQyvjJeDbbQo')
          .then(response => {
            if (this.newLocation.name === '') {
              this.show = true
              alert('A name is required when submitting a new location!')
              return
            }

            if (this.newLocation.address === '') {
              this.show = true
              alert('An address is required when submitting a new location!')
              return
            }

            if (this.newLocation.lat === '') {
              this.newLocation.lat = response.data.results[0].geometry.location.lat
              this.newLocation.lng = response.data.results[0].geometry.location.lng
            }

            var today = new Date()
            var dd = today.getDate()
            var mm = today.getMonth() + 1
            var yyyy = today.getFullYear()
            if (dd < 10) {
              dd = '0' + dd
            }
            if (mm < 10) {
              mm = '0' + mm
            }
            today = mm + '/' + dd + '/' + yyyy

            this.newLocation.created = today
            locationsRef.push(this.newLocation)
            this.newLocation.name = ''
            this.newLocation.address = ''
            this.newLocation.notes = ''
            this.newLocation.lat = ''
            this.newLocation.lng = ''
            this.usingCurrentLocation = false
            alert('Location successfully added!')
          })
          .catch(e => {
            this.errors.push(e)
            alert('Something went wrong!')
          })
      },
      previewImage: function (event) {
        this.isLoading = true
        var input = event.target
        if (input.files && input.files[0]) {
          let image = input.files[0]
          let random = Math.floor(Math.random() * 2001)
          let imageRef = storage.child('images/' + random + image.name)
          let that = this
          imageRef.put(image).then(function (snapshot) {
            console.log('Uploaded!', snapshot)
            snapshot.ref.getDownloadURL().then(function (downloadURL) {
              console.log('File available at', downloadURL);
              that.newLocation.image = downloadURL
              that.isLoading = false
            });
          })
        }
      },
      replyWithImage: function (location) {
        this.showUpload = true
        placeToUpdate = location['.key'].toString()
      },
      addImage: function (event) {
        this.isLoading = true
        var input = event.target
        if (input.files && input.files[0]) {
          let image = input.files[0]
          let random = Math.floor(Math.random() * 2001)
          let imageRef = storageRef.child('images/' + random + image.name)
          let that = this
          imageRef.put(image).then(function (snapshot) {
            console.log('Uploaded!')
            that.newLocation.image = 'https://res.cloudinary.com/ashtonlance/image/fetch/a_exif,c_scale,e_auto_color,h_500/' + encodeURIComponent(snapshot.metadata.downloadURLs[0])
            let imageReply = locationsRef.child(placeToUpdate).child('image')
            imageReply.set(that.newLocation.image)
            that.isLoading = false
          })
        }
      },
      showImageLarge: function (location) {
        this.showImage = true
        setTimeout(function () {
          let imageToShow = document.getElementById('big-image')
          imageToShow.src = location.image
        }, 0)
      },
      replyToLocation: function (location) {
        this.showReply = true
        placeToUpdate = location['.key'].toString()
      },
      submitReply: function () {
        let replyTo = locationsRef.child(placeToUpdate).child('replies').push()
        replyTo.set({
          'reply': this.reply
        })
        alert('Reply submitted!')
        this.reply = ''
      },
      handleScroll: function () {
        this.scrolled = window.scrollY > 600
      },
      getLocation: function () {
        let that = this
        this.isLoading = true
        this.usingCurrentLocation = true
        navigator.geolocation.getCurrentPosition(function (position) {
          that.newLocation.lat = position.coords.latitude
          that.newLocation.lng = position.coords.longitude
          that.isLoading = false
          axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=` + that.newLocation.lat + ', ' + that.newLocation.lng + '&key=AIzaSyDni8xEY3eGI6q0ewpUjxYfQyvjJeDbbQo')
            .then(response => {
              that.newLocation.address = response.data.results[0].formatted_address
            })
        })
      }
    },
    mounted: function () {
      miniToastr.init()
      window.addEventListener('scroll', this.handleScroll)
    },
    computed: {
      filteredLocations: function () {
        var self = this
        return self.locations.filter(function (location) {
          return location.name.toLowerCase().indexOf(self.search.toLowerCase()) > -1 || location.notes.toLowerCase().indexOf(self.search.toLowerCase()) > -1 ||
            location.address.toLowerCase().indexOf(self.search.toLowerCase()) > -1
        }).reverse()
      }
    },
    updated: function () {
      try {
        var x = document.getElementById('location-table').rows.length - 1
        if (x !== 0) {
          if (x === 10) {
            let loader = document.getElementById('loader')
            loader.style.display = 'none'
          }
        }
      } catch (err) {
        return
      }
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
  }

  .hello {
    padding-top: 25px;
  }

  #main-wrapper {
    margin-bottom: 50px;
  }

  #results-toggle {
    display: none;
  }

  .vue-map-container {
    margin: auto;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.16), 0 3px 5px rgba(0, 0, 0, 0.16);
    border-radius: 5px;
    width: 90%;
    height: 400px;
  }

  #add-button {
    margin: 0 5px;
  }

  table {
    width: 90%;
    margin: auto;
    margin-bottom: 50px;
  }

  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    /*display: inline-block;*/
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  form {
    margin: auto;
    margin-bottom: 50px;
    margin-top: 20px;
    width: 95%;
  }

  #table-header {
    width: auto;
    margin: 5px auto;
    margin-bottom: 15px;
    padding-left: 7%;
    padding-right: 7%;
    padding-bottom: 0px;
    max-height: 20vh;
  }

  #scroll-top {
    position: fixed;
    bottom: 25px;
    right: 20px;
    font-size: 1rem;
    background: rgba(1, 1, 1, 0.80);
  }

  #results > ul {
    display: inline;
    margin: auto;
    max-width: 90%;
  }

  #results-info {
    margin-top: 15px;
    margin-bottom: 0;
  }

  .location-image {
    max-height: 96px;
    max-width: 96px;
  }

  ul.paginate-links > li.number > a {
    color: red;
  }

  .is-5 {
    margin-top: 5px;
  }

  @media (max-width: 375px) {
    .subtitle {
      font-size: 1.25rem !important;
    }
  }

  @media (min-width: 1000px) {
    #map-wrapper h1 {
      display: none;
    }

    #map-wrapper {
      margin-top: -2rem;
    }

    .hello {
      padding-top: 0;
    }

    #tip {
      display: none;
    }

    .vue-map-container {
      height: 93vh;
      width: 100%;
      box-shadow: none;
    }

    #results-toggle {
      display: inline-block;
      z-index: 5;
      position: relative;
      top: 40px;
    }

    #results-box {
      display: block;
      position: absolute;
      top: 11vh;
      left: 20px;
      max-width: 35%;
    }

    #results {
      padding: 5px;
      max-height: 80vh;
      background: rgba(255, 255, 255, 0.85);
      overflow: scroll;
      box-shadow: 0 3px 5px rgba(0, 0, 0, 0.16), 0 3px 5px rgba(0, 0, 0, 0.16);
      padding-top: 1rem;
      padding-bottom: 2rem;
    }

    #results > ul {
      padding-bottom: 15px;
      display: inline-block !important;

    }

    .number {
      background: transparent !important;
    }

    #location-table {
      width: 100%;
      margin-bottom: 0px;
      background-color: transparent;
    }

    #table-header {
      max-width: 360px;
      position: absolute;
      top: 1rem;
      right: -60vw;
      background: rgba(255, 255, 255, 0.85);
      box-shadow: 0 3px 5px rgba(0, 0, 0, 0.16), 0 3px 5px rgba(0, 0, 0, 0.16);
      padding-left: 1rem;
      padding-right: 1rem;
      max-height: 130px;
    }

    #main-wrapper {
      margin-bottom: 0px;
    }

    #results tr {
      padding: 1rem;
    }

  }
</style>
