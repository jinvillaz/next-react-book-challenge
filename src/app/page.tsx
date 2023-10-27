'use client'
import { Provider } from 'react-redux'
import { BookList } from './components/BookList'
import { store } from './reducers/store'

export default function Home() {
  return (
    <Provider store={store}>
      <BookList />
    </Provider>
  )
}
