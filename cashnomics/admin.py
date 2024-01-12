from django.contrib import admin
from .models import ExpensesForm, IncomeForm, SavingsInvestments, UserProfile, FinancialModel

@admin.register(FinancialModel)
class FinancialModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'model_name', 'date_created')
    list_editable = ('user', 'model_name')  # Add editable fields here


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'username', 'age', 'industry')
    list_editable = ('username', 'age', 'industry')  # Add editable fields here


@admin.register(IncomeForm)
class IncomeFormAdmin(admin.ModelAdmin):
    list_display = ('id', 'financial_model', 'salary', 'income_after_tax')
    list_editable = ('salary', 'income_after_tax')  # Add editable fields here


@admin.register(ExpensesForm)
class ExpensesFormAdmin(admin.ModelAdmin):
    list_display = ('id', 'financial_model', 'cost_sh_bills', 'cost_travel', 'cost_groceries', 'cost_other', 'money_aftercosts')
    list_editable = ('cost_sh_bills', 'cost_travel', 'cost_groceries', 'cost_other', 'money_aftercosts')  # Add editable fields here


@admin.register(SavingsInvestments)
class SavingsInvestmentsAdmin(admin.ModelAdmin):
    list_display = ('id', 'financial_model', 'savings_amt', 'savings_rate', 'etf_amt', 'etf_rate')
    list_editable = ('savings_amt', 'savings_rate', 'etf_amt', 'etf_rate')  # Add editable fields here
