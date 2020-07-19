from rest_framework import serializers

from .models import Brand, Category, Product, Image, StockLevel, Order, OrderItem


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'


class BrandLimitedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['name', 'image_link']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'


class ImageLimitedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image_link', 'position']


class StockLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockLevel
        fields = '__all__'


class StockLevelLimitedSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockLevel
        fields = ['size', 'stock_level']


class ProductSerializer(serializers.ModelSerializer):
    product_images = ImageLimitedSerializer(many=True, read_only=True)
    brand = BrandLimitedSerializer(read_only=False)
    stock_level = StockLevelLimitedSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        exclude = ()


class ProductCreateSerializer(serializers.ModelSerializer):
    product_images = ImageLimitedSerializer(many=True, read_only=True)
    stock_level = StockLevelLimitedSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        exclude = ()


class CreateOrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        exclude = ['order']


class CreateOrderSerializer(serializers.Serializer):
    order_items = CreateOrderItemSerializer(many=True)

    def create(self, validated_data):
        order_items = validated_data.pop('order_items')
        order = Order.objects.create()

        for order_item in order_items:
            OrderItem.objects.create(order=order, **order_item)

        return order


class SubmitOrderSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    country = serializers.CharField()
    address = serializers.CharField()
    city = serializers.CharField()
    region = serializers.CharField()
    zip = serializers.CharField()
    shipping_method = serializers.CharField()

    class Meta:
        model = Order
        fields = '__all__'


class OrderProductSerializer(serializers.ModelSerializer):
    product_images = ImageLimitedSerializer(many=True, read_only=True)
    brand = BrandLimitedSerializer(read_only=False)

    class Meta:
        model = Product
        exclude = ('price', 'discounted_price', 'discount')


class ViewOrderItemSerializer(serializers.ModelSerializer):
    product = OrderProductSerializer()

    class Meta:
        model = OrderItem
        exclude = ['order']


class ViewOrderSerializer(serializers.ModelSerializer):
    order_items = ViewOrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = '__all__'
