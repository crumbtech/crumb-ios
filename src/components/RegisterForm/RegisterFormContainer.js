import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import RegisterForm from './RegisterForm';
import validator from './validator';
import { register, showLoginForm } from '../../redux/modules/auth';

const Connected = connect(null, {
  showLoginForm,
})(RegisterForm);

export default reduxForm({
  form: 'RegisterForm',
  onSubmit: (values, dispatch) => dispatch(register(values)),
  validate: validator,
})(Connected);
