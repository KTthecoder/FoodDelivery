# Generated by Django 4.1.4 on 2022-12-18 13:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accountApp', '0002_deliveryinfomodel_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='deliveryinfomodel',
            name='current',
            field=models.BooleanField(default=True),
        ),
    ]