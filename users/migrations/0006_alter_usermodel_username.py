# Generated by Django 5.0.8 on 2024-10-16 19:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_usermodel_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usermodel',
            name='username',
            field=models.TextField(max_length=100, unique=True),
        ),
    ]
