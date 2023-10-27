'use client'
import { useEffect, useState } from 'react'
import {
  Button,
  List,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Container,
  Grid,
  Divider,
  ListItemIcon,
  Typography,
  ListItemButton,
  Tooltip,
} from '@mui/material'
import { Delete as DeleteIcon, LibraryBooks as LibraryBooksIcon } from '@mui/icons-material'
import { Book, BookData } from '../../models/Book'
import { ConfirmDialog } from '../ConfirmDialog'
import { BookFormDialog } from '../FormDialog'
import { useAppDispatch, useAppSelector } from '../../reducers/hooks'
import { selectBooks } from '../../reducers/books/books.selectors'
import { createBook, deleteBook, getBooks, updateBook } from '../../reducers/books/books.actions'

export const BookList = () => {
  const dispatch = useAppDispatch()
  const books = useAppSelector(selectBooks)
  const [itemToDelete, setItemToDelete] = useState<string | undefined>()
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false)
  const [openFormDialog, setOpenFormDialog] = useState<boolean>(false)
  const [bookToEdit, setBookToEdit] = useState<undefined | Book>(undefined)

  const handleClick = (item: Book) => {
    setBookToEdit(item)
    setOpenFormDialog(true)
  }

  const openForm = () => {
    setBookToEdit(undefined)
    setOpenFormDialog(true)
  }

  const onClose = () => {
    setOpenFormDialog(false)
  }

  const onSave = (values: BookData) => {
    if (!bookToEdit) {
      dispatch(createBook(values))
    } else {
      dispatch(updateBook({ id: bookToEdit.id, data: values }))
    }
    onClose()
  }

  const openConfirmationDialog = (id: string) => {
    setOpenConfirmDialog(true)
    setItemToDelete(id)
  }

  const remove = async () => {
    dispatch(deleteBook(itemToDelete as string))
    setOpenConfirmDialog(false)
  }

  useEffect(() => {
    dispatch(getBooks())
  }, [dispatch])

  return (
    <Container>
      <Grid container justifyContent="center" alignItems="center" paddingTop={2}>
        <Typography variant="h2" component="h1">
          Book List
        </Typography>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={openForm}>
          Add Book
        </Button>
      </Grid>
      <ConfirmDialog state={openConfirmDialog} deleteItem={remove} setOpen={setOpenConfirmDialog} />
      <BookFormDialog state={openFormDialog} data={bookToEdit} onClose={onClose} onSave={onSave} />
      <List>
        {books.map((book, index) => (
          <div key={book.id}>
            <ListItemButton onClick={() => handleClick(book)}>
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary={book.name} secondary={`Price: ${book.price} | Category: ${book.category}`} />
              <ListItemSecondaryAction>
                <Tooltip title="delete">
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={(e) => {
                      e.stopPropagation()
                      openConfirmationDialog(book.id)
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItemButton>
            {index < books.length - 1 && <Divider />}
          </div>
        ))}
      </List>
    </Container>
  )
}
