import { Grid, Button, FormHelperText, Card, Typography, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import entries from 'lodash/entries'

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
  buttonDisable: 'onValid' | 'never'
  validationMode: 'onSubmit' | 'onChange'
  t?: Function
}

export const Form: React.FC<FormData> = ({
  fields,
  submitButton,
  submitFunction,
  defaultValues,
  buttonDisable,
  validationMode,
  t,
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
    mode: validationMode,
    reValidateMode: validationMode,
    criteriaMode: 'all',
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
                        id={field.name}
                        required
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
                      {errors[field.name] && (
                        <ErrorMessage
                          errors={errors}
                          name={field.name}
                          render={({ messages }) => {
                            return messages
                              ? entries(messages).map(([type, message]) => (
                                  <FormHelperText key={type} error>
                                    {t !== undefined ? t(message, { ns: 'passwordResetPage' }) : ''}
                                  </FormHelperText>
                                ))
                              : null
                          }}
                        />
                      )}
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
              disabled={buttonDisable === 'onValid' ? !isValid : false}
            >
              <Typography sx={{ color: 'white' }}> {submitButton}</Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  )
}
