import { connect, createStore, withReduxDevtools } from 'undux'

// Create a store with an initial value.
let store = withReduxDevtools(createStore({
  data: {},
  error: {},
  books: {}
}))

// let store = createStore({
//   data: {},
//   error: {},
//   books: {}
// })

export let withStore = connect(store)