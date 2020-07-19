# Generated by Django 3.0.8 on 2020-07-19 12:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shop_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_cost', models.IntegerField()),
                ('paid', models.BooleanField(default=False)),
                ('email', models.CharField(max_length=100)),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('country', models.CharField(max_length=80)),
                ('address', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=80)),
                ('region', models.CharField(max_length=80)),
                ('zip', models.CharField(max_length=20)),
                ('shipping_method', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('size', models.CharField(max_length=200)),
                ('quantity', models.IntegerField(default=1)),
                ('price', models.IntegerField()),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_items', to='shop_app.Order')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop_app.Product')),
            ],
        ),
    ]