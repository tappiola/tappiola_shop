from django.urls import path

from .views import (
    BrandsList, CategoriesList, ProductDetails, ProductsList, CategoryDetails, ImageDetails, ImagesList,
    CategoryProductsList, BrandProductsList, StockLevelList, BrandDetails, StockLevelDetails, SaleProductsList,
    CreateOrder, SubmitOrder, OrderDetails
)

urlpatterns = [
    path("api/brands", BrandsList.as_view(), name="brands_list"),
    path("api/brands/<int:pk>", BrandDetails.as_view(), name="brand_details"),
    path("api/categories", CategoriesList.as_view(), name="categories_list"),
    path("api/categories/<int:pk>", CategoryDetails.as_view(), name="category_details"),
    path("api/category_products/<int:category_id>", CategoryProductsList.as_view(), name="category_products_list"),
    path("api/sale", SaleProductsList.as_view(), name="category_products_list"),
    path("api/brand_products/<int:brand_id>", BrandProductsList.as_view(), name="brand_products_list"),
    path("api/orders/<int:pk>", OrderDetails.as_view(), name="view_order"),
    path("api/orders/create", CreateOrder.as_view(), name="create_order"),
    path("api/orders/submit/<int:pk>", SubmitOrder.as_view(), name="submit_order"),
    path("api/products", ProductsList.as_view(), name="products_list"),
    path("api/products/<int:pk>", ProductDetails.as_view(), name="product_details"),
    path("api/images", ImagesList.as_view(), name="images_list"),
    path("api/images/<int:pk>", ImageDetails.as_view(), name="image_details"),
    path("api/stock_level", StockLevelList.as_view(), name="stock_level_list"),
    path("api/stock_level/<int:pk>", StockLevelDetails.as_view(), name="stock_level_details"),
]
