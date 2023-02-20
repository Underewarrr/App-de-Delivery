function formatCurrency(number) {
  number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    currencyDisplay: 'symbol' });
}

export default { formatCurrency };
