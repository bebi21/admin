function checkPassword(str) {
  const regex = /^[A-Z].{4,13}\d.*$/;
  return regex.test(str);
}

export default checkPassword;
