<template>
  <div class="container">
    book detail
    <b-row>
      <b-col>id</b-col>
      <b-col>{{ bookObject.id }}</b-col>
    </b-row>
    <b-row>
      <b-col>title</b-col>
      <b-col>{{ bookObject.title }}</b-col>
    </b-row>
    <b-row>
      <b-col>author</b-col>
      <b-col>{{ bookObject.author }}</b-col>
    </b-row>
    <b-row>
      <b-col>lead</b-col>
      <b-col>{{ bookObject.lead }}</b-col>
    </b-row>
    <b-row>
      <b-col>notes</b-col>
      <b-col>{{ bookObject.notes }}</b-col>
    </b-row>
    <b-row>
      <b-col>recommendation</b-col>
      <b-col>{{ bookObject.recommendation }}</b-col>
    </b-row>
    <b-row>
      <b-col>read_date</b-col>
      <b-col>{{ bookObject.read_date }}</b-col>
    </b-row>
    <b-row>
      <b-col>create_tstamp</b-col>
      <b-col>{{ bookObject.create_tstamp }}</b-col>
    </b-row>
    <b-row>
      <b-col>update_tstamp</b-col>
      <b-col>{{ bookObject.update_tstamp }}</b-col>
    </b-row>
    <b-row>
      <b-col>status</b-col>
      <b-col>{{ bookObject.status }}</b-col>
    </b-row>
    <b-row>
      <b-col>image</b-col>
      <b-col>{{ bookObject.image }}</b-col>
    </b-row>
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
export default {
  name: 'BookDetails',
  data () {
    return {
      bookObject: {}
    }
  },
  computed: {
    ...mapState([
      'books'
    ])
  },
  mounted () {
    var bookElem
    for (bookElem in this.books) {
      if (parseInt(this.books[bookElem].id) === parseInt(this.$route.params.bookId)) { // FIXME
        this.bookObject = this.books[bookElem]
        break
      }
    }
  }
}
</script>
