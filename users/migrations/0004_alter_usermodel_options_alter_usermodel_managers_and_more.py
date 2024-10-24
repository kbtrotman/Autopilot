# Generated by Django 5.0.8 on 2024-10-16 19:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_usermodel_options_alter_usermodel_managers_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='usermodel',
            options={},
        ),
        migrations.AlterModelManagers(
            name='usermodel',
            managers=[
            ],
        ),
        migrations.RemoveField(
            model_name='usermodel',
            name='date_joined',
        ),
        migrations.RemoveField(
            model_name='usermodel',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='usermodel',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='usermodel',
            name='username',
        ),
        migrations.AddField(
            model_name='usermodel',
            name='is_staff',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='is_superuser',
            field=models.BooleanField(default=False),
        ),
    ]
