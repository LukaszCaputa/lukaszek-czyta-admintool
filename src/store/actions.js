import axios from 'axios'

export default {
  loadTagsAction: ({ commit }) => {
    console.log('start')
    axios.get('http://localhost:5000/tag/get', { crossdomain: true }
    )
      .then(response => { console.log(response.data); commit('loadTags', response.data) })
    console.log('end')
  }
}
