from rest_framework import serializers

from .models import Brand, Category, Product, Image, StockLevel


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'


class BrandLimitedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['name']


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
