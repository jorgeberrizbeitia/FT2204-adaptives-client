import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PaymentIntent from "./PaymentIntent"

import Button from 'react-bootstrap/Button';

function ProductList() {
  const [products, setProducts] = useState(null);
  const [productToBuy, setProductToBuy] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/product");
      setProducts(response.data);
    } catch (err) {
      navigate("/error")
    }
  };

  const handleBuy = (productToBuy) => {
    setProductToBuy(productToBuy)
  }

  if (!products) {
    return <h3>...Loading</h3>;
  }

  return (
    <div>
      <h1>My Products</h1>

      <hr />

      {products.map((eachProduct) => {
          return (
            <div key={eachProduct._id}>
              <p>Name: {eachProduct.name}</p>
              <p>Price: {eachProduct.price}</p>
              <Button variant="outline-success" style={{color: "purple"}} onClick={() => handleBuy(eachProduct)}>Comprar</Button>
              <hr />
            </div>
          );
        })
      }

      {
          productToBuy && (
              <>
                <h3>Comprar Producto</h3>
                <PaymentIntent productToBuy={productToBuy}/>
              </>
          )
      }

      

    </div>
  );
}

export default ProductList;