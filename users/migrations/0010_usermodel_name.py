# Generated by Django 5.0.8 on 2024-10-16 21:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_alter_usermodel_tenant'),
    ]

    operations = [
        migrations.AddField(
            model_name='usermodel',
            name='name',
            field=models.TextField(default=0, max_length=50),
            preserve_default=False,
        ),
    ]