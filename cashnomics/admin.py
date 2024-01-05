from django.contrib import admin
from .models import ExpensesForm, IncomeForm, SavingsInvestments, UserProfile, FinancialModel
# Register your models here.

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('username', 'age', 'industry')  # Display these fields in the list view

class FinancialModelAdmin(admin.ModelAdmin):
    list_display = ('model_name', 'user', 'date_created')  # Display these fields in the list view

class IncomeFormAdmin(admin.ModelAdmin):
    list_display = ('financial_model', 'salary', 'income_after_tax')  # Display these fields in the list view

class ExpensesFormAdmin(admin.ModelAdmin):
    list_display = ('financial_model', 'cost_sh_bills', 'cost_travel', 'cost_groceries', 'cost_other', 'money_aftercosts')  # Display these fields in the list view

class SavingsInvestmentsAdmin(admin.ModelAdmin):
    list_display = ('financial_model', 'savings_amt', 'savings_rate', 'etf_amt', 'etf_rate')  # Display these fields in the list view

admin.site.register(UserProfile)
admin.site.register(FinancialModel)
admin.site.register(IncomeForm)
admin.site.register(ExpensesForm)
admin.site.register(SavingsInvestments)