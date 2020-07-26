from django.urls import path

from .views import (
    BrandsList, CategoriesList, ProductDetails, ProductsList, CategoryDetails, ImageDetails, ImagesList,
    CategoryProductsList, BrandProductsList, StockLevelList, BrandDetails, StockLevelDetails, SaleProductsList,
    CreateOrder, SubmitOrder, OrderDetails
)

API_PREFIX = 'api'

urlpatterns = [
    path(f"{API_PREFIX}/brands", BrandsList.as_view(), name="brands_list"),
    path(f"{API_PREFIX}/brands/<int:pk>", BrandDetails.as_view(), name="brand_details"),
    path(f"{API_PREFIX}/categories", CategoriesList.as_view(), name="categories_list"),
    path(f"{API_PREFIX}/categories/<int:pk>", CategoryDetails.as_view(), name="category_details"),
    path(f"{API_PREFIX}/category_products/<int:category_id>", CategoryProductsList.as_view(), name="category_products_list"),
    path(f"{API_PREFIX}sale", SaleProductsList.as_view(), name="category_products_list"),
    path(f"{API_PREFIX}/brand_products/<int:brand_id>", BrandProductsList.as_view(), name="brand_products_list"),
    path(f"{API_PREFIX}/orders/<int:pk>", OrderDetails.as_view(), name="view_order"),
    path(f"{API_PREFIX}/orders/create", CreateOrder.as_view(), name="create_order"),
    path(f"{API_PREFIX}/orders/submit/<int:pk>", SubmitOrder.as_view(), name="submit_order"),
    path(f"{API_PREFIX}/products", ProductsList.as_view(), name="products_list"),
    path(f"{API_PREFIX}/products/<int:pk>", ProductDetails.as_view(), name="product_details"),
    path(f"{API_PREFIX}/images", ImagesList.as_view(), name="images_list"),
    path(f"{API_PREFIX}/images/<int:pk>", ImageDetails.as_view(), name="image_details"),
    path(f"{API_PREFIX}/stock_level", StockLevelList.as_view(), name="stock_level_list"),
    path(f"{API_PREFIX}/stock_level/<int:pk>", StockLevelDetails.as_view(), name="stock_level_details"),
]
