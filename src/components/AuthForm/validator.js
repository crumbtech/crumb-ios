export default values => {
  const errors = {};
  const requiredText = 'this field is required';
  if (!values.firstName) errors.firstName = requiredText;
  if (!values.lastName) errors.lastName = requiredText;
  if (!values.phoneNumber) errors.phoneNumber = requiredText;
  if (!values.password) errors.password = requiredText;
  return errors;
};
