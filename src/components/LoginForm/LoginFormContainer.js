import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import LoginForm from './LoginForm';
import validator from './validator';
import { login, showRegisterForm } from '../../redux/modules/auth';

const Connected = connect(null, {
  showRegisterForm,
})(LoginForm);

export default reduxForm({
  form: 'LoginForm',
  onSubmit: (values, dispatch) => dispatch(login(values)),
  validate: validator,
})(Connected);
