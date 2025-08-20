# FlipGallery Component

A responsive React gallery component with smooth GSAP-powered flip animations. Each card displays a front and back image that flips when clicked or hovered.

## Features

- ✅ **Smooth GSAP Animations** - Professional flip animations with proper easing
- ✅ **Responsive Design** - Configurable grid layouts for different screen sizes
- ✅ **TypeScript Support** - Fully typed for better development experience
- ✅ **Accessibility** - ARIA labels and reduced motion support
- ✅ **Performance Optimized** - Hardware acceleration and proper cleanup
- ✅ **Modular Architecture** - Clean separation of concerns

## Installation

```bash
# Ensure GSAP is installed
npm install gsap

# Copy the FlipGallery component files to your project
# src/components/Galleries/FlipGallery/
```

## Basic Usage

```tsx
import FlipGallery from "./components/Galleries/FlipGallery";
import "./components/Galleries/FlipGallery/styles.css";

const MyPage = () => {
  const cards = [
    {
      id: 1,
      frontImage: "/images/front1.jpg",
      backImage: "/images/back1.jpg",
      altText: "Description"
    },
    // ... more cards
  ];

  return <FlipGallery cards={cards} />;
};
```

## Advanced Configuration

```tsx
<FlipGallery 
  cards={galleryData}
  gridColumns={{
    mobile: 1,    // 1 column on mobile
    tablet: 2,    // 2 columns on tablet
    desktop: 3    // 3 columns on desktop
  }}
  enableHoverFlip={true}
  flipDuration={1.2}
  cardHeight={{
    mobile: "200px",
    tablet: "250px", 
    desktop: "300px"
  }}
  className="my-custom-gallery"
/>
```

## Props API

### FlipGalleryProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cards` | `FlipCardData[]` | Required | Array of card data |
| `gridColumns` | `GridColumns` | `{mobile: 2, tablet: 3, desktop: 4}` | Responsive grid configuration |
| `className` | `string` | `""` | Additional CSS classes |
| `enableHoverFlip` | `boolean` | `false` | Enable flip on hover (desktop only) |
| `flipDuration` | `number` | `0.85` | Animation duration in seconds |
| `cardHeight` | `CardHeight` | `{mobile: "165px", tablet: "195px", desktop: "245px"}` | Responsive card heights |

### FlipCardData

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string \| number` | No | Unique identifier |
| `frontImage` | `string` | Yes | URL to front image |
| `backImage` | `string` | Yes | URL to back image |
| `altText` | `string` | No | Accessibility description |

## Responsive Breakpoints

The component uses these responsive breakpoints:

- **Mobile**: `< 768px` - Uses mobile grid and height settings
- **Tablet**: `768px - 1023px` - Uses tablet grid and height settings  
- **Desktop**: `≥ 1024px` - Uses desktop grid and height settings

## Animation Details

- **Click to Flip**: Works on all devices
- **Hover to Flip**: Desktop only (when `enableHoverFlip={true}`)
- **Animation Protection**: Prevents conflicting animations
- **Hardware Acceleration**: Uses GPU for smooth performance
- **iOS Safari Optimized**: Special WebKit optimizations

## Accessibility Features

- **ARIA Labels**: Proper `role="img"` and `aria-label` attributes
- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **Keyboard Support**: Cards are focusable and respond to interactions
- **Screen Reader Friendly**: Descriptive alt text for images

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+ (including iOS)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. **Image Optimization**: Use optimized images for better loading
2. **Lazy Loading**: Consider implementing lazy loading for large galleries
3. **Cleanup**: Component automatically cleans up GSAP animations
4. **Hardware Acceleration**: CSS transforms are GPU-accelerated

## File Structure

```
src/components/Galleries/FlipGallery/
├── index.tsx                 # Main component
├── types.ts                  # TypeScript definitions
├── styles.css               # Component styles
├── components/
│   └── FlipCard.tsx         # Individual card component
└── animations/
    └── flipAnimations.ts    # GSAP animation logic
```

## Customization

### Custom Styles

Override default styles by targeting these classes:

```css
.flipImgCard {
  /* Custom card container styles */
}

.flipImg {
  /* Custom image styles */
}
```

### Custom Grid Layouts

```tsx
// 5-column desktop layout
<FlipGallery 
  gridColumns={{
    mobile: 2,
    tablet: 3,
    desktop: 5
  }}
/>
```

### Custom Animation Timing

```tsx
// Slower, more dramatic flip
<FlipGallery 
  flipDuration={1.5}
  cards={data}
/>
```

## Troubleshooting

### Images Not Loading
- Verify image paths are correct
- Check network requests in browser dev tools
- Ensure images are accessible from your domain

### Animations Not Working
- Confirm GSAP is properly installed
- Check browser console for JavaScript errors
- Verify CSS is imported correctly

### Performance Issues
- Optimize image sizes and formats
- Consider reducing `flipDuration` for faster animations
- Test on actual mobile devices

## Migration from HTML/Vanilla JS

If migrating from vanilla JavaScript implementation:

1. Convert HTML structure to JSX
2. Replace `style` attributes with `style` objects
3. Move GSAP logic to `animations/flipAnimations.ts`
4. Add TypeScript types for better development experience

## License

This component is designed to work with your existing project structure and follows the same patterns as your other components.