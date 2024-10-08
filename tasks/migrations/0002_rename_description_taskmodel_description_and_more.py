# Generated by Django 5.0.8 on 2024-09-28 00:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='taskmodel',
            old_name='Description',
            new_name='description',
        ),
        migrations.RenameField(
            model_name='taskmodel',
            old_name='E-mail Addresses',
            new_name='email',
        ),
        migrations.RenameField(
            model_name='taskmodel',
            old_name='Human Readable Name',
            new_name='hrname',
        ),
        migrations.RenameField(
            model_name='taskmodel',
            old_name='Input',
            new_name='input',
        ),
        migrations.RenameField(
            model_name='taskmodel',
            old_name='Output JSON',
            new_name='output',
        ),
        migrations.RenameField(
            model_name='taskmodel',
            old_name='t_send_data',
            new_name='send',
        ),
        migrations.RenameField(
            model_name='taskmodel',
            old_name='Short ID Name',
            new_name='sname',
        ),
        migrations.RenameField(
            model_name='taskmodel',
            old_name='Type',
            new_name='type',
        ),
    ]
