import PropTypes from 'prop-types';

export default function SellerOrderProductsTable(
  { data },
) {
  const formatCurrency = (number) => (
    number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      currencyDisplay: 'symbol' })
  );

  const sufix = 'seller_order_details__element-order-table';

  return (
    <table className="w-100 table text-center table-striped">
      <thead>
        <tr>
          <th>item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={ item.productId } className="rounded-left align-middle">
            <td
              data-testid={ `${sufix}-item-number-${idx}` }
            >
              {idx + 1}
            </td>
            <td
              data-testid={ `${sufix}-name-${idx}` }
            >
              {item.name}
            </td>
            <td
              data-testid={ `${sufix}-quantity-${idx}` }
            >
              {item.quantity}
            </td>
            <td
              data-testid={ `${sufix}-unit-price-${idx}` }
            >
              {formatCurrency(Number(item.unitPrice))}
            </td>
            <td
              data-testid={ `${sufix}-sub-total-${idx}` }
            >
              {formatCurrency(Number(item.subTotal))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

SellerOrderProductsTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      unitPrice: PropTypes.string.isRequired,
      subTotal: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
