AMIR REALTY WEBSITE — README
=============================

WHAT THIS IS
------------
A redesigned, self-contained website for Amir Realty (New Metro City Kharian –
Sarai Alamgir). No backend, no build step, no frameworks — just index.html,
style.css, script.js and an /assets folder. It's ready to upload straight to
GitHub Pages.

FILES
-----
index.html   All page content and structure
style.css    All styling (colors, layout, glass/gold design system)
script.js    Nav behaviour, scroll reveals, property filter, video cards,
             landmark lightbox, WhatsApp lead form
assets/      Every image, video and logo used on the site


WHERE EACH ASSET IS USED
-------------------------
amir-realty-logo.png        Nav bar, About section, Footer
new-metro-city-logo.png     "New Metro City" project section
entrance-gate-photo.jpg     Hero image panel, landmark gallery
entrance-aerial.jpg         "New Metro City" project image, one property card
houses.jpeg                 "Apartment / Living Space" property card
clock-tower.webp            Landmark gallery ("Clock Tower")
clock-tower.mp4 (+poster)   Video Experience section ("Clock Tower")
entrance-gate.mp4 (+poster) Video Experience section ("Entrance Gate")
environment.mp4 (+poster)   Video Experience section ("Environment")
bilal-masjid.jpg            Landmark gallery ("Bilal Masjid")
eiffel-enclave.jpg          Landmark gallery ("Eiffel Enclave")
trafalgar-square.jpg        Landmark gallery ("Trafalgar Square – Momentum")
zyad-square.jpg             Landmark gallery ("Zyad Square")
favicon.png                 Browser tab icon

Note on the landmark photos: a few of the supplied images (for example
zyad-square.jpg and houses.jpeg) don't clearly show New Metro City signage
in the frame. They've been used as provided and labelled with the names you
gave me, but it's worth double-checking each one is actually the correct,
current photo before this goes live — swap any that aren't with the
"How to add future images" steps below.

No prices, plot sizes, payment plans, or possession dates were invented.
Property cards and the masterplan panel use "Ask team" / "coming soon"
placeholders on purpose — replace them with verified figures only.


HOW TO CHANGE THE PHONE NUMBER
-------------------------------
The number 0308-6262091 (WhatsApp: 923086262091) appears in:
  - index.html: nav WhatsApp button, hero WhatsApp button, property "Enquire"
    links, contact section, footer, floating WhatsApp button
To change it, open index.html and do a find-and-replace:
  - Replace "923086262091" (used inside every wa.me link) with the new
    number in international format, no plus sign, no leading zero
    (e.g. UK 07123 456789 -> 447123456789).
  - Replace the display text "0308-6262091" with the new number formatted
    however you'd like it to read on-screen.
  - Also update tel:+923086262091 links the same way.


HOW TO ADD OR EDIT PROPERTIES
-------------------------------
Each property is a <article class="p-card"> block inside
<div id="propertyGrid"> in index.html. Copy an existing block and edit:
  - data-purpose="sale" or "rent"          (used by the Property Finder filter)
  - data-type="plot" / "house" / "apartment" / "commercial"
  - data-location="nmc" or "other"
  - the image src, heading, location line, and the three <span> meta items
  - the WhatsApp link text after "?text=" (this pre-fills the chat message)
Only enter real prices, sizes and availability once confirmed — leave
"Ask team" in place otherwise.


HOW TO ADD FUTURE VIDEOS
--------------------------
1. Add the new .mp4 file to /assets.
2. Generate a poster frame (first frame) for it — any tool that can export a
   still from a video works, or run this if you have ffmpeg installed:
       ffmpeg -i assets/your-video.mp4 -vframes 1 assets/your-video-poster.jpg
3. Copy one of the <div class="video-card"> blocks in the "Experience"
   section of index.html, and update the data-video path, poster path, and
   the title text in <span class="v-title">.


HOW TO ADD FUTURE IMAGES / LANDMARKS
--------------------------------------
1. Add the image file to /assets (keep filenames lowercase, no spaces).
2. Copy one of the <div class="landmark"> blocks inside the
   "landmark-grid" in index.html, update data-full, the <img src>, alt
   text, and the caption text in <span class="cap">.
3. If you add more than 6 landmarks, you may want to adjust the grid sizing
   classes (.l1–.l6) in style.css under "/* Landmark gallery */" — each
   class controls how many grid cells that tile spans.


HOW TO ADD THE FUTURE INTERACTIVE MAP
----------------------------------------
The "Explore New Metro City" section (id="explore") is a placeholder shell
built so it's easy to swap in a real map later:
  - .map-shell is the main canvas area — replace its contents with your
    map/WebGL component once ready.
  - .explore-side already has containers for a block selector, landmark
    list and legend — wire these up to control the map instead of just
    displaying static chips.
  - The "+" / "–" zoom buttons are already in the markup as
    <button ... disabled> — remove the disabled attribute and hook up
    JS once real zoom is implemented.
Nothing in this section currently claims to be a live map; the badge reads
"Interactive map — coming soon" on purpose. Update or remove that badge
once the real map is in place.


DEPLOYING TO GITHUB PAGES
----------------------------
1. Create (or open) the GitHub repository, e.g. amir-realty-website.
2. Upload all files and the assets folder, keeping the same folder structure
   (index.html, style.css, script.js and assets/ all at the repo root).
3. In the repository, go to Settings -> Pages.
4. Under "Build and deployment", set Source to "Deploy from a branch",
   choose the branch (usually "main") and folder "/ (root)", then Save.
5. GitHub will publish the site at:
     https://<your-username>.github.io/<repository-name>/
   All paths in this project are relative (assets/...), so it will work
   correctly at that URL without any changes.
6. Every time you push new changes to that branch, GitHub Pages redeploys
   automatically (usually within a minute or two).


PERFORMANCE NOTES
--------------------
- All images have been resized/compressed for the web.
- Videos are muted, use preload="none" and only load their real source
  file the moment someone taps play — nothing autoplays on page load.
- Cards, landmark tiles and gallery images use loading="lazy" so the
  browser defers off-screen assets.
- No JavaScript framework or external library is used — script.js is
  plain, dependency-free JavaScript.
