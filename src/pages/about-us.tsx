import { Meta } from '@/layouts/Meta';
import {
  ClientNumbers,
  Info,
  Partners,
  Team,
  Testimonial,
} from '@/lib/about-us-page';
import { Breadcrumb } from '@/lib/common';
import { ErrorBoundary } from '@/lib/error-handling';
import { Main } from '@/templates/Main';

const About = () => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <ErrorBoundary>
      <Breadcrumb
        previousLink=""
        previousTitle="Home"
        currentTitle="About Us"
      />
    </ErrorBoundary>
    <ErrorBoundary>
      <Info />
    </ErrorBoundary>
    <ErrorBoundary>
      <Testimonial />
    </ErrorBoundary>
    <ErrorBoundary>
      <ClientNumbers />
    </ErrorBoundary>
    <ErrorBoundary>
      <Team />
    </ErrorBoundary>
    <ErrorBoundary>
      <Partners />
    </ErrorBoundary>
  </Main>
);

export default About;
