const emailValidator = (email) => {
  if (!email) {
    return { isValid: false, message: '"email" is required' };
  }
  // lógica que elimina o primeiro e último caractere
  let aux = email.replace(/^./, '');
  aux = aux.slice(0, aux.length - 1);

  if (aux.includes('@')) {
    return { isValid: true, message: '' };
  }
  return { isValid: false, message: '"email" must be a valid email' };
};

const passwordValidator = (password) => {
  if (!password) {
    return { isValid: false, message: '"password" is required' };
  }
  if (password.length < 6) {
    return { isValid: false, message: '"password" length must be 6 characters long' };
  }
  return { isValid: true, message: '' };
};

const loginValidations = (req, res, next) => {
    const { displayName, email, password } = req.body;

    // valida DisplayName
    if (displayName.length < 8) {
      return res.status(400).json({
        message: '"displayName" length must be at least 8 characters long',
      });
    }

    // valida Email
    const emailVal = emailValidator(email);
    if (!emailVal.isValid) {
      return res.status(400).json({
        message: emailVal.message,
      });
    }

    // valida Password
    if (!passwordValidator(password).isValid) {
      return res.status(400).json({
        message: passwordValidator(password).message,
      });
    }

    next();
};

module.exports = { loginValidations };
// REFERÊNCIAS:
// https://www.delftstack.com/pt/howto/javascript/javascript-remove-first-character-from-string/#:~:text=Aqui%2C%20utilizamos%20replace(%2F%5E.,%22%22%20%C3%A9%20a%20string%20vazia.