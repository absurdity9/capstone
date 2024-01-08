from django.contrib import admin
from .models import ExpensesForm, IncomeForm, SavingsInvestments, UserProfile, FinancialModel

@admin.register(FinancialModel)
class FinancialModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'model_name', 'date_created')


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'username', 'age', 'industry')

@admin.register(IncomeForm)
class IncomeFormAdmin(admin.ModelAdmin):
    list_display = ('id', 'financial_model', 'salary', 'income_after_tax')

@admin.register(ExpensesForm)
class ExpensesFormAdmin(admin.ModelAdmin):
    list_display = ('id', 'financial_model', 'cost_sh_bills', 'cost_travel', 'cost_groceries', 'cost_other', 'money_aftercosts')

@admin.register(SavingsInvestments)
class SavingsInvestmentsAdmin(admin.ModelAdmin):
    list_display = ('id', 'financial_model', 'savings_amt', 'savings_rate', 'etf_amt', 'etf_rate')