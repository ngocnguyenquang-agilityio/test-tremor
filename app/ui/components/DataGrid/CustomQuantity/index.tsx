import { OrderProduct } from "@/types";

interface QuantityProps {
  products: OrderProduct[];
}

const CustomQuantity = ({ products }: QuantityProps) => (
  <>
    {products?.map(product => (
      <p
        key={product.id}
        className="py-0.5 text-xs dark:text-white font-semibold leading-[15px] tracking-[0.4px] max-w-[50px] lg:max-w-[150px] xl:max-w-[250px] 2xl:max-w-[350px] min-w-[50px] order-product py-5 first:pt-0 last:pb-0 border-0 dark:border-grayish border-b border-gray-100 last:border-0">
        {product.count}
      </p>
    ))}
  </>
);

export default CustomQuantity;
