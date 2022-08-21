import { Meta } from '@/layouts/Meta';
import { ErrorBoundary } from '@/lib/error-handling';
import {
  BlogSection,
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
