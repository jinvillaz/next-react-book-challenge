import { createReducer } from '@reduxjs/toolkit'
import { Book } from '../../models/Book'
import { createBook, deleteBook, getBooks, updateBook } from './books.actions'

interface BookState {
  books: Book[]
}

const initialState: BookState = {
  books: [],
}

export const booksReducer = createReducer(initialState, (builder) => {
  builder.addCase(getBooks.pending, (state) => ({
    ...state,
    books: [],
  }))

  builder.addCase(getBooks.rejected, (state) => ({
    ...state,
    books: [],
  }))

  builder.addCase(getBooks.fulfilled, (state, action) => ({
    ...state,
    books: action.payload,
  }))

  builder.addCase(deleteBook.fulfilled, (state, action) => {
    return {
      ...state,
      books: state.books.filter((book: Book) => book.id !== action.payload),
    }
  })

  builder.addCase(createBook.fulfilled, (state, action) => ({
    ...state,
    books: [...state.books, action.payload],
  }))

  builder.addCase(updateBook.fulfilled, (state, action) => {
    const tmp = [...state.books]
    const index = tmp.findIndex((book) => book.id === action.payload.id)
    tmp[index] = action.payload
    return {
      ...state,
      books: [...tmp],
    }
  })
})
