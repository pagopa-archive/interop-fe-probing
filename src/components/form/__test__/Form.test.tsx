import { render } from '@testing-library/react'
import { Form } from '../Form'
import { expect, test, vi } from 'vitest'

const fields = [
  {
    name: 'username',
    label: 'username',
    type: 'email',
    rules: {
      required: 'username required',
    },
  },
  {
    name: 'password',
    label: 'password',
    type: 'password',
    rules: {
      required: 'password required',
    },
  },
]

const defaultFormValues: { [key: string]: string } = {
  username: '',
  password: '',
}

const onSubmit = vi.fn()

describe('Form', () => {
  test('render component', () => {
    const { container } = render(
      <Form
        fields={fields}
        submitButton={'Submit'}
        submitFunction={onSubmit}
        defaultValues={defaultFormValues}
        buttonDisable={'onValid'}
        validationMode={'onSubmit'}
      />
    )
    expect(container).toMatchSnapshot()
  })
})
