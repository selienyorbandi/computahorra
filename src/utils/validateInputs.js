export function isValidEmail(email) {
  if (
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|app|dev|mail|gob|co|ar|eu|biz|int|info|edu|us|fr|es|de|mx)\b/i.test(
      email
    )
  ) {
    return true;
  } else {
    return false;
  }
}

export function isValidPassword(password) {
  if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password)) {
    return true;
  } else {
    return false;
  }
}

export const restrictOnlyNumbersPlus = (e) => {
  const alphabet =
    "abcdefghijklmnñopqrstuvwxyzáéíóúàèìòùABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚÀÈÌÒÙª!\"·$%&/)(=?¿^*¨Ç_:;º,.-´´ç````¡'|@#~€¬[]{}";
  if (alphabet.indexOf(e.key) !== -1) {
    e.preventDefault();
  }
};

export const restrictOnlyAlphabet = (e) => {
  const digitsAndSpecial =
    "0123456789ª!\"·$%&/)(=?¿^*¨Ç_:;º,.-´´ç``+``¡'|@#~€¬[]{}";
  if (digitsAndSpecial.indexOf(e.key) !== -1) {
    e.preventDefault();
  }
};

export const restrictOnlyAlphanumeric = (e) => {
  const symbols = "ª!\"·$%&/)(=?¿^*¨Ç_:;º,.-ç``+``¡'|@#~€¬[]{}";
  if (symbols.indexOf(e.key) !== -1) {
    e.preventDefault();
  }
};

export function cleanError(regError) {
  setTimeout(() => {
    regError(null);
  }, 6000);
}
