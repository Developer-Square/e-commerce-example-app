import { Meta } from '@/layouts/Meta';
import {
  FeatureSection,
  HeroSection,
  ProductSection,
  WeeklyDeal,
} from '@/lib/homepage';
import BlogSection from '@/lib/homepage/blog-section/BlogSection';
import { Main } from '@/templates/Main';

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title="Jewellery and Hand Carvings E-Commerce"
          description="An ecommerce site for selling jewellery and hand carvings in Kenya"
        />
      }
    >
      <HeroSection />
      <FeatureSection />
      <ProductSection />
      <WeeklyDeal />
      <BlogSection />
    </Main>
  );
};

export default Index;
