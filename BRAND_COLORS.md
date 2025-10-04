# Creative Spectrum Brand Colors - Implementation Guide

## Primary Brand Colors

### Coral Red (#ff6b6b)
**RGB:** 255, 107, 107
**Usage:**
- "T" in T9ONLINE logo (hero & footer)
- Primary CTA buttons (gradient from #ff6b6b to #e85a5a)
- Primary button bottom borders (#border-red-700)
- Marketing Automations pillar card background
- Tech Startups icon gradient
- Visual concept boxes in AI demo
- Instagram hover state

### Mint Teal (#4ecdc4)
**RGB:** 78, 205, 196
**Usage:**
- "ONLINE" in T9ONLINE logo
- Secondary buttons and borders
- AI-Powered Creative Studio pillar card
- E-commerce icon gradient
- Strategic approach boxes in AI demo
- Footer link hover states
- Secondary CTA button borders

### Sky Blue (#45b7d1)
**RGB:** 69, 183, 209
**Usage:**
- Data-Driven Campaigns pillar card
- Creative Industries icon gradient
- Key insight boxes in AI demo
- LinkedIn/Twitter hover states
- Interactive elements

### Slate Gray (#2c3e50)
**RGB:** 44, 62, 80
**Usage:**
- "9" in T9ONLINE logo
- Dark section backgrounds (hero, pillars, CTA)
- Footer background
- Body text headings
- Navigation text

### Golden Yellow (#f9ca24)
**RGB:** 249, 202, 36
**Usage:**
- Pulsing dot next to logo
- AI demo campaign tagline text
- "?" in "Transform?" headline
- SMEs icon gradient
- Accent highlights

## Gradient Applications

### Primary Hero Gradient
```css
background: linear-gradient(to bottom right, #2c3e50, #475569, #1e293b);
```

### Primary CTA Button
```css
background: linear-gradient(to bottom, #ff6b6b, #e85a5a);
border-bottom: 4px solid #dc2626; /* red-700 */
```

### Secondary Button
```css
border: 2px solid #4ecdc4;
color: #4ecdc4;
hover:background: #4ecdc4;
```

### Pillar Card Gradients

**Marketing Automations (Coral Red):**
```css
background: linear-gradient(to bottom right, #ff8787, #ff6b6b);
icon: linear-gradient(to bottom right, #ff6b6b, #e85a5a);
```

**AI-Powered Creative Studio (Mint Teal):**
```css
background: linear-gradient(to bottom right, #6ee7df, #4ecdc4);
icon: linear-gradient(to bottom right, #4ecdc4, #3db5ad);
```

**Data-Driven Campaigns (Sky Blue):**
```css
background: linear-gradient(to bottom right, #65c9e0, #45b7d1);
icon: linear-gradient(to bottom right, #45b7d1, #3a9bb8);
```

### Who We Empower Icon Gradients

**Tech Startups (Coral Red):**
```css
background: linear-gradient(to bottom right, #ff6b6b, #e85a5a);
```

**E-commerce (Mint Teal):**
```css
background: linear-gradient(to bottom right, #4ecdc4, #3db5ad);
```

**Creative Industries (Sky Blue):**
```css
background: linear-gradient(to bottom right, #45b7d1, #3a9bb8);
```

**SMEs (Golden Yellow):**
```css
background: linear-gradient(to bottom right, #f9ca24, #e0b420);
```

## Section Backgrounds

### Light Sections
```css
background: #ffffff; /* Pure white for "Who We Empower" */
```

### Dark Sections
```css
/* Hero, Pillars, Final CTA */
background: linear-gradient(to bottom right, #2c3e50, #475569, #1e293b);
```

### AI Demo Section
```css
background: linear-gradient(to bottom right, #1e293b, #0f172a);
```

### Footer
```css
background: #2c3e50; /* Solid slate-gray */
border-top: 2px solid #475569;
```

## Text Colors

### Headings
- Primary: `#2c3e50` (slate-gray)
- On dark backgrounds: `#ffffff` (white)

### Body Text
- Light backgrounds: `#475569` (slate-600)
- Dark backgrounds: `#cbd5e1` (slate-300)

### Labels (JetBrains Mono)
- Terminal prompt: `#14b8a6` (teal-400) - using mint-teal family
- Code labels: `#94a3b8` (slate-400)
- Colored labels: Use respective brand colors

## Hover Effects

### Card Hover Shadows
```css
.card-tech:hover {
    border-color: #ff6b6b;
    box-shadow: 0 20px 25px -5px rgba(255, 107, 107, 0.3);
}

.card-ecommerce:hover {
    border-color: #4ecdc4;
    box-shadow: 0 20px 25px -5px rgba(78, 205, 196, 0.3);
}

.card-creative:hover {
    border-color: #45b7d1;
    box-shadow: 0 20px 25px -5px rgba(69, 183, 209, 0.3);
}

.card-sme:hover {
    border-color: #f9ca24;
    box-shadow: 0 20px 25px -5px rgba(249, 202, 36, 0.3);
}
```

### Link Hovers
- Footer links: `#4ecdc4` (mint-teal)
- Social - LinkedIn/Twitter: `#45b7d1` (sky-blue)
- Social - Instagram/TikTok: `#ff6b6b` (coral-red)

## Implementation Notes

✅ All colors match EXACT hex values specified
✅ Gradients use brand colors with calculated lighter/darker shades
✅ Tailwind config extended with custom brand colors
✅ CSS custom properties defined in :root
✅ Consistent application across all sections
✅ Proper contrast ratios maintained for accessibility
✅ Hover states use brand color families

## Files Updated
- `/mnt/d/T9/index.html` - Full implementation with brand colors
- All inline styles use exact hex values
- Tailwind classes supplemented with custom color utilities