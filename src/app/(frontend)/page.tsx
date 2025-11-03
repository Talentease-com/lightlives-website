import Hero from "@/components/Home/Hero";
import About from "@/components/Home/About";
import Impact from "@/components/Home/Impact";
import SponsorModal from "@/components/ui/SponsorModal";
import { 
  getImpactData, 
  getHeroCarouselImages, 
  getPageVideos, 
  getVideoGallery, 
  getTestimonials 
} from "@/lib/payload/fetch";
import VideoGallery from "@/components/Home/VideoGallery";
import Testimonials from "@/components/Home/Testimonials";
import SponsorCTA from "@/components/SponsorCTA";

// Enable static generation
export const dynamic = 'force-static'

export default async function Home() {
  // Fetch all data from Payload CMS
  const [stats, heroImages, pageVideos, videos, testimonials] = await Promise.all([
    getImpactData(),
    getHeroCarouselImages(),
    getPageVideos(),
    getVideoGallery(),
    getTestimonials(),
  ]);
  
  return (
    <main>
      <SponsorModal />
      <Hero 
        heroImages={heroImages} 
        landingVideo={pageVideos ? {
          videoFile: pageVideos.landingVideoFile,
          videoUrl: pageVideos.landingVideoUrl,
          title: pageVideos.landingVideoTitle || 'Welcome to Light Lives',
          description: pageVideos.landingVideoDescription,
          thumbnail: pageVideos.landingVideoThumbnail,
        } : undefined}
      />
      <About />
      <Impact 
        stats={stats} 
        impactVideo={pageVideos ? {
          videoFile: pageVideos.impactVideoFile,
          videoUrl: pageVideos.impactVideoUrl,
          title: pageVideos.impactVideoTitle || 'Our Impact',
          description: pageVideos.impactVideoDescription,
          thumbnail: pageVideos.impactVideoThumbnail,
        } : undefined}
      />
      <VideoGallery videos={videos} />
      <Testimonials testimonials={testimonials} />
      <SponsorCTA />
    </main>
  );
}
