<template>
  <div class="tags">
    <h1> Tagi </h1>
    <ul>
    <div v-for="item in getAllTags" :key="item.id">
      <li>{{ item.tag }}</li>
    </div>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Tags',
  components: {
  },
  computed: {
    ...mapGetters([
      'getAllTags'
    ])
  }
}
</script>
