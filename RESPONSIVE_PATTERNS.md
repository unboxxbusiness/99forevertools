# Quick Reference: Responsive Design Patterns

## 🎯 Custom Breakpoints

```typescript
'tiny': '320px',     // Smallest phones (iPhone SE)
'xs': '475px',       // Extra small phones
'sm': '640px',       // Small tablets / large phones
'md': '768px',       // Tablets
'lg': '1024px',      // Laptops
'xl': '1280px',      // Desktops
'2xl': '1536px',     // Large screens
```

## 📱 Common Responsive Patterns

### Responsive Spacing
```tsx
// Padding: tight on mobile, generous on desktop
className="p-3 xs:p-4 sm:p-4 md:p-6"

// Margin: scale up with screen size
className="mb-4 sm:mb-6 md:mb-8"

// Gap in grid/flex
className="gap-2 xs:gap-3 sm:gap-3 md:gap-4"
```

### Responsive Typography
```tsx
// Headings: scale smoothly
className="text-lg xs:text-xl sm:text-xl md:text-2xl lg:text-3xl"

// Body text
className="text-xs xs:text-sm sm:text-sm md:text-base"

// Small text (captions, labels)
className="text-[10px] xs:text-xs sm:text-xs md:text-sm"
```

### Responsive Grid Layouts
```tsx
// Single column → 2 → 3 → 4
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"

// Single column → 3 columns (skip 2)
className="grid grid-cols-1 md:grid-cols-3"

// Always 2, increase gap
className="grid grid-cols-2 gap-2 md:gap-4"
```

### Responsive Flex Layouts
```tsx
// Stack on mobile, row on desktop
className="flex flex-col sm:flex-row"

// Reverse order on mobile
className="flex flex-col-reverse sm:flex-row"

// Center on mobile, start on desktop
className="items-center sm:items-start"

// Wrap items responsively
className="flex flex-wrap gap-2 sm:gap-4"
```

### Responsive Widths & Heights
```tsx
// Full width on mobile, auto on desktop
className="w-full sm:w-auto"

// Max width constraint
className="w-full max-w-md mx-auto"

// Height: use min-h instead of fixed h
className="min-h-[200px] sm:min-h-[300px] md:min-h-[400px]"

// Avoid fixed heights - use h-auto or min-h
className="h-auto"  // ✅ Good
className="h-[400px]"  // ❌ Avoid (use min-h instead)
```

### Responsive Icons & Images
```tsx
// Icons scale with screen size
className="h-4 w-4 xs:h-5 xs:w-5 sm:h-5 sm:w-5 md:h-6 md:w-6"

// Images with proper aspect ratio
className="w-full h-auto"

// Icon in button
<Button>
  <Icon className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
  Text
</Button>
```

### Conditional Display
```tsx
// Hide on mobile, show on desktop
<span className="hidden sm:inline">Desktop Only</span>

// Show on mobile, hide on desktop
<span className="sm:hidden">Mobile Only</span>

// Show different content at breakpoints
<>
  <span className="hidden md:block">Full Text Content</span>
  <span className="md:hidden">Short</span>
</>
```

### Responsive Positioning
```tsx
// Fixed on desktop, relative on mobile
className="relative sm:fixed"

// Sticky header with responsive offset
className="sticky top-0 z-50"

// Absolute positioning with responsive insets
className="absolute top-2 right-2 sm:top-4 sm:right-4"
```

### Touch Targets (Mobile)
```tsx
// Minimum 44x44px for touch
className="min-h-[44px] min-w-[44px]"

// Button with proper touch target
<Button size="sm" className="h-9 sm:h-10 px-3 sm:px-4">
```

## 🎨 Component Examples

### Responsive Card
```tsx
<Card className="p-3 xs:p-4 sm:p-4 md:p-6">
  <CardTitle className="text-sm xs:text-base md:text-lg">
    Title
  </CardTitle>
  <CardDescription className="text-xs xs:text-xs md:text-sm">
    Description
  </CardDescription>
</Card>
```

### Responsive Button
```tsx
<Button 
  size="lg" 
  className="w-full sm:w-auto h-10 xs:h-11 sm:h-12 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8"
>
  <Icon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
  <span className="hidden xs:inline">Full Text</span>
  <span className="xs:hidden">Short</span>
</Button>
```

### Responsive Container
```tsx
<div className="container mx-auto px-3 xs:px-4 sm:px-4 py-4 xs:py-6 sm:py-8">
  <div className="max-w-4xl mx-auto">
    {/* Content */}
  </div>
</div>
```

