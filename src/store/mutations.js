export default {
  loadTags: (state, { tags }) => {
    console.log('mutator')
    console.log(tags)
    state.tags = tags
    console.log('mutator done')
  }
}
