from django.db import models


# from django.contrib.postgres.fields import ArrayField


class Brand(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=2000)
    image_link = models.URLField()

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=50)
    position = models.IntegerField(null=True)
    show_in_menu = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    brand = models.ForeignKey(Brand, related_name='product_brand', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=2000)
    category = models.ForeignKey(Category, related_name='product_category', on_delete=models.CASCADE)
    color = models.CharField(max_length=50)
    keywords = models.CharField(max_length=1000, blank=True)
    price = models.IntegerField()
    discounted_price = models.IntegerField(null=True)
    discount = models.IntegerField(null=True)

    def __str__(self):
        return self.name


class Image(models.Model):
    product = models.ForeignKey(Product, related_name='product_images', on_delete=models.CASCADE)
    image_link = models.URLField()
    position = models.IntegerField(null=True)


class StockLevel(models.Model):
    SIZE_CHOICES = (
        ('XXS', 'XXS'),
        ('XS', 'XS'),
        ('S', 'S'),
        ('M', 'M'),
        ('L', 'L'),
        ('XL', 'XL'),
        ('32', '32'),
        ('34', '34'),
        ('36', '36'),
        ('38', '38'),
        ('40', '40'),
        ('42', '42'),
        ('one_size', 'One size')
    )

    product = models.ForeignKey(Product, related_name='stock_level', on_delete=models.CASCADE)
    size = models.CharField(choices=SIZE_CHOICES, max_length=200)
    stock_level = models.IntegerField(default=0)

    class Meta:
        unique_together = ('product', 'size')


class Order(models.Model):
    total_cost = models.IntegerField(null=True)
    paid = models.BooleanField(default=False)
    email = models.CharField(max_length=100, null=True)
    first_name = models.CharField(max_length=50, null=True)
    last_name = models.CharField(max_length=50, null=True)
    country = models.CharField(max_length=80, null=True)
    address = models.CharField(max_length=200, null=True)
    city = models.CharField(max_length=80, null=True)
    region = models.CharField(max_length=80, null=True)
    zip = models.CharField(max_length=20, null=True)
    shipping_method = models.CharField(max_length=100, null=True)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='order_items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    size = models.CharField(max_length=200)
    quantity = models.IntegerField(default=1)
    price = models.IntegerField()
