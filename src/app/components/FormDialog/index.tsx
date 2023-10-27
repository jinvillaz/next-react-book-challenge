import { Close as CloseIcon } from '@mui/icons-material'
import { Button, Dialog, DialogContent, DialogTitle, Grid, IconButton } from '@mui/material'
import { FormTextField } from '../FormTextField'
import { Field, Formik, Form, FormikProps } from 'formik'

import { validationSchema } from './schema'
import { Book, BookData } from '@/app/models/Book'

interface BookFormDialogProps {
  data: Book | undefined
  state: boolean
  onClose: () => void
  onSave: (values: BookData) => void
}

export const BookFormDialog: React.FC<BookFormDialogProps> = ({ state, data, onClose, onSave }) => {
  const initialData = {
    name: '',
    price: 0,
    category: '',
    description: '',
    ...data,
  }

  const handleClose = () => {
    onClose()
  }

  const handleOk = (values: BookData) => {
    onSave(values)
  }

  return (
    <div>
      <Dialog
        fullWidth={true}
        open={state}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title" textAlign="center">
          Book
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Formik
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={handleOk}
            initialValues={initialData}
          >
            {(formikProps: FormikProps<BookData>) => (
              <Form noValidate autoComplete="off" data-testid="book-form">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field name="name" label="Name" fullWidth component={FormTextField} />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="price"
                      label="Price"
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      fullWidth
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="category" label="Category" fullWidth component={FormTextField} />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="description" label="Description" fullWidth component={FormTextField} />
                  </Grid>
                  <Grid item xs={12} sx={{ padding: 2 }} container justifyContent="center">
                    <Button type="submit" variant="contained" disabled={formikProps.isSubmitting}>
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  )
}
