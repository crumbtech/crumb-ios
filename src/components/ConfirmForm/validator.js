export default values => {
  const errors = {};
  const requiredText = 'this field is required';
  if (!values.confirmationCode) errors.confirmationCode = requiredText;
  return errors;
};
