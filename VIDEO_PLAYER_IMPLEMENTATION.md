# Video Player Implementation Guide

## Overview

Implemented **Plyr video player** with Light Lives custom design language, supporting:
- ✅ Direct video files (R2/CDN hosted)
- ✅ YouTube embeds
- ✅ Vimeo embeds
- ✅ Custom styling (no border radius, primary/secondary/tertiary colors, glassmorphism)
- ✅ Lazy loading (only loads when lightbox opens)
- ✅ Accessibility features
- ✅ Mobile-responsive controls

---

## Installation

Already installed:
```bash
pnpm add plyr-react plyr
```

---

## Usage

### 1. Basic Usage with R2/CDN Video

```tsx
import VideoLightbox from '@/components/ui/video-lightbox';

const [isVideoOpen, setIsVideoOpen] = useState(false);

// In your component
<VideoLightbox
  isOpen={isVideoOpen}
  onClose={() => setIsVideoOpen(false)}
  videoUrl="https://cdn.lightlives.org/videos/hero-video.mp4"
  title="LightLives - Empowering Young Minds"
  description="Watch how we're transforming lives"
/>
```

### 2. YouTube Video

```tsx
<VideoLightbox
  isOpen={isVideoOpen}
  onClose={() => setIsVideoOpen(false)}
  videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  title="Our Impact Story"
/>
```

### 3. Vimeo Video

```tsx
<VideoLightbox
  isOpen={isVideoOpen}
  onClose={() => setIsVideoOpen(false)}
  videoUrl="https://vimeo.com/123456789"
  title="Annual Report Video"
/>
```

### 4. With Navigation (Multiple Videos)

```tsx
<VideoLightbox
  isOpen={isVideoOpen}
  onClose={() => setIsVideoOpen(false)}
  videoUrl={videos[currentIndex].url}
  title={videos[currentIndex].title}
  currentIndex={currentIndex}
  totalVideos={videos.length}
  onPrevious={() => setCurrentIndex(prev => prev - 1)}
  onNext={() => setCurrentIndex(prev => prev + 1)}
  showNavigation={true}
/>
```

---

## Hero Section Update

To add your R2 video to the Hero section:

**File:** `src/components/Home/Hero.tsx`

Replace line 99:
```tsx
videoUrl=""  // Current (empty)
```

With:
```tsx
videoUrl="https://cdn.lightlives.org/videos/your-video-name.mp4"
```

**Example:**
```tsx
<VideoLightbox
  isOpen={isVideoOpen}
  onClose={() => setIsVideoOpen(false)}
  videoUrl="https://cdn.lightlives.org/videos/lightlives-intro.mp4"
  title="LightLives - Empowering Young Minds"
  description="Watch how we're transforming lives through education and mentorship"
  showNavigation={false}
/>
```

---

## Design Language Features

### Custom Styling Applied

✅ **No Border Radius** - All elements use `rounded-none` per brand guidelines  
✅ **Primary Color** - Play button, progress bar, hover states use `hsl(var(--primary))`  
✅ **Glassmorphism** - Controls have `backdrop-blur-[5px]` effect  
✅ **Smooth Transitions** - All interactions have 0.2-0.3s easing  
✅ **Responsive** - Adapts to mobile/tablet/desktop  

### Color Variables Used

```css
--plyr-color-main: hsl(var(--primary));           /* Orange accent */
--plyr-audio-controls-background: hsl(var(--tertiary));  /* Blue background */
--plyr-tab-focus-color: hsl(var(--secondary));    /* Focus states */
```

---

## Performance Optimizations

### Lazy Loading Strategy

The video player implements the **industry-standard lazy loading pattern**:

1. **No preload on page load** - Video is not downloaded initially
2. **Load on lightbox open** - Video starts loading only when user clicks play button
3. **Autoplay enabled** - Starts playing immediately when lightbox opens
4. **No metadata preload** - Even metadata isn't fetched until needed

### What This Means:

- ✅ **Fast page load** - No video bandwidth consumption on initial load
- ✅ **Mobile-friendly** - Respects users on metered connections
- ✅ **Better Core Web Vitals** - Won't hurt LCP/FCP scores
- ✅ **User intent-driven** - Only loads for engaged users

### File Size Recommendations:

For best performance with R2-hosted videos:

- **Resolution**: 1080p (1920x1080) or 720p (1280x720)
- **Codec**: H.264 (most compatible)
- **Bitrate**: 3-5 Mbps for 1080p, 1.5-3 Mbps for 720p
- **Format**: MP4 container
- **Target size**: Keep under 50MB for 2-3 minute videos

---

## Supported Video Types

### Direct Files (R2/CDN)
```tsx
videoUrl="https://cdn.lightlives.org/videos/file.mp4"
```
- Uses native HTML5 `<video>` element
- Controls: Play, Progress, Time, Mute, Volume, Speed, PiP, Fullscreen
- Supports MP4, WebM, OGG

### YouTube
```tsx
videoUrl="https://www.youtube.com/watch?v=VIDEO_ID"
videoUrl="https://youtu.be/VIDEO_ID"
```
- Uses YouTube iframe embed
- Controls: Play, Progress, Time, Mute, Volume, Quality, Fullscreen
- Auto-detects and extracts video ID

### Vimeo
```tsx
videoUrl="https://vimeo.com/VIDEO_ID"
```
- Uses Vimeo iframe embed
- Controls: Play, Progress, Time, Mute, Volume, Quality, Fullscreen
- Auto-detects and extracts video ID

---

## Player Controls

### Available Controls:

