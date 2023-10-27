import { v4 as uuidv4 } from 'uuid'
import { Book, BookData } from '../../models/Book'

let booksList: Book[] = [
  {
    id: '1',
    name: 'Book 1',
    price: 10.99,
    category: 'Fiction',
    description: 'something1',
  },
  {
    id: '2',
    name: 'Book 2',
    price: 12.99,
    category: 'Non-fiction',
    description: 'something',
  },
]

// Fake Api
class BookService {
  async getAll(): Promise<Book[]> {
    return Promise.resolve(booksList)
  }

  async getById(id: string): Promise<Book> {
    const data = booksList.find((book) => book.id === id)
    return Promise.resolve(data as Book)
  }

  async create(data: BookData): Promise<Book> {
    const newBook = {
      id: uuidv4(),
      ...data,
    }
    booksList = [...booksList, newBook]
    return Promise.resolve(newBook)
  }

  async updateById(id: string, data: BookData): Promise<Book> {
    const index = booksList.findIndex((book) => book.id === id)
    booksList[index] = {
      id,
      ...data,
    }
    return Promise.resolve(booksList[index])
  }

  async deleteById(id: string): Promise<string> {
    booksList = booksList.filter((book) => book.id !== id)
    return Promise.resolve(id)
  }
}

export const bookService = new BookService()
