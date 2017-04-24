import { reduxForm } from 'redux-form';

import RegisterForm from './RegisterForm';
import validator from './validator';
import { register } from '../../redux/modules/auth';

export default reduxForm({
  form: 'RegisterForm',
  onSubmit: (values, dispatch) => dispatch(register(values)),
  validate: validator,
})(RegisterForm);
