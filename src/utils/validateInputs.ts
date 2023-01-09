export function isValidEmail(email: string) {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|app|dev|mail|gob|co|ar|eu|biz|int|info|edu|us|fr|es|de|mx)\b/i.test(
    email
  );
}

export function isValidPassword(password: string) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password);
}

export function isValidName(name: string) {
  return /^((?![0-9.,!?:;_|+\-*\\/=%°@&#§$"'`¨^ˇ()[\]<>{}])[\S ]){2,}$/gm.test(name);
}

export function isValidTelephone(tel: string) {
  return /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(tel);
}

export const restrictOnlyNumbersPlus = (e: { key: string; preventDefault: () => void }) => {
  const alphabet =
    "abcdefghijklmnñopqrstuvwxyzáéíóúàèìòùABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚÀÈÌÒÙª!\"·$%&/)(=?¿^*¨Ç_:;º,.-´´ç````¡'|@#~€¬[]{}";
  if (alphabet.indexOf(e.key) !== -1) {
    e.preventDefault();
  }
};

export const restrictOnlyAlphabet = (e: { key: string; preventDefault: () => void }) => {
  const digitsAndSpecial = "0123456789ª!\"·$%&/)(=?¿^*¨Ç_:;º,.-´´ç``+``¡'|@#~€¬[]{}";
  if (digitsAndSpecial.indexOf(e.key) !== -1) {
    e.preventDefault();
  }
};

export const restrictOnlyAlphanumeric = (e: { key: string; preventDefault: () => void }) => {
  const symbols = "ª!\"·$%&/)(=?¿^*¨Ç_:;º,.-ç``+``¡'|@#~€¬[]{}";
  if (symbols.indexOf(e.key) !== -1) {
    e.preventDefault();
  }
};
