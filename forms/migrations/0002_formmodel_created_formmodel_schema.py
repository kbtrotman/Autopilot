# Generated by Django 5.0.8 on 2024-10-20 21:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forms', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='formmodel',
            name='created',
            field=models.DateTimeField(auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='formmodel',
            name='schema',
            field=models.JSONField(default=0),
            preserve_default=False,
        ),
    ]
