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
      <b-form-group id="input-group-1" label="ID" label-for="input-1" label-cols="2">
        <b-form-input
          id="input-1"
          v-model="bookObject.id"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Title:" label-for="input-2" label-cols="2">
        <b-form-input
          id="input-2"
          v-model="bookObject.title"
          required
          placeholder="Enter title"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Author:" label-for="input-2" label-cols="2">
        <b-form-input
          id="input-2"
          v-model="bookObject.author"
          required
          placeholder="Enter Author"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Lead:" label-for="input-2" label-cols="2">
        <b-form-textarea
          id="input-2"
          v-model="bookObject.lead"
          required
          placeholder="Enter lead"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group id="input-group-2" label="Notes:" label-for="input-2" label-cols="2">
        <b-form-textarea
          id="input-2"
          v-model="bookObject.notes"
          required
          placeholder="Enter notes"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group id="input-group-2" label="recommendation:" label-for="input-2" label-cols="2">
        <b-form-select v-model="bookObject.recommendation" :options="recommendationOptions"></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-2" label="read_date:" label-for="input-2" label-cols="2">
        <b-form-datepicker id="example-datepicker" v-model="bookObject.read_date" ></b-form-datepicker>
      </b-form-group>

      <b-form-group id="input-group-2" label="create_tstamp:" label-for="input-2" label-cols="2">
        <b-form-datepicker id="example-datepicker" v-model="bookObject.create_tstamp" readonly></b-form-datepicker>
      </b-form-group>

      <b-form-group id="input-group-2" label="update_tstamp:" label-for="input-2" label-cols="2">
        <b-form-datepicker id="example-datepicker" v-model="bookObject.update_tstamp" readonly></b-form-datepicker>
      </b-form-group>

      <b-form-group id="input-group-2" label="status:" label-for="input-2" label-cols="2">
        <b-form-select v-model="bookObject.status" :options="statusOptions"></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-2" label="image:" label-for="input-2" label-cols="2">
        <b-form-input
          id="input-2"
          v-model="bookObject.image"
          required
          placeholder="Enter image"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="tags:" label-for="input-2" label-cols="2">
        <b-form-tags input-id="tags-basic" v-model="bookObject.tags" class="mb-2"></b-form-tags>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ bookObject }}</pre>
    </b-card>
    <b-row>
      <b-col><b-button>Save</b-button></b-col>
      <router-link to="/">
                        <b-button variant="primary" >Back</b-button>
                    </router-link>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'BookDetails',
  data () {
    return {
      bookObject: {},
      recommendationOptions: [
        { value: 1, text: 'Meh' },
        { value: 2, text: 'Ok' },
        { value: 3, text: 'Awesome' }
      ],
      statusOptions: [
        { value: 1, text: 'Active' },
        { value: 9, text: 'Disabled' }
      ],
      dismissCountDown: null,
      showInfoMessage: false
    }
  },
  computed: {
    ...mapState([
      'books', 'tags'
    ])
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.put('http://localhost:5000/book/update/' + this.bookObject.id, this.bookObject, { crossdomain: true })
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
    var bookElem
    const bookIdParam = parseInt(this.$route.params.bookId)
    for (bookElem in this.books) {
      if (parseInt(this.books[bookElem].id) === bookIdParam) {
        this.bookObject = this.books[bookElem]
        this.bookObject.tags = []
        axios.get('http://localhost:5000/tag2book/get/' + bookIdParam, { crossdomain: true })
          .then(response => {
            for (const tagElem in response.data) {
              const persistedTagId = response.data[tagElem].tag_id

              for (const tag in this.tags) {
                if (this.tags[tag].id === persistedTagId) {
                  this.bookObject.tags.push(this.tags[tag].tag)
                }
              }
            }
          })
        break
      }
    }
  }
}
</script>
