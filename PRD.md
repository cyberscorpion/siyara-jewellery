# Planning Guide

A premium artificial jewellery e-commerce showcase for "Siyara" that enables customers to browse curated collections and place orders seamlessly through WhatsApp integration.

**Experience Qualities**: 
1. **Luxurious** - The interface should evoke the feeling of browsing in an upscale jewellery boutique with refined aesthetics and elegant interactions
2. **Effortless** - Navigation and product discovery should feel intuitive and frictionless, allowing customers to find their desired pieces quickly
3. **Trustworthy** - Professional presentation and attention to detail should communicate quality craftsmanship and reliability

**Complexity Level**: Light Application (multiple features with basic state)
  - The application features product browsing, filtering, wishlist management, and WhatsApp ordering integration with persistent state for wishlist items

## Essential Features

### Product Browsing
- **Functionality**: Display a curated grid of jewellery products with high-quality images, names, prices, and categories
- **Purpose**: Allow customers to discover and explore the jewellery collection
- **Trigger**: Landing on homepage or navigating to product sections
- **Progression**: View homepage → Browse product grid → Hover for quick details → Click for full product page
- **Success criteria**: Products load quickly with crisp images, smooth scrolling, and responsive layout across devices

### Category Filtering
- **Functionality**: Filter products by categories (Necklaces, Earrings, Bracelets, Rings, Sets)
- **Purpose**: Help customers narrow down choices to their preferred jewellery type
- **Trigger**: Click on category filter buttons or navigation
- **Progression**: View all products → Select category filter → See filtered results → Clear filter to return to all
- **Success criteria**: Instant filtering response, clear active state, smooth transitions between filtered views

### Product Detail View
- **Functionality**: Show comprehensive product information including multiple images, detailed description, price, product ID, and specifications
- **Purpose**: Provide customers with complete information to make informed purchase decisions
- **Trigger**: Click on any product card from the grid
- **Progression**: Click product → View modal/page with details → Swipe through images → Add to wishlist or order
- **Success criteria**: Quick load time, zoomable images, clear call-to-action buttons

### WhatsApp Order Integration
- **Functionality**: Generate pre-filled WhatsApp message with product ID and name
- **Purpose**: Enable instant, direct communication for order placement without complex checkout flows
- **Trigger**: Click "Order Now" button on product detail view
- **Progression**: View product → Click "Order Now" → WhatsApp opens with pre-filled message → Customer sends message to shop
- **Success criteria**: WhatsApp link opens correctly on mobile and desktop, message includes accurate product details

### Wishlist Management
- **Functionality**: Save favorite products for later reference with persistent storage
- **Purpose**: Allow customers to curate a collection of desired items for future consideration
- **Trigger**: Click heart icon on product cards or detail view
- **Progression**: Browse products → Click heart icon → Item saved to wishlist → View wishlist page → Remove items or proceed to order
- **Success criteria**: Wishlist persists across sessions, visual feedback on add/remove, dedicated wishlist view page

## Edge Case Handling

- **Empty States**: Display elegant empty state illustrations for no products in category or empty wishlist with encouraging call-to-action
- **Image Loading Failures**: Show sophisticated placeholder skeleton loader, fallback to brand logo if image fails completely
- **WhatsApp Not Installed**: Gracefully handle by opening WhatsApp Web on desktop browsers
- **Network Delays**: Implement skeleton loaders and optimistic UI updates for wishlist actions
- **No Products Found**: Show helpful message with option to clear filters or browse all products

## Design Direction

The design should evoke the refined elegance of luxury jewellery houses like Tiffany & Co. or Cartier—feeling sophisticated, timeless, and premium while maintaining accessibility. A rich interface with generous white space, subtle animations, and high-quality imagery will better serve the purpose of showcasing jewellery as precious pieces worthy of desire.

## Color Selection

Analogous scheme centered on warm, luxurious tones with rose gold and champagne accents that complement jewellery photography while evoking sophistication and femininity.

- **Primary Color**: Deep burgundy/wine (oklch(0.35 0.15 15)) - Communicates luxury, richness, and timeless elegance reminiscent of velvet jewellery boxes
- **Secondary Colors**: Warm champagne gold (oklch(0.88 0.05 75)) for subtle backgrounds and accents, creating a refined, boutique atmosphere; Soft blush (oklch(0.95 0.02 30)) for cards and elevated surfaces
- **Accent Color**: Rose gold (oklch(0.65 0.12 45)) - Premium metallic feel for CTAs and important interactive elements that mirror jewellery materials
- **Foreground/Background Pairings**:
  - Background (Ivory white oklch(0.98 0.01 75)): Deep charcoal text (oklch(0.25 0.01 15)) - Ratio 14.2:1 ✓
  - Card (Soft blush oklch(0.95 0.02 30)): Deep charcoal text (oklch(0.25 0.01 15)) - Ratio 12.8:1 ✓
  - Primary (Deep burgundy oklch(0.35 0.15 15)): Ivory white text (oklch(0.98 0.01 75)) - Ratio 8.5:1 ✓
  - Secondary (Champagne gold oklch(0.88 0.05 75)): Deep charcoal text (oklch(0.25 0.01 15)) - Ratio 11.2:1 ✓
  - Accent (Rose gold oklch(0.65 0.12 45)): White text (oklch(1 0 0)) - Ratio 4.6:1 ✓
  - Muted (Warm grey oklch(0.92 0.01 50)): Muted foreground (oklch(0.5 0.01 15)) - Ratio 7.8:1 ✓

