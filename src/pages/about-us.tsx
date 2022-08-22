import { Meta } from '@/layouts/Meta';
import {
  ClientNumbers,
  Info,
  Partners,
  Team,
  Testimonial,
} from '@/lib/about-us-page';
import { Breadcrumb } from '@/lib/common';
import { Main } from '@/templates/Main';

const About = () => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <Breadcrumb previousLink="" previousTitle="Home" currentTitle="About Us" />
    <Info />
    <Testimonial />
    <ClientNumbers />
    <Team />
    <Partners />
  </Main>
);

export default About;
