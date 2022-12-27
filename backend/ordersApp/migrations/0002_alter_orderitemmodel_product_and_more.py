# Generated by Django 4.1.4 on 2022-12-19 18:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('homeApp', '0007_delete_menucategorymodel_productmodel_menucategory'),
        ('ordersApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitemmodel',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='homeApp.productmodel'),
        ),
        migrations.AlterField(
            model_name='ordermodel',
            name='resteurant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='resteurant', to='homeApp.resteurantmodal'),
        ),
    ]