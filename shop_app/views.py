from django.db.models import Q, Sum
from rest_framework import generics, views
from rest_framework import permissions
from rest_framework.response import Response

from .models import Brand, Category, Product, Image, StockLevel, Order, OrderItem
from .serilalizers import (
    BrandSerializer, CategorySerializer, ProductSerializer, ImageSerializer, StockLevelSerializer,
    ProductCreateSerializer, CreateOrderSerializer, SubmitOrderSerializer, ViewOrderSerializer
)


def get_products_in_stock():
    return Product.objects.annotate(
        total_stock=Sum('stock_level__stock_level')).filter(total_stock__gt=0)


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
        return get_products_in_stock().filter(category=self.kwargs.get("category_id"))

    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class SaleProductsList(generics.ListAPIView):
    def get_queryset(self):
        return get_products_in_stock().filter(discounted_price__isnull=False)

    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class BrandProductsList(generics.ListAPIView):
    def get_queryset(self):
        return get_products_in_stock().filter(brand=self.kwargs.get("brand_id"))

    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ProductsList(generics.ListCreateAPIView):
    queryset = Product.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ProductSerializer
        else:
            return ProductCreateSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):

        search_param = self.request.query_params.get('search', None)
        ids_param = self.request.query_params.get('ids', None)

        if search_param:
            q_term = Q()
            for param in search_param.split(' '):
                q = (
                        Q(name__icontains=param) |
                        Q(brand__name__istartswith=param) |
                        Q(color__iexact=param) |
                        Q(keywords__icontains=param)
                )
                q_term &= q

            return get_products_in_stock().filter(q_term)
        elif ids_param:
            return get_products_in_stock().filter(id__in=ids_param.split(','))
        else:
            return get_products_in_stock()


class ProductDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ProductSerializer
        else:
            return ProductCreateSerializer

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


class CreateOrder(views.APIView):

    def post(self, request):
        request_serializer = CreateOrderSerializer(data=request.data)
        if request_serializer.is_valid():
            new_order = request_serializer.save(paid=False)
            return Response({'order_id': new_order.pk, 'total_price': new_order.total_cost}, 201)

        return Response(request_serializer.errors, 400)


class SubmitOrder(views.APIView):

    def put(self, request, pk):
        order = Order.objects.get(pk=pk)
        request_serializer = SubmitOrderSerializer(order, data=request.data)
        if request_serializer.is_valid():
            request_serializer.save(paid=True)

            order_items = OrderItem.objects.filter(order_id=pk)
            for item in order_items:
                stock_item_to_update = StockLevel.objects.get(product=item.product_id, size=item.size)
                new_quantity = max(stock_item_to_update.stock_level - item.quantity, 0)
                stock_item_to_update.stock_level = new_quantity
                stock_item_to_update.save()

            response_serializer = ViewOrderSerializer(instance=order)
            return Response(response_serializer.data, 200)

        return Response(request_serializer.errors, 400)
