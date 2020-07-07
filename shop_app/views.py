from rest_framework import generics
from rest_framework import permissions

from .models import Brand, Category, Product, Image, StockLevel
from .serilalizers import (
    BrandSerializer, CategorySerializer, ProductSerializer, ImageSerializer, StockLevelSerializer
)


class BrandsList(generics.ListCreateAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class BrandDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class CategoriesList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class CategoryDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class CategoryProductsList(generics.ListAPIView):
    def get_queryset(self):
        return Product.objects.filter(category=self.kwargs.get("category_id"))

    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class BrandProductsList(generics.ListAPIView):
    def get_queryset(self):
        return Product.objects.filter(brand=self.kwargs.get("brand_id"))

    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ProductsList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ProductDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ImagesList(generics.ListCreateAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ImageDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ProductImagesList(generics.ListAPIView):
    def get_queryset(self):
        return Image.objects.filter(product=self.kwargs.get("product_id"))

    serializer_class = ImageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class StockLevelList(generics.ListCreateAPIView):
    queryset = StockLevel.objects.all()
    serializer_class = StockLevelSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class StockLevelDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = StockLevel.objects.all()
    serializer_class = StockLevelSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
