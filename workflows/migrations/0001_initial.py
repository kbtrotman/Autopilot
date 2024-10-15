# Generated by Django 5.0.8 on 2024-10-11 19:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='WorkModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hrname', models.CharField(max_length=100)),
                ('description', models.TextField(max_length=300)),
                ('type', models.CharField(max_length=100)),
                ('send', models.BooleanField()),
                ('email', models.EmailField(max_length=300)),
            ],
        ),
    ]