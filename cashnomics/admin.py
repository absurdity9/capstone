from django.contrib import admin
from .models import ExpensesForm, IncomeForm, SavingsInvestments, UserProfile
# Register your models here.
class ExpensesFormAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'cost_sh_bills', 'cost_travel', 'cost_groceries', 'cost_other','money_aftercosts')  # Customize the fields to display
    list_filter = ('user',)  # Add filters for the date_created field
    search_fields = ('user',)  # Enable search functionality for the expense_name field
    date_hierarchy = 'date_created'  # Add a date-based drill-down navigation

admin.site.register(ExpensesForm, ExpensesFormAdmin)

class IncomeFormAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'salary', 'income_after_tax', 'date_created')  # Customize the fields to display
    list_filter = ('user',)  # Add filters for the user field
    search_fields = ('user',)  # Enable search functionality for the user field
    date_hierarchy = 'date_created'  # Add a date-based drill-down navigation

admin.site.register(IncomeForm, IncomeFormAdmin)

class SavingsInvestmentsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'savings_amt', 'savings_rate', 'etf_amt', 'etf_rate', 'date_created')  # Customize the fields to display
    list_filter = ('user',)  # Add filters for the user field
    search_fields = ('user',)  # Enable search functionality for the user field
    date_hierarchy = 'date_created'  # Add a date-based drill-down navigation

admin.site.register(SavingsInvestments, SavingsInvestmentsAdmin)

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'username', 'age', 'industry')  # Customize the fields to display
    list_filter = ('industry',)  # Add a filter option for the industry field
    search_fields = ('username',)  # Enable search functionality for the username field

admin.site.register(UserProfile, UserProfileAdmin)