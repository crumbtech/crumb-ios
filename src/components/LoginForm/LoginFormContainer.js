import { reduxForm } from 'redux-form';

import LoginForm from './LoginForm';
import validator from './validator';
import { login } from '../../redux/modules/auth';

export default reduxForm({
  form: 'LoginForm',
  onSubmit: (values, dispatch) => dispatch(login(values)),
  validate: validator,
})(LoginForm);
