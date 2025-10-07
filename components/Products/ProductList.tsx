import Product from "./Product";
import { ProductsProps } from "@/types";

const ProductsList: React.FC<ProductsProps> = ({ products }) => {
  return (
    <ul className='bottom-0 grid grid-cols-2 px-4 pb-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ul>
  );
};

export default ProductsList;
