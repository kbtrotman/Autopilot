# Generated by Django 5.0.8 on 2024-10-18 20:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0003_alter_servermodel_datacenter'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appliancemodel',
            name='datacenter',
            field=models.CharField(max_length=150),
        ),
    ]
