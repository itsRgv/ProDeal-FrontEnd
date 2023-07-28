import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import Products from "../../Products/Products";
const RelatedProducts = ({ productId, categoryId }) => {
  // console.log(product);

  const { data } = useFetch(
    `/api/products?populate=*&filters[categories][id]=${categoryId}&filters[id][$ne]=${productId}&pagination[start]=0&pagination[limit]=4`
  );
  return (
    <div className="related-products">
      <Products headingText="Related Products" products={data} />
    </div>
  );
};

export default RelatedProducts;
