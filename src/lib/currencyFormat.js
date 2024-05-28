export const currencyFormat = (num) => {
  const numericValue = Number(num);
  if (isNaN(numericValue)) {
    return "";
  } else {
    return "Rp" + numericValue.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }
}
