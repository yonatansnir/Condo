const responseWithError = (res, code, error) => {
  return res.status(code).send({ error });
};

const daysInMonth = (month) => {
  return new Date(new Date().getFullYear(), month, 0).getDate();
};

const validateDate = (y, m, d) => {
  if (
    (d > 0 || d <= 31) &&
    (m > 0 || m <= 12) &&
    (y > new Date().getFullYear() - 110 || y <= new Date().getFullYear())
  ) {
    const monthDays = daysInMonth(d);
    if (d > monthDays) return false;
    return true;
  } else return false;
};

module.exports = {
  daysInMonth,
  responseWithError,
  validateDate,
};
