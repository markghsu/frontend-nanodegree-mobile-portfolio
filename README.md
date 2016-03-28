## Website Performance Optimization portfolio project

This is the website optimization project for Udacity's Front-End Nanodegree.
In order to build the "dist" folder, which includes all production files, the default gulp task can be run
	gulp
This will minimize css, javascript, images, and html and copy them from src to the production folder.
Once the website is built, it can be run by opening the dist/index.html file in a browser. The Pizza page can be accessed directly by opening the dist/views/pizza.html file in a browser, or by following the link from the homepage (index.html).

###Part 1: Optimize PageSpeed Insights score for index.html

Update index.html to have a PageSpeed Insights score of >90 for both mobile and desktop

Optimizations:
- Used image resizer to create thumbnails for images
- Used imageMagick to optimize images
- Inlined CSS
- Added "media=print" to stop print CSS from blocking
- Moved google font link to bottom of page
- Minified all CSS files
- Added "async" attribute to script tags
- Minified Javascript
- Removed sourcemaps from minified JS in order to increase pagespeed score

###Part 2: Optimize Frames per Second in pizza.html

Update Pizza page javascript (views/js/main.js) to remove jank

Optimizations:
- Removed unnecessary "determineDX" function when changing pizza sizes -- used % width directly instead
- Moved element selection outside of loop (pizzaDiv in resizePizza function, movingPizzas1 in background pizza creation)
- Updated rotation of background pizzas on page scroll so that there is no forced layout reflow
- Moved phase calculation of background pizzas outside of loop
- Updated image background creation to use pizza thumbnail, as the max size is <100px
- Refactored to use getElementById and getElementsByClassName rather than querySelector
