# Generated by Django 4.1.4 on 2022-12-27 13:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homeApp', '0007_delete_menucategorymodel_productmodel_menucategory'),
    ]

    operations = [
        migrations.AddField(
            model_name='resteurantmodal',
            name='latitude',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='resteurantmodal',
            name='longitude',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
    ]
