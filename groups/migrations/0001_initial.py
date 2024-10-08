# Generated by Django 5.0.8 on 2024-09-28 16:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GroupModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sname', models.CharField(max_length=25)),
                ('hrname', models.CharField(max_length=100)),
                ('description', models.TextField(max_length=300)),
                ('type', models.CharField(max_length=100)),
                ('input', models.CharField(max_length=100)),
                ('send', models.BooleanField()),
                ('email', models.BooleanField()),
            ],
        ),
    ]
