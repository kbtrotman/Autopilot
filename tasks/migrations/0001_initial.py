# Generated by Django 5.0.8 on 2024-09-27 00:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TaskModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Short ID Name', models.CharField(max_length=25)),
                ('Human Readable Name', models.CharField(max_length=100)),
                ('Description', models.TextField(max_length=300)),
                ('Type', models.CharField(max_length=100)),
                ('Input', models.CharField(max_length=100)),
                ('Output JSON', models.CharField(max_length=100)),
                ('t_send_data', models.BooleanField()),
                ('E-mail Addresses', models.EmailField(max_length=100)),
            ],
        ),
    ]
