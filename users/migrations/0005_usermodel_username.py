# Generated by Django 5.0.8 on 2024-10-16 19:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_alter_usermodel_options_alter_usermodel_managers_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='usermodel',
            name='username',
            field=models.TextField(default=0, max_length=100),
            preserve_default=False,
        ),
    ]
