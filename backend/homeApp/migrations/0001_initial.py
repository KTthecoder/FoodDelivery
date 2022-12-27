# Generated by Django 3.2.8 on 2022-12-17 15:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CategoryModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, null=True)),
                ('icon', models.ImageField(upload_to='categoryIcons')),
                ('image', models.ImageField(upload_to='categoryImages')),
            ],
        ),
        migrations.CreateModel(
            name='ResteurantModal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150, null=True)),
                ('rating', models.DecimalField(decimal_places=2, max_digits=3, null=True)),
                ('image', models.ImageField(upload_to='resteurantImages')),
                ('deliveryFeePrice', models.DecimalField(decimal_places=2, max_digits=5, null=True)),
                ('discountDeliveryFeePrice', models.DecimalField(decimal_places=2, max_digits=5, null=True)),
                ('waitingTime', models.IntegerField()),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='homeApp.categorymodel')),
            ],
        ),
        migrations.CreateModel(
            name='ProductModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120, null=True)),
                ('regularPrice', models.DecimalField(decimal_places=2, max_digits=5, null=True)),
                ('discountPrice', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('description', models.TextField(null=True)),
                ('image', models.ImageField(upload_to='productImages')),
                ('resteurant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='homeApp.resteurantmodal')),
            ],
        ),
    ]
