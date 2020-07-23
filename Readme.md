Website architecture & technologies:
1. Backend REST API developed with Django Rest Framework
2. PostgreSQL database for data storage
3. AWS S3 bucket as storage for static resources
4. Frontend built via React.js (including router and redux)
5. 95% of styling is made with pure css, 5% with Bootstrap (carousel for )
6. Chai and Mocha are used for unit testing
7. Local storage for saving data between sessions

Website features:
1. Dynamic content fetched via REST API
2. Advanced search (including partial match) by multiple fields (name, brand, color, keywords, etc.)
3. Out of stock products are filtered out from products list on API level
4. Cart items are stored in local storage, which helps to maintain cart state between sessions. On cart load cart content is validated against stock availability and out of stock items are filtered out.
5. You can't add to cart more items than amount in stock.
6. Amount of items in cart shown on cart icon is updated dynamically wit help of redux store.
7. Website supports direct links navigation, including bypassing search parameters in URL.
8. Spinners on each page with data fecthed from the Server.
9. Error handling for cases when non-existing items are fetched or server returns error.
10. Configurable inputs and form validation on submit
          
