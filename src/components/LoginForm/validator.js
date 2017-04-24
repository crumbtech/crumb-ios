export default values => {
  const errors = {};
  const requiredText = 'this field is required';
  if (!values.phoneNumber) errors.phoneNumber = requiredText;
  return errors;
};
