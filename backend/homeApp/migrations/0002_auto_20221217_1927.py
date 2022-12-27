# Generated by Django 3.2.8 on 2022-12-17 18:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('homeApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resteurantmodal',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='resteurants', to='homeApp.categorymodel'),
        ),
        migrations.AlterField(
            model_name='resteurantmodal',
            name='discountDeliveryFeePrice',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AlterField(
            model_name='resteurantmodal',
            name='rating',
            field=models.DecimalField(decimal_places=1, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='resteurantmodal',
            name='waitingTime',
            field=models.CharField(max_length=30, null=True),
        ),
    ]
