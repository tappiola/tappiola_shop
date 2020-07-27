Website architecture & technologies:
1. Backend REST API developed with Django Rest Framework
1. PostgreSQL database for data storage
1. AWS S3 bucket as storage for static resources
1. Frontend built via React.js (including router and redux)
1. 95% of styling is made with pure css, 5% with Bootstrap (Carousel with images for product page)
1. Chai and Mocha are used for unit testing
1. Local storage for saving data between sessions
1. Express server for hosting React app

Website features:
1. Dynamic content fetched via REST API
1. Advanced search (including partial match) by multiple fields (name, brand, color, keywords, etc.)
1. Out of stock products are filtered out from products list on API level
1. Cart items are stored in local storage, which helps to maintain cart state between sessions. On cart load cart content is validated against stock availability and out of stock items are filtered out.
1. You can't add to cart more items than amount in stock.
1. Amount of items in cart shown on cart icon is updated dynamically wit help of redux store.
1. Website supports direct links navigation, including bypassing search parameters in URL.
1. Spinners on each page with data fetched from the Server.
1. Error handling for cases when non-existing items are fetched or server returns error.
1. Configurable inputs and form validation on submit
1. Stock level is recalculated on successful item purchase 

Deploy to heroku:
1. Frontend: `git push heroku-web HEAD:master`
1. Backend: `git push heroku-api HEAD:master`
