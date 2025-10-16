import SwooshButton from "./ui/swoosh-button";

interface SponsorCTAProps {
  children?: React.ReactNode;
}

const SponsorCTA = ({ children }: SponsorCTAProps) => {
  return (
    <section className="py-16 text-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-tertiary mb-4">Ready to Make a Difference?</h2>
        <p className="text-xl text-tertiary-600 mb-8">
          Your contribution, big or small, creates a ripple of positive change.
        </p>
        {children || (
          <SwooshButton href='/sponsor' className='bg-red-800 mt-6 font-bold' text='Sponsor a Child' />
        )}
      </div>
    </section>
  );
};

export default SponsorCTA;