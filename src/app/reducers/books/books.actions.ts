import { Book, BookData } from '../../models/Book'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { bookService } from './books.service'

export const getBooks = createAsyncThunk<Book[]>('books/getBooks', async (): Promise<Book[]> => {
  return await bookService.getAll()
})

export const getBookById = createAsyncThunk<Book, string>('books/getBookById', bookService.getById)

export const createBook = createAsyncThunk<Book, BookData>(
  'books/createBook',
  async (data: BookData): Promise<Book> => {
    return await bookService.create(data)
  }
)

interface UpdateData {
  id: string
  data: BookData
}

export const updateBook = createAsyncThunk<Book, UpdateData>(
  'books/updateBook',
  async ({ id, data }): Promise<Book> => {
    return await bookService.updateById(id, data)
  }
)

export const deleteBook = createAsyncThunk<string, string>('books/deleteBook', bookService.deleteById)
