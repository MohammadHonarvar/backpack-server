const passwordValidationRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
export const validatePasswordFormat = (password) => {
  if (!passwordValidationRegExp.test(password)) {
    return false;
  }

  return true;
};
