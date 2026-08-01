# Premier Schools Exhibition Landing Page

A fully responsive, accessibility-optimized landing page for the Premier Schools Exhibition (Gurugram Edition). Built using vanilla HTML5, CSS3, and JavaScript, strictly adhering to clean BEM naming conventions.

## Core Features

- **Interactive Hero Section**: Features an infinite vertical scrolling photo marquee, a clean event venue details card, and a mobile-only quick-action registration bar.
- **Participating School Logo Ticker**: Seamless, hardware-accelerated horizontal school logo tickers that scroll infinitely and pause on hover.
- **Choose the School Carousel**: Responsive school profiles displayed in a grid on desktop/tablet, converting into an interactive mobile swipe-friendly view.
- **Other Attractions Switcher**: Parent and Kidz Attractions section with interactive tabs. On mobile, it snaps to a stacked layout with the title at the very top.
- **What Makes This Exhibition a Must-Visit**: Highlights grid showing why parents should visit the exhibition. On mobile, it condenses into a clean 2x2 static grid for optimal screen utilization.
- **Parent Reviews Slider**: Smooth horizontal swipe carousel for video reviews. Scaled to preview upcoming cards to encourage exploration.
- **Curved Photo Gallery**: An interactive image scroll frame wrapped inside an inline SVG curved mask clip path.
- **Accessible & Motion Friendly**: Fully WCAG 2.2 compliant with keyboard skip-links, focus outlines, and immediate overrides (`prefers-reduced-motion`) for users with motion sensitivities.

## Running Locally

To run the project locally:
1. Clone this repository.
2. Open `index.html` directly in any web browser, or launch a simple local development server (such as Live Server in VS Code, or python's `http.server`).

## Project File Layout
- `index.html` - Semantic markup structure.
- `css/style.css` - Custom styling tokens, layout grids, variables, and animations.
- `css/responsive.css` - Breakpoint overrides for tablet (max-width: 1024px) and mobile (max-width: 768px).
- `js/main.js` - Modals, tab switchers, scroll triggers, and navigation controls.