## Font Selection

Typography should convey refined sophistication with a contemporary edge—pairing an elegant serif for headings that evokes traditional luxury with a clean geometric sans-serif for body text that ensures modern readability.

- **Typographic Hierarchy**:
  - Site Title "Siyara": Playfair Display Bold / 36px / -0.02em letter spacing - Elegant serif establishing premium brand identity
  - H1 (Category Titles): Playfair Display SemiBold / 32px / -0.01em letter spacing
  - H2 (Product Names): Playfair Display Medium / 24px / normal letter spacing
  - H3 (Section Headers): Inter SemiBold / 18px / -0.01em letter spacing
  - Body Text: Inter Regular / 16px / normal letter spacing / 1.6 line height
  - Product Price: Inter SemiBold / 20px / -0.02em letter spacing
  - Button Labels: Inter Medium / 14px / 0.02em letter spacing / uppercase
  - Captions/Meta: Inter Regular / 14px / normal letter spacing

## Animations

Animations should feel luxurious and deliberate—every motion should have the weight and grace of handling precious objects. Subtle, purposeful micro-interactions create moments of delight without overwhelming the product photography.

- **Purposeful Meaning**: Motion communicates quality through smooth, eased transitions that mirror the careful handling of fine jewellery. Hover states should feel responsive like examining a piece in-hand.
- **Hierarchy of Movement**:
  - Hero elements and product images receive prominent but gentle scale/parallax effects
  - Navigation and filters use swift, decisive transitions (200ms)
  - Wishlist hearts have satisfying spring animations
  - Product cards lift subtly on hover with shadow depth changes
  - Modal/dialog entrances use elegant fade-scale combinations
  - Scroll-triggered reveals for product grids add progressive sophistication

## Component Selection

- **Components**: 
  - **Card**: Product display with hover elevation effects and custom rounded corners (radius-2xl)
  - **Dialog**: Full-screen product detail view on mobile, centered modal on desktop with backdrop blur
  - **Button**: Primary (solid accent color), Secondary (outline), Ghost (for icon actions) - all with hover lift effects
  - **Badge**: Category tags and "New Arrival" labels with subtle gradient backgrounds
  - **Separator**: Thin golden lines to divide sections elegantly
  - **Scroll Area**: Smooth product grid and modal content scrolling
  - **Skeleton**: Shimmer loaders matching product card dimensions
  - **Tabs**: Category filtering with underline indicator animation
  - **Avatar/Image**: High-quality product photography with lazy loading and aspect-ratio containers
  
- **Customizations**: 
  - Custom product image carousel with thumbnail navigation
  - Animated wishlist heart icon using Phosphor Icons with scale + color transition
  - Floating WhatsApp button with pulse animation
  - Custom empty state illustrations for wishlist and filtered results
  
- **States**: 
  - Buttons: Default has subtle gradient, hover lifts with shadow, active state compresses slightly, disabled reduces opacity
  - Product cards: Default elevated, hover lifts higher with larger shadow, active shows visual press feedback
  - Wishlist heart: Empty outline, filled with spring animation on add, removes with scale-out
  - Filter buttons: Default muted, active shows accent color with underline, hover shows subtle background tint
  
- **Icon Selection**: 
  - Heart/HeartStraight (wishlist toggle)
  - WhatsAppLogo (order button)
  - FunnelSimple (filter controls)
  - MagnifyingGlass (search)
  - X (close modals)
  - CaretLeft/CaretRight (image carousel)
  - ShoppingBag (general commerce)
  - Sparkle (premium indicator)
  
- **Spacing**: 
  - Container padding: px-4 md:px-6 lg:px-8
  - Section gaps: gap-12 md:gap-16 lg:gap-24
  - Product grid: gap-6 md:gap-8
  - Card internal padding: p-4 md:p-6
  - Button padding: px-6 py-3 for primary actions
  - Consistent use of space-y-6 for vertical stacking within sections
  
- **Mobile**: 
  - Mobile-first grid: 1 column on mobile, 2 on tablet (md:), 3-4 on desktop (lg:)
  - Product detail view: Full-screen dialog on mobile, modal on desktop
  - Navigation: Sticky header with compact logo, category filter as horizontal scroll on mobile
  - WhatsApp button: Fixed bottom-right on mobile for thumb accessibility
  - Images: Full-width on mobile with 4:5 aspect ratio optimized for product photography
  - Touch targets: Minimum 44px for all interactive elements
