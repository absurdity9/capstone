# Generated by Django 5.0 on 2023-12-12 13:57

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cashnomics', '0002_rename_name_userprofile_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='expensesform',
            name='cost_ent',
        ),
        migrations.AddField(
            model_name='chart',
            name='date_created',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='expensesform',
            name='date_created',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='incomeform',
            name='date_created',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='savingsinvestments',
            name='date_created',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='expensesform',
            name='version',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='incomeform',
            name='version',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='savingsinvestments',
            name='version',
            field=models.IntegerField(default=1),
        ),
    ]