# Generated by Django 5.0.8 on 2024-10-20 22:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('forms', '0002_formmodel_created_formmodel_schema'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='formmodel',
            name='created',
        ),
    ]