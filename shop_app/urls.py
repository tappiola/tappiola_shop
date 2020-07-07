from django.urls import path

from .views import (
    BrandsList, CategoriesList, ProductDetails, ProductsList, CategoryDetails, ImageDetails, ImagesList,
    CategoryProductsList, BrandProductsList, StockLevelList, BrandDetails, StockLevelDetails
)

urlpatterns = [
    path("brands", BrandsList.as_view(), name="brands_list"),
    path("brands/<int:pk>", BrandDetails.as_view(), name="brand_details"),
    path("categories", CategoriesList.as_view(), name="categories_list"),
    path("categories/<int:pk>", CategoryDetails.as_view(), name="category_details"),
    path("category_products/<int:category_id>", CategoryProductsList.as_view(), name="category_products_list"),
    path("brand_products/<int:brand_id>", BrandProductsList.as_view(), name="brand_products_list"),
    path("products", ProductsList.as_view(), name="products_list"),
    path("products/<int:pk>", ProductDetails.as_view(), name="product_details"),
    path("images", ImagesList.as_view(), name="images_list"),
    path("images/<int:pk>", ImageDetails.as_view(), name="image_details"),
    path("stock_level", StockLevelList.as_view(), name="stock_level_list"),
    path("stock_level/<int:pk>", StockLevelDetails.as_view(), name="stock_level_details"),
]
