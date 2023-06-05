import { Grid, Button, FormHelperText, Card, Typography, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

interface Field {
  name: string
  label: string
  type: string
  rules: { [key: string]: any }
  width?: string
}

interface FormData {
  fields: Array<Field>
  submitButton: string
  submitFunction: Function
  defaultValues: { [key: string]: string }
}

export const Form: React.FC<FormData> = ({
  fields,
  submitButton,
  submitFunction,
  defaultValues,
}) => {
  /**
   * form functionalities from react-hook-forms
   */
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: defaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })

  return (
    <Card
      elevation={16}
      sx={{
        p: 4,
        borderRadius: '16px',
        maxWidth: '480px',
      }}
    >
      <form onSubmit={handleSubmit((data) => submitFunction(data))}>
        <Grid item container direction="column" rowSpacing={3}>
          <Grid item container rowSpacing={3}>
            {fields.map((field: Field) => (
              <Grid item container key={field.name}>
                <Controller
                  control={control}
                  name={field.name}
                  rules={field.rules}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <>
                      <TextField
                        type={field.type}
                        label={field.label}
                        value={value}
                        onChange={onChange}
                        sx={{
                          ...(field.width && {
                            width: field.width,
                          }),
                        }}
                      />
                      <FormHelperText error>
                        {errors[field.name] ? errors[field.name]?.message : ' '}
                      </FormHelperText>
                    </>
                  )}
                />
              </Grid>
            ))}
          </Grid>

          <Grid item alignSelf="center">
            <Button
              sx={{
                backgroundColor: 'primary.main',
                '&:hover': { backgroundColor: 'primary.dark' },
              }}
              size="large"
              type="submit"
              variant="contained"
              disabled={!isValid}
            >
              <Typography sx={{ color: 'white' }}> {submitButton}</Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  )
}
