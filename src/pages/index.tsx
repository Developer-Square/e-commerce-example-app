import { Meta } from '@/layouts/Meta';
import {
  FeatureSection,
  HeroSection,
  ProductSection,
  WeeklyDeal,
} from '@/lib/homepage';
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
    </Main>
  );
};

export default Index;
