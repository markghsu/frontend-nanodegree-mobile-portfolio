## Website Performance Optimization portfolio project

This is the website optimization project for Udacity's Front-End Nanodegree.
In order to build the "dist" folder, which includes all production files, the default gulp task can be run
	gulp
This will minimize css, javascript, images, and html and copy them from src to the production folder.

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
- Updated rotation of background pizzas on page scroll so that there is no forced layout reflow
- Updated image background creation to use pizza thumbnail, as the max size is <100px.
