<template>
<div class="container">
    <b-alert v-model="showInfoMessage" dismissible>
      Update successful !
    </b-alert>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="danger"
      @dismiss-count-down="countDownChanged"
    >
      <h4> {{ errorMessage }} </h4>
      <p>This alert will dismiss after {{ dismissCountDown }} seconds...</p>
      <b-progress
        variant="error"
        :max="10"
        :value="dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert>

    <b-form @submit="onSubmit">
      <b-form-group  label="ID" label-cols="2">
        <b-form-input v-model="bookObject.id" readonly></b-form-input>
      </b-form-group>

      <b-form-group label="Title:" label-cols="2">
        <b-form-input v-model="bookObject.title" required placeholder="Enter title"></b-form-input>
      </b-form-group>

      <b-form-group label="Author:" label-cols="2">
        <b-form-input v-model="bookObject.author" required placeholder="Enter Author" ></b-form-input>
      </b-form-group>

      <b-form-group label="Lead:"  label-cols="2">
        <b-form-textarea v-model="bookObject.lead" required placeholder="Enter lead"></b-form-textarea>
      </b-form-group>

      <b-form-group label="Notes:" label-cols="2">
        <b-form-textarea v-model="notesData" required placeholder="Enter notes"></b-form-textarea>
      </b-form-group>

      <b-form-group label="Recommendation:" label-cols="2">
        <b-form-select v-model="bookObject.recommendation" :options="this.getRecommendationOptions"></b-form-select>
      </b-form-group>

      <b-form-group label="Read date:" label-cols="2">
        <b-form-datepicker v-model="readedDate" ></b-form-datepicker>
      </b-form-group>

      <b-form-group label="Created:" label-cols="2">
        <b-form-datepicker v-model="createTstamp" readonly></b-form-datepicker>
      </b-form-group>

      <b-form-group label="Updated:" label-cols="2">
        <b-form-datepicker v-model="updateTstamp" readonly></b-form-datepicker>
      </b-form-group>

      <b-form-group label="Status:" label-cols="2">
        <b-form-select v-model="bookObject.status" :options="this.getStatusOptions"></b-form-select>
      </b-form-group>

      <b-form-group  label="Image:" label-cols="2">
        <b-form-input v-model="imageData" required placeholder="Enter image"></b-form-input>
        <b-img :src="this.imageData" fluid alt="no image ..."></b-img>
      </b-form-group>

      <b-form-group  label="Tags:"  label-cols="2">
        <b-form-tags input-id="tags-basic" v-model="currentTags" class="mb-2"></b-form-tags>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <b-row>
      <b-button v-b-toggle.collapse-1 variant="outline-primary">Raw data [json]</b-button>
      <b-collapse id="collapse-1" class="mt-2">
        <b-card>
          <p class="card-text">{{ bookObject }}</p>
        </b-card>
      </b-collapse>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BookDetail',
  data () {
    return {
      bookObject: {},
      currentTags: [],
      dismissCountDown: null,
      showInfoMessage: false,
      errorMessage: null,
      notesData: null,
      imageData: null,
      readedDate: null,
      updateTstamp: null,
      createTstamp: null
    }
  },
  computed: {
    ...mapGetters([
      'getTagById', 'getBookById', 'getRecommendationOptions', 'getStatusOptions'
    ])
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.bookObject.notes = Buffer.from(this.notesData)
      this.bookObject.image = Buffer.from(this.imageData)
      this.bookObject.read_date = this.readedDate
      this.$axios.put('http://localhost:5000/book/update/' + this.bookObject.id, this.bookObject, { crossdomain: true })
        .then(response => {
          this.showInfoMessage = true
        })
        .catch(error => {
          this.errorMessage = error
          this.dismissCountDown = 5
        })
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    }
  },
  mounted () {
    const bookIdParam = parseInt(this.$route.params.bookId)
    this.bookObject = this.getBookById(bookIdParam)
    this.notesData = Buffer.from(this.bookObject.notes).toString('utf8')
    this.imageData = Buffer.from(this.bookObject.image).toString('utf8')
    this.readedDate = this.bookObject.read_date.substring(0, 10)
    this.updateTstamp = this.bookObject.update_tstamp.substring(0, 10)
    this.createTstamp = this.bookObject.create_tstamp.substring(0, 10)

    this.$axios.get('http://localhost:5000/tag2book/get/' + bookIdParam, { crossdomain: true })
      .then(response => {
        for (const tempTag in response.data) {
          const tagElem = this.getTagById(response.data[tempTag].tag_id)
          this.currentTags.push(tagElem.tag)
          console.log('pushing ' + tagElem.tag)
        }
      }).catch(error => {
        this.errorMessage = error
        this.dismissCountDown = 5
      })
  }
}
</script>
