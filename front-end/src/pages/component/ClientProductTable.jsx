import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default function ClientProductTable(
  { data, testSufix, removeAction = false, removeCallback },
) {
  const formatCurrency = (number) => (
    number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      currencyDisplay: 'symbol' })
  );

  return (
    <table className="w-100 table text-center table-striped">
      <thead>
        <tr>
          <th>item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
          {removeAction ? <th>Remover Item</th> : null}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={ item.productId } className="rounded-left align-middle">
            <td
              data-testid={ `${testSufix}__element-order-table-item-number-${idx}` }
            >
              {idx + 1}
            </td>
            <td
              data-testid={ `${testSufix}__element-order-table-name-${idx}` }
            >
              {item.name}
            </td>
            <td
              data-testid={ `${testSufix}__element-order-table-quantity-${idx}` }
            >
              {item.quantity}
            </td>
            <td
              data-testid={ `${testSufix}__element-order-table-unit-price-${idx}` }
            >
              {formatCurrency(Number(item.unitPrice))}
            </td>
            <td
              data-testid={ `${testSufix}__element-order-table-sub-total-${idx}` }
            >
              {formatCurrency(Number(item.subTotal))}
            </td>
            {removeAction
              ? (
                <td
                  data-testid={ `${testSufix}__element-order-table-remove-${idx}` }
                  className="p-2"
                >
                  <Button
                    onClick={ () => removeCallback(item.productId) }
                  >
                    Remover
                  </Button>
                </td>
              )
              : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

ClientProductTable.propTypes = {
  testSufix: PropTypes.string.isRequired,
  removeAction: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      unitPrice: PropTypes.string.isRequired,
      subTotal: PropTypes.number.isRequired,
    }),
  ).isRequired,
  removeCallback: PropTypes.func,
};

ClientProductTable.defaultProps = {
  removeAction: false,
  removeCallback: () => {},
};
