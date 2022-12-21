import 'text-encoding-polyfill'
import Joi from 'joi'

export default [
  {
    prompt: 'Email Address',
    data: 'email',
    dataType: 'text',
    validate: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .label('email')
  },
  {
    prompt: 'Confirm Email Address',
    data: 'confirmEmail',
    dataType: 'text',
    validate: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .label('email'),
    confirm: 'email'
  },
  {
    prompt: 'Password',
    data: 'password',
    dataType: 'text',
    validate: Joi.string().required().min(3),
    hidden: true
  },
  {
    prompt: 'Confirm Password',
    data: 'confirmPassword',
    dataType: 'text',
    hidden: true,
    validate: Joi.string().required().min(3),
    confirm: 'password'
  },
  {
    prompt: 'Username',
    data: 'username',
    dataType: 'text',
    validate: Joi.string().required().min(3)
  },
  {
    prompt: 'Display Name',
    data: 'displayName',
    dataType: 'text',
    validate: Joi.string().required().min(3)
  },
  {
    prompt: 'Date Of Birth',
    data: 'dob',
    dataType: 'date',
    validate: Joi.date().required()
  },
  {
    prompt: 'Profile Picture',
    data: 'image',
    dataType: 'image',
    validate: Joi.required()
  }
]
