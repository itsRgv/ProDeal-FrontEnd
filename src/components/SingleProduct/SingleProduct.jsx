import "./SingleProduct.scss";
import { useParams } from "react-router-dom";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaCartPlus,
} from "react-icons/fa";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { Context } from "../../utils/context";

const SingleProduct = () => {
  const [counter, setCounter] = useState(1);
  const { id } = useParams();
  const { data } = useFetch(`/api/products?populate=*&[filters][id]=${id}`);
  // console.log(data);
  const { handleAddToCart } = useContext(Context);

  const increamentQuantity = () => {
    setCounter(counter + 1);
  };
  const decreamentQuantity = () => {
    if (counter === 1) {
      return 1;
    } else setCounter(counter - 1);
  };
  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img
              src={
                process.env.REACT_APP_DEV_URL +
                data?.data?.[0]?.attributes?.img?.data?.[0]?.attributes?.url
              }
              alt=""
            ></img>
          </div>
          <div className="right">
            <span className="name">{data?.data?.[0]?.attributes?.title}</span>
            <span className="price">
              &#8377;{data?.data?.[0]?.attributes?.price}
            </span>
            <span className="desc">{data?.data?.[0]?.attributes?.desc}</span>

            <div className="cart-buttons">
              <div className="quantity-buttons">
                <span onClick={decreamentQuantity}>-</span>
                <span>{counter}</span>
                <span onClick={increamentQuantity}>+</span>
              </div>
              <div
                className="add-to-cart-button"
                onClick={() => {
                  handleAddToCart(data?.data?.[0], counter);
                  setCounter(1);
                }}
              >
                <FaCartPlus size={20} />
                ADD TO CART
              </div>
            </div>

            <span className="divider" />

            <div className="info-item">
              <span className="text-bold">
                Category:{" "}
                <span>
                  {" "}
                  {
                    data?.data?.[0]?.attributes?.categories?.data?.[0]
                      ?.attributes?.title
                  }
                </span>
              </span>
              <span className="text-bold">
                Share:
                <span className="social-icons">
                  <FaFacebookF size={16} />
                  <FaTwitter size={16} />
                  <FaInstagram size={16} />
                  <FaLinkedinIn size={16} />
                  <FaPinterest size={16} />
                </span>
              </span>
            </div>
          </div>
        </div>
        <RelatedProducts
          productId={id}
          categoryId={data?.data?.[0]?.attributes?.categories?.data?.[0]?.id}
        />
      </div>
    </div>
  );
};

export default SingleProduct;
