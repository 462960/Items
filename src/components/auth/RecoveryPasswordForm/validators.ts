export const validatePasswordEquality = (values) => {
  if (
    values.confirm_password &&
    values.new_password !== values.confirm_password
  ) {
    return { confirm_password: { id: 'errors.password.notEqual' } };
  }
  return undefined;
};
