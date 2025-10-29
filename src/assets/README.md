# Assets Directory

This directory contains all static assets for the Siyara Jewellery application.

## Structure

- `/images/` - Product images, hero images, and other visual assets
- `/icons/` - SVG icons, logos, and icon assets

## Usage

Import assets using:
```typescript
import imageName from '@/assets/images/image-name.jpg';
import iconName from '@/assets/icons/icon-name.svg';
```

## Naming Convention

- Use kebab-case for file names (e.g., `product-image.jpg`)
- Be descriptive with names (e.g., `hero-background.jpg` instead of `bg.jpg`)
- Include dimensions in file names when relevant (e.g., `logo-192x192.png`)

## Supported Formats

- **Images**: .jpg, .jpeg, .png, .webp, .svg
- **Icons**: .svg (preferred), .png