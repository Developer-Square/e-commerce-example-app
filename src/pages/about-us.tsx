import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';

import { Meta } from '@/layouts/Meta';
import { Breadcrumb, FontAwesomeIcon } from '@/lib/common';
import { Main } from '@/templates/Main';

interface IInfoSectionProps {
  title: string;
  content: string;
}

const data: Record<string, any>[] = [
  {
    title: 'Who We Are ?',
    content:
      'Contextual advertising programs sometimes have strict policies that need to be adhered too. Let’s take Google as an example.',
  },
  {
    title: 'What We Do ?',
    content:
      'In this digital generation where information can be easily obtained within seconds, business cards still have retained their importance.',
  },
  {
    title: 'Why Choose Us ?',
    content:
      'A two or three storey house is the ideal way to maximise the piece of earth on which our home sits, but for older or infirm people.',
  },
];

const InfoSection = ({ title, content }: IInfoSectionProps) => (
  <div className="mb-7">
    <h4 className="mb-2.5 text-2xl font-bold text-[#111]">{title}</h4>
    <p className="mb-0 text-sm text-[#3d3d3d]">{content}</p>
  </div>
);

const About = () => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <Breadcrumb previousLink="" previousTitle="Home" currentTitle="About Us" />
    <section className="pt-24 pb-16">
      <div className="container-sm container">
        <div className="mb-9">
          <img src="/assets/images/about/about-us.jpg" alt="about-us" />
        </div>
        <div>
          {data.map((item, index) => (
            <InfoSection
              key={index}
              title={item.title}
              content={item.content}
            />
          ))}
        </div>
      </div>
    </section>
    <section className="bg-[#f3f2ee]">
      <div className="container-sm container">
        <div className="flex flex-col justify-center py-14 px-10">
          <FontAwesomeIcon icon={faQuoteRight} className="!h-14" />
          <p className="mb-6 pt-3 text-xl italic text-[#111]">
            “Going out after work? Take your butane curling iron with you to the
            office, heat it up, style your hair before you leave the office and
            you won’t have to make a trip back home.”
          </p>
          <div className="flex justify-center">
            <div className="mr-5">
              <img
                src="/assets/images/about/testimonial-1.jpg"
                alt="testimonial"
                className="h-16 w-16 rounded-full"
              />
            </div>
            <div>
              <h5 className="mb-1 text-lg font-bold text-[#111]">
                Augusta Schultz
              </h5>
              <p className="italic text-[#b7b7b7]">Fashion Design</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img
          src="/assets/images/about/testimonial-pic.jpg"
          alt="testimonial"
          className="testimonial"
        />
      </div>
    </section>
  </Main>
);

export default About;
