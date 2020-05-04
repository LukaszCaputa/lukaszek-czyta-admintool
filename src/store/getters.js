export default {
  getAllTags: (state) => {
    return state.tags
  },
  getAllBooks: (state) => {
    return state.books
  },
  getTagById: (state) => (id) => {
    return state.tags.find(tag => tag.id === id)
  },
  getBookById: (state) => (id) => {
    return state.books.find(book => book.id === id)
  },
  getRecommendationOptions: (state) => {
    return [
      { value: 1, text: 'Meh' },
      { value: 2, text: 'Ok' },
      { value: 3, text: 'Awesome' }
    ]
  },
  getStatusOptions: (state) => {
    return [
      { value: 1, text: 'Active' },
      { value: 9, text: 'Disabled' }
    ]
  }
}
