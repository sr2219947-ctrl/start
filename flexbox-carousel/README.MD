# Responsive Flexbox Carousel (Infinite Scroll)

A simple responsive carousel made using **HTML + CSS (Flexbox)**.
It scrolls infinitely by duplicating the same group of cards to create a seamless loop.

live at:https://sr2219947-ctrl.github.io/start/flexbox-carousel/

## Features
- ✅ Responsive cards using `clamp()` (works on mobile, tablet, desktop)
- ✅ Infinite horizontal scrolling (no blank gap)
- ✅ Image + text cards
- ✅ Smooth animation
- ✅ Pause animation on hover
- ✅ `prefers-reduced-motion` support for accessibility

## Tech Used
- HTML5
- CSS3 (Flexbox + keyframe animation)

## How It Works
The `.track` contains **two identical groups** of cards.
The animation moves the track left by **50%**, which equals one group width, so the loop is continuo