### Responsive Hero Section
```tsx
<section className="py-8 xs:py-10 sm:py-12 md:py-20 lg:py-32 text-center">
  <h1 className="text-2xl xs:text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight px-2">
    Hero Title
  </h1>
  <p className="mt-2 xs:mt-3 sm:mt-4 text-sm xs:text-base md:text-lg px-3">
    Subtitle text
  </p>
</section>
```

### Responsive Navigation
```tsx
<nav className="flex items-center gap-2 sm:gap-4">
  <Button className="text-xs sm:text-sm h-8 sm:h-9 md:h-10 px-2 sm:px-3 md:px-4">
    <span className="hidden xs:inline">Menu</span>
    <MenuIcon className="xs:hidden h-4 w-4" />
  </Button>
</nav>
```

## 🛠️ Utility Classes Reference

### Custom Utilities (from globals.css)

```css
.min-h-screen-safe       /* Safe viewport height for mobile browsers */
.h-screen-safe           /* Full screen height with dvh support */
.container-fluid         /* Fluid container with clamp() padding */
.grid-gap-responsive     /* Responsive grid gaps with clamp() */
.truncate-2             /* Truncate to 2 lines */
.truncate-3             /* Truncate to 3 lines */
.safe-top/bottom        /* iOS safe area insets */
.text-responsive-*      /* Fluid text sizing */
```

### Usage Examples
```tsx
<div className="min-h-screen-safe container-fluid">
  <div className="grid grid-gap-responsive">
    <p className="truncate-2 text-responsive-base">
      Text content
    </p>
  </div>
</div>
```

## ⚡ Performance Tips

### 1. Use Responsive Images
```tsx
import Image from 'next/image';

<Image 
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  className="w-full h-auto"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

### 2. Lazy Load Below-the-Fold Content
```tsx
<Image 
  src="/image.jpg"
  alt="Description"
  loading="lazy"
/>
```

### 3. Optimize Animations
```tsx
// Disable complex animations on mobile
className="animate-fade-in sm:animate-slide-in"

// Use CSS for simple animations
className="transition-all duration-200 ease-in-out"
```

### 4. Conditional Rendering for Mobile
```tsx
const isMobile = useMediaQuery('(max-width: 768px)');

return (
  <>
    {isMobile ? <MobileComponent /> : <DesktopComponent />}
  </>
);
```

## 🐛 Common Mistakes to Avoid

### ❌ Don't Use Fixed Heights
```tsx
// Bad
className="h-[400px]"

// Good
className="min-h-[200px] sm:min-h-[300px] md:min-h-[400px]"
className="h-auto"
```

### ❌ Don't Use Fixed Widths for Containers
```tsx
// Bad
className="w-[1200px]"

// Good
className="w-full max-w-7xl mx-auto"
className="w-full sm:w-auto"
```

### ❌ Don't Forget Touch Targets
```tsx
// Bad - too small on mobile
<button className="h-6 w-6">

// Good - minimum 44x44px
<button className="h-11 w-11 sm:h-10 sm:w-10">
```

### ❌ Don't Skip Extra Small Screens
```tsx
// Bad - jumps from mobile to tablet
className="text-sm md:text-lg"

// Good - smooth progression
className="text-xs xs:text-sm sm:text-base md:text-lg"
```

### ❌ Don't Use Horizontal Overflow
```tsx
// Bad - causes horizontal scroll
className="whitespace-nowrap overflow-x-auto"

// Good - wrap or truncate
className="break-words"
className="truncate"
```

## ✅ Best Practices Checklist

- [ ] Start mobile-first (320px base styles)
- [ ] Use xs/tiny breakpoints for extra small phones
- [ ] Ensure all touch targets are ≥44x44px
- [ ] Use clamp() for fluid typography
- [ ] Test at 320px, 375px, 768px, 1024px, 1280px
- [ ] Avoid fixed heights (use min-h/max-h)
- [ ] Use relative units (rem, em, %, vw)
- [ ] Add proper truncation for long text
- [ ] Test on actual devices, not just browser resize
- [ ] Verify no horizontal scroll at any breakpoint
- [ ] Check landscape mode on mobile
- [ ] Test with different font sizes (accessibility)
- [ ] Verify keyboard navigation works
- [ ] Check focus states are visible

## 📚 Additional Resources

- [Tailwind Responsive Design Docs](https://tailwindcss.com/docs/responsive-design)
- [MDN Responsive Design Guide](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Web.dev Responsive Images](https://web.dev/responsive-images/)
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

---

*Quick Reference Guide for 99forevertools*
*Last Updated: October 25, 2025*
