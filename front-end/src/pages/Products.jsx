import React, { useEffect, useState } from 'react';
import { Button, Card, Placeholder } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { requestData } from '../services/request';
import imgLoad from '../utils/imgs/load.png';
import './css/products.css';
import useStorage from '../hooks/useStorage';
import PrivateHeader from './component/PrivateHeader';

function Products() {
  const [produtos, setProdutos] = useState(null);
  const load = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  const [products, setCartProducts] = useStorage('products', []);
  const [isCartButtonDisabled, setIsCartButtonDisabled] = useState(true);

  const getProducts = async () => {
    const { data } = await requestData('/products');
    setProdutos(data);
  };
  useEffect(() => {
    getProducts();
  }, []);

  const negativeResult = -1;
  const addToCart = (product) => {
    const result = products.findIndex(({ productId }) => productId === product.id);
    if (result > negativeResult) {
      const newArr = [...products];
      newArr[result].quantity += 1;
      newArr[result].subTotal = newArr[result].quantity * newArr[result].unitPrice;
      newArr[result].subTotal = newArr[result].subTotal.toFixed(2);
      setCartProducts(newArr);
      return;
    }
    const cartProduct = [
      ...products, {
        itemId: products.length + 1,
        productId:
        product.id,
        name: product.name,
        unitPrice: product.price,
        subTotal: product.price,
        quantity: 1 }];
    setCartProducts(cartProduct);
  };

  const removeFromCart = (product) => {
    const result = products.findIndex(({ productId }) => productId === product.id);
    if (products[result].quantity === 0) return;
    if (result > negativeResult) {
      const newArr = [...products];
      if (newArr[result].quantity === 1) {
        const fileterdProducts = products.filter(({ productId }) => (
          productId !== product.id));
        setCartProducts(fileterdProducts);
        return;
      }
      newArr[result].quantity -= 1;
      newArr[result].subTotal -= newArr[result].unitPrice;
      newArr[result].subTotal = newArr[result].subTotal.toFixed(2);
      setCartProducts(newArr);
    }
  };

  const setItemQuantityFromInput = ({ target: { value } }, product) => {
    if (value < 0) return;
    const result = products.findIndex(({ productId }) => productId === product.id);
    if (result > negativeResult) {
      const newArr = [...products];
      newArr[result].quantity = Number(value);
      newArr[result].subTotal = newArr[result].quantity * newArr[result].unitPrice;
      newArr[result].subTotal = newArr[result].subTotal.toFixed(2);
      setCartProducts(newArr);
      return;
    }
    const cartProduct = [
      ...products, {
        itemId: products.length + 1,
        productId:
        product.id,
        name: product.name,
        unitPrice: product.price,
        subTotal: product.price,
        quantity: value }];
    setCartProducts(cartProduct);
  };

  const formatCurrency = (value) => Number(value).toLocaleString(
    'pt-BR',
    { style: 'decimal', minimumFractionDigits: 2 },
  );

  useEffect(() => {
    if (products.length > 0) {
      setIsCartButtonDisabled(false);
    } else {
      setIsCartButtonDisabled(true);
    }
  }, [products]);

  const sumCart = () => {
    const total = products.reduce((
      (prev, { unitPrice, quantity }) => prev + unitPrice * quantity), 0);

    return (
      <Link to="/customer/checkout">
        <Button
          data-testid="customer_products__button-cart"
          className="P_cart_button"
          disabled={ isCartButtonDisabled }
        >
          Ver Carrinho R$
          {' '}
          <span
            data-testid="customer_products__checkout-bottom-value"
          >
            {formatCurrency(String(total))}
          </span>
        </Button>
      </Link>

    );
  };

  const addAndRemoveProducts = (product) => {
    const result = products.find(({ productId }) => productId === product.id);
    return (
      <div
        className="d-flex justify-content-center w-100"
        style={ { width: 'fit-content' } }
      >
        <Button
          data-testid={ `customer_products__button-card-add-item-${product.id}` }
          onClick={ () => addToCart(product) }
        >
          +
        </Button>
        <input
          data-testid={ `customer_products__input-card-quantity-${product.id}` }
          type="number"
          value={ result ? result.quantity : '0' }
          onChange={ (event) => setItemQuantityFromInput(event, product) }
          className="P_input_card"
          min="0"
        />
        <Button
          data-testid={ `customer_products__button-card-rm-item-${product.id}` }
          onClick={ () => removeFromCart(product) }
        >
          -
        </Button>
      </div>
    );
  };

  return (
    <>
      <PrivateHeader />
      {produtos ? (
        <div className="justify-content-center">
          <div className="P_box_itens">
            {produtos.map((body) => (
              <Card
                key={ body.id }
                className="cardStyle Card"
                style={ { width: '18rem' } }
              >
                <div className="P_card_img_box">
                  <Card.Img
                    data-testid={ `customer_products__img-card-bg-image-${body.id}` }
                    className="Card-img"
                    variant="top"
                    src={ body.urlImage }
                    alt={ body.name }
                  />
                </div>
                <div>
                  <Card.Body className="bg-success H_card_body">
                    <p
                      className="text-white P_preco"
                      bg="success"
                      color="white"
                    >
                      R$
                      {' '}
                      <span
                        data-testid={ `customer_products__element-card-price-${body.id}` }
                      >
                        {formatCurrency(body.price)}
                      </span>
                    </p>
                    <Card.Text
                      data-testid={ `customer_products__element-card-title-${body.id}` }
                      className="flex-wrap text-white Card-Text"
                    >
                      { body.name }
                    </Card.Text>
                    { addAndRemoveProducts(body) }
                  </Card.Body>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="H_box_itens_load">
          {load.map((_, ii) => (
            <Card className="Card" key={ ii } style={ { width: '18rem' } }>
              <Card.Img variant="top" src={ imgLoad } />
              <Card.Body>
                <Placeholder as={ Card.Title } animation="glow">
                  <Placeholder xs={ 6 } />
                </Placeholder>
                <Placeholder as={ Card.Text } animation="glow">
                  <Placeholder xs={ 7 } />
                  {' '}
                  <Placeholder xs={ 4 } />
                  {' '}
                  <Placeholder xs={ 4 } />
                  {' '}
                  <Placeholder xs={ 6 } />
                  {' '}
                  <Placeholder xs={ 8 } />
                </Placeholder>
                <Placeholder.Button variant="primary" xs={ 6 } />
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
      { sumCart() }
    </>
  );
}
export default Products;
