# Generated by Django 5.0 on 2023-12-19 20:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cashnomics', '0009_alter_expensesform_financial_model_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='expensesform',
            name='date_created',
        ),
        migrations.RemoveField(
            model_name='incomeform',
            name='date_created',
        ),
        migrations.RemoveField(
            model_name='savingsinvestments',
            name='date_created',
        ),
    ]
