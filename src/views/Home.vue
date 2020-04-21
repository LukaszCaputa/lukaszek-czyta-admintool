<template>
  <div class="container">
    <table>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Author</th>
      </tr>
      <tr v-for="item in getAllBooks" :key="item.id">
      <td>{{ item.id }}</td>
      <td>{{ item.title }}</td>
      <td>{{ item.author }}</td>
      <td><router-link :to="`/book/${item.id}`">
                        <b-button variant="primary" >Edit</b-button>
                    </router-link></td>
      </tr>
    </table>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
  },
  computed: {
    ...mapGetters([
      'getAllBooks'
    ])
  }
}
</script>
