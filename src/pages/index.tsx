/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";

import { Meta } from "@/layouts/Meta";
import { ErrorBoundary } from "@/lib/error-handling";
import {
  BlogSection,
  FeatureSection,
  HeroSection,
  ProductSection,
  WeeklyDeal,
} from "@/lib/homepage";
import { addProducts } from "@/lib/products/product.slice";
import { useProducts } from "@/lib/products/products.hooks";
import { useAppDispatch } from "@/store/hook";
import { Main } from "@/templates/Main";

const Index = () => {
  const { data } = useProducts({
    offset: "1",
    count: "10",
  });
  const dipatch = useAppDispatch();

  const products = data?.documents || [];

  useEffect(() => {
    dipatch(addProducts(products));
  }, [products]);

  return (
    <Main
      meta={
        <Meta
          title="Jewellery and Hand Carvings E-Commerce"
          description="An ecommerce site for selling jewellery and hand carvings in Kenya"
        />
      }
    >
      <ErrorBoundary>
        <HeroSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <FeatureSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <ProductSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <WeeklyDeal />
      </ErrorBoundary>
      <ErrorBoundary>
        <BlogSection />
      </ErrorBoundary>
    </Main>
  );
};

export default Index;
