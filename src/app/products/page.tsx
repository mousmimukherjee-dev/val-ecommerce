import ProductsContent from "@/components/ProductsContent/ProductsContent";
import { Suspense } from "react";

const products = () => {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <ProductsContent />;
    </Suspense>
  );
};

export default products;
