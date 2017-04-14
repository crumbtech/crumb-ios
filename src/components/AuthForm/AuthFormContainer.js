import { reduxForm } from 'redux-form';

import AuthForm from './AuthForm';
import validator from './validator';
import { register } from '../../redux/modules/auth';

export default reduxForm({
  form: 'AuthForm',
  onSubmit: (values, dispatch) => dispatch(register()),
  validate: validator,
})(AuthForm);
