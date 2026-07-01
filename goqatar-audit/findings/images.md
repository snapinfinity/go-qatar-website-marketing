# Image SEO Findings — goqatar.app
**Audit Date:** 2026-06-27

---

## Inventory

| Asset | Format | Accessible | SEO Relevant |
|-------|--------|------------|--------------|
| /og-image.png | PNG | ✅ | ✅ OG/Twitter card image |
| /favicon-32.png | PNG | ✅ | ✅ Favicon |
| /icon-192.png | PNG | ✅ | ✅ PWA icon |
| /icon-512.png | PNG | ✅ | ✅ PWA icon |
| /apple-icon.png | PNG | ✅ | ✅ Apple touch icon |
| /doha-map-static.png | PNG | ✅ | Decorative |
| /logos/app_icon.svg | SVG | ✅ | Used in UI |
| /logos/go_qatar_text.svg | SVG | ✅ | Logo text |
| /logos/logo-icon.svg | SVG | ✅ | — |
| /logos/logo2.png | PNG | ✅ | — |

---

## Issues

### HIGH: Hero App Icon Image Has Empty Alt Text
**Severity:** High  

In `HeroSection.tsx`:
```tsx
<Image src="/logos/app_icon.svg" alt="" width={18} height={18} />
```
The app icon in the hero badge uses `alt=""`. While decorative images can have empty alt text, this is the primary brand logo in the hero — it should describe the product:
```tsx
alt="Go Qatar app icon"
```

---

### HIGH: No OG Image Verification of Actual Dimensions
**Severity:** High  

The OG image is declared as `1200×630` but this hasn't been verified against the actual file. If the image doesn't match declared dimensions, social previews may appear cropped or distorted on Facebook, LinkedIn, and WhatsApp.

**Check:** Verify `curl -sI https://goqatar.app/og-image.png | grep content-length` and validate dimensions with an image tool.

---

### MEDIUM: No Real App Screenshots in Sitemap or Schema
**Severity:** Medium  

The site uses 3D SVG illustrations (NewsIcon3D, FavouritesIcon3D, HistoryIcon3D) instead of real app screenshots. For `MobileApplication` schema, real screenshots are recommended to qualify for Google App rich results.

**Fix:** Add 2-3 real screenshots of the app (minimum 250px wide) to the /public folder and reference them in the MobileApplication schema `screenshot` property.

---

### MEDIUM: Logo Image Has No Alt Text in Navbar
**Severity:** Medium  

In `Navbar.tsx`:
```tsx
<Image src="/logos/go_qatar_text.svg" alt="Go Qatar" width={80} height={16} ... />
```
This has alt text ✅. But the app icon image above it has:
```tsx
<Image src="/logos/app_icon.svg" alt="Go Qatar icon" width={28} height={28} ... />
```
✅ Also fine. But the privacy policy page also uses:
```tsx
<Image src="/logos/app_icon.svg" alt="" width={16} height={16} />
```
Empty alt on the legal page badge — acceptable since it's decorative there.

---

### LOW: All Public Images Use PNG Format
**Severity:** Low  

The OG image, favicons, and PWA icons are all PNG. WebP would reduce file sizes by ~25-30% for the OG image. However, OG images should remain PNG/JPG for broad compatibility with social scrapers.

Recommendation: The `doha-map-static.png` used in AppMockup component could be served as WebP via Next.js Image optimization if it's used via the `<Image>` component.

---

## What Works Well
- ✅ OG image exists and is accessible at the declared URL
- ✅ OG image dimensions properly declared (1200×630)
- ✅ OG image alt text: "Go Qatar — Navigate Qatar effortlessly" ✅
- ✅ Twitter Card `summary_large_image` set correctly
- ✅ Multiple favicon sizes (32px, 192px, 512px, 180px apple) cover all devices
- ✅ Next.js `<Image>` component used throughout (WebP conversion automatic)
- ✅ SVG icons inlined (crisp at any resolution, zero HTTP overhead)
- ✅ `fetchPriority` and `sizes` handled by Next.js Image component
