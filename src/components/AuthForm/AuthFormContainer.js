import { connect } from 'react-redux';

import AuthForm from './AuthForm';
import { register } from '../../redux/modules/auth';

const Connected = connect(null, {
  register,
})(AuthForm);

export default Connected;
