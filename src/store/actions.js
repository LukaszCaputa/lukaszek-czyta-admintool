import axios from 'axios'

export default {
  loadTagsAction: ({ commit }) => {
    axios.get('http://localhost:5000/tag/get', { crossdomain: true }
    )
      .then(response => { console.log(response.data); commit('loadTags', response.data) })
  },
  loadBooksAction: ({ commit }) => {
    axios.get('http://localhost:5000/book/get', { crossdomain: true }
    )
      .then(response => { console.log(response.data); commit('loadBooks', response.data) })
  }
}
