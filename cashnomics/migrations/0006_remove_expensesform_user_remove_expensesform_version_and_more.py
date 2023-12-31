# Generated by Django 5.0 on 2023-12-19 15:46

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cashnomics', '0005_alter_expensesform_version_alter_incomeform_version_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='expensesform',
            name='user',
        ),
        migrations.RemoveField(
            model_name='expensesform',
            name='version',
        ),
        migrations.RemoveField(
            model_name='incomeform',
            name='user',
        ),
        migrations.RemoveField(
            model_name='incomeform',
            name='version',
        ),
        migrations.RemoveField(
            model_name='savingsinvestments',
            name='user',
        ),
        migrations.RemoveField(
            model_name='savingsinvestments',
            name='version',
        ),
        migrations.CreateModel(
            name='FinancialModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('model_name', models.CharField(default='Default Model Name', max_length=200)),
                ('date_created', models.DateTimeField(default=django.utils.timezone.now)),
                ('user', models.ForeignKey(default='Default Model Name', on_delete=django.db.models.deletion.CASCADE, related_name='financial_model', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='expensesform',
            name='financial_model',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='expenses', to='cashnomics.financialmodel'),
        ),
        migrations.AddField(
            model_name='incomeform',
            name='financial_model',
            field=models.ForeignKey( on_delete=django.db.models.deletion.CASCADE, related_name='incomes', to='cashnomics.financialmodel'),
        ),
        migrations.AddField(
            model_name='savingsinvestments',
            name='financial_model',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='savings', to='cashnomics.financialmodel'),
        ),
        migrations.DeleteModel(
            name='Chart',
        ),
    ]
