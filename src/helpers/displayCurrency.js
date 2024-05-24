const displayVNDCurrency = (num) => {
  const formatter = new Intl.NumberFormat('en-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(num);
};
const displayUSDCurrency = (num) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
  return formatter.format(num);
};

export { displayVNDCurrency, displayUSDCurrency };
