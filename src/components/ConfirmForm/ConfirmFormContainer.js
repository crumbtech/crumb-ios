import { reduxForm } from 'redux-form';

import ConfirmForm from './ConfirmForm';
import validator from './validator';
import { confirm } from '../../redux/modules/auth';

export default reduxForm({
  form: 'AuthForm',
  onSubmit: (values, dispatch) => dispatch(confirm(values)),
  validate: validator,
})(ConfirmForm);
