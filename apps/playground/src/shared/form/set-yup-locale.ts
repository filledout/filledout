import { setLocale } from 'yup';

setLocale({
  mixed: {
    required: 'yup:mixed.required',
    default: 'yup.mixed.default',
    oneOf: 'yup.mixed.oneOf',
    notOneOf: 'yup.mixed.notOneOf'
  },

  string: {
    length: 'yup.string.length',
    min: 'yup.string.min',
    max: 'yup.string.max',
    matches: 'yup.string.matches',
    email: 'yup:string:email',
    url: 'yup.string.url',
    trim: 'yup.string.trim',
    lowercase: 'yup.string.lowercase',
    uppercase: 'yup.string.uppercase'
  },

  number: {
    min: 'yup.number.min',
    max: 'yup.number.max',
    lessThan: 'yup.number.lessThan',
    moreThan: 'yup.number.moreThan',
    positive: 'yup.number.positive',
    negative: 'yup.number.negative',
    integer: 'yup.number.integer'
  },

  date: {
    min: 'yup.date.min',
    max: 'yup.date.max'
  },

  array: {
    min: 'yup.array.min',
    max: 'yup.array.max'
  }
});