**Direct Videos (R2/CDN):**
- ▶️ Play/Pause
- 🎚️ Progress scrubber
- ⏱️ Current time display
- 🔇 Mute toggle
- 🔊 Volume slider
- ⚙️ Settings (playback speed)
- 📺 Picture-in-Picture
- ⛶ Fullscreen

**YouTube/Vimeo:**
- ▶️ Play/Pause
- 🎚️ Progress scrubber
- ⏱️ Current time display
- 🔇 Mute toggle
- 🔊 Volume slider
- ⚙️ Settings (quality, speed)
- ⛶ Fullscreen

### Playback Speed Options:
- 0.5x, 0.75x, 1x (normal), 1.25x, 1.5x, 2x

---

## Keyboard Shortcuts

Plyr includes built-in accessibility shortcuts:

- `Space` - Play/Pause
- `←/→` - Seek backward/forward 5 seconds
- `↑/↓` - Increase/decrease volume
- `M` - Mute toggle
- `F` - Fullscreen toggle
- `Esc` - Exit fullscreen or close lightbox
- `0-9` - Seek to 0%-90% of video

---

## Customization

### Custom CSS File

**Location:** `src/styles/plyr-custom.css`

This file overrides Plyr defaults to match your brand:

```css
/* Example customizations */
:root {
  --plyr-color-main: hsl(var(--primary));  /* Changes accent color */
  --plyr-tooltip-radius: 0px;              /* Removes border radius */
}

.plyr__control--overlaid {
  background: rgba(255, 255, 255, 0.1);    /* Glassmorphism */
  backdrop-filter: blur(10px);
}
```

### Modifying Player Options

Edit `src/components/ui/video-lightbox.tsx`:

```tsx
options={{
  autoplay: true,                          // Start playing immediately
  controls: [...],                         // Which controls to show
  settings: ['quality', 'speed'],         // Settings menu items
  quality: {
    default: 720,                          // Default quality
    options: [1080, 720, 480, 360],       // Available qualities
  },
  speed: {
    selected: 1,                           // Default speed
    options: [0.5, 0.75, 1, 1.25, 1.5, 2] // Speed options
  }
}}
```

---

## Testing Checklist

Before deploying, test the following:

### Desktop:
- [ ] Video plays on click
- [ ] All controls work (play, seek, volume, fullscreen)
- [ ] Keyboard shortcuts work
- [ ] Close button closes lightbox
- [ ] Escape key closes lightbox
- [ ] Video pauses when lightbox closes

### Mobile:
- [ ] Video plays inline (doesn't force fullscreen)
- [ ] Touch controls responsive
- [ ] Volume controls accessible
- [ ] Fullscreen works
- [ ] Video stops playing when lightbox closes

### Cross-Browser:
- [ ] Chrome/Edge (Chromium)
- [ ] Safari (macOS/iOS)
- [ ] Firefox
- [ ] Mobile browsers

### Performance:
- [ ] Video doesn't load until lightbox opens
- [ ] No console errors
- [ ] Smooth animations (60fps)
- [ ] No layout shifts

---

## Troubleshooting

### Video doesn't play
1. Check video URL is accessible (test in browser)
2. Verify video format is MP4/H.264
3. Check CORS headers on R2 bucket (should allow your domain)
4. Open browser console for errors

### Controls not showing
1. Verify `plyr-react/plyr.css` is imported
2. Check custom CSS isn't hiding controls
3. Verify `controls` array in options

### Styling looks wrong
1. Ensure `@/styles/plyr-custom.css` is imported AFTER `plyr.css`
2. Check CSS custom properties are defined in `globals.css`
3. Verify import order in component

### Poor performance
1. Compress video (recommended tools: HandBrake, FFmpeg)
2. Use 720p instead of 1080p for faster loading
3. Enable CloudFlare R2 caching
4. Consider Cloudflare Stream for adaptive bitrate

---

## R2 Bucket Configuration

For optimal performance, ensure your Cloudflare R2 bucket has:

### CORS Configuration
```json
[
  {
    "AllowedOrigins": ["https://lightlives.org", "https://www.lightlives.org"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

### Custom Domain Setup
See `CLOUDFLARE_R2_CUSTOM_DOMAIN_SETUP.md` for `cdn.lightlives.org` configuration.

### Caching Headers
Set in R2 bucket settings:
- `Cache-Control: public, max-age=31536000, immutable`

---

## Future Enhancements

Potential improvements for future iterations:

- [ ] **Captions/Subtitles** - Add VTT file support
- [ ] **Video Chapters** - Enable timeline markers
- [ ] **Analytics** - Track play counts, engagement
- [ ] **Adaptive Streaming** - Migrate to Cloudflare Stream for HLS/DASH
- [ ] **Video Gallery** - Multiple videos with thumbnails
- [ ] **Share Button** - Social media sharing
- [ ] **Download Option** - Allow video downloads

---

## Resources

- **Plyr Documentation**: https://github.com/sampotts/plyr
- **Plyr React**: https://github.com/chintan9/plyr-react
- **Video Compression**: https://handbrake.fr/
- **FFmpeg Guide**: https://ffmpeg.org/documentation.html

---

## Summary

✅ **Industry-standard lazy loading** - Video only loads on user click  
✅ **Multi-format support** - R2/YouTube/Vimeo automatic detection  
✅ **Brand-aligned design** - Custom colors, no border radius, glassmorphism  
✅ **Accessible** - Keyboard navigation, ARIA labels, focus states  
✅ **Mobile-optimized** - Responsive controls, touch-friendly  
✅ **Performance-focused** - No preload, efficient bandwidth usage  

**Next step:** Upload your video to R2 and update the `videoUrl` in `Hero.tsx`!
