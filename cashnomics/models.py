from django.db import models
from django.contrib import admin
from accounts.models import CustomUser
from django.utils import timezone

class UserProfile(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    INDUSTRY_CHOICES = [
    ('Agriculture', 'Agriculture'),
    ('Apparel', 'Apparel'),
    ('Automotive', 'Automotive'),
    ('Banking', 'Banking'),
    ('Biotechnology', 'Biotechnology'),
    ('Chemicals', 'Chemicals'),
    ('Construction', 'Construction'),
    ('Consulting', 'Consulting'),
    ('Consumer Goods', 'Consumer Goods'),
    ('Education', 'Education'),
    ('Electronics', 'Electronics'),
    ('Energy', 'Energy'),
    ('Engineering', 'Engineering'),
    ('Entertainment', 'Entertainment'),
    ('Environmental', 'Environmental'),
    ('Finance', 'Finance'),
    ('Food and Beverage', 'Food and Beverage'),
    ('Government', 'Government'),
    ('Healthcare', 'Healthcare'),
    ('Hospitality', 'Hospitality'),
    ('Insurance', 'Insurance'),
    ('Machinery', 'Machinery'),
    ('Manufacturing', 'Manufacturing'),
    ('Media', 'Media'),
    ('Non-profit', 'Non-profit'),
    ('Pharmaceuticals', 'Pharmaceuticals'),
    ('Real Estate', 'Real Estate'),
    ('Retail', 'Retail'),
    ('Sports', 'Sports'),
    ('Technology', 'Technology'),
    ('Telecommunications', 'Telecommunications'),
    ('Transportation', 'Transportation'),
    ('Utilities', 'Utilities'),
    ('Other', 'Other'),
    ]
    username = models.CharField(max_length=255)
    age = models.IntegerField()
    industry = models.CharField(max_length=255, choices=INDUSTRY_CHOICES)
    
    def __str__(self):
        return self.username

# FinancialModel Model
class FinancialModel(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='financial_model')
    model_name = models.CharField(max_length=200, default='Default Model Name')
    date_created = models.DateTimeField(default=timezone.now)    
    def __str__(self):
        return self.model_name

# IncomeForm Model
class IncomeForm(models.Model):
    financial_model = models.ForeignKey(FinancialModel, on_delete=models.CASCADE, related_name='incomes')
    salary = models.FloatField()
    income_after_tax = models.FloatField()

    def __str__(self):
        return f"Income Form for {self.financial_model.user.username}"

# ExpensesForm Model
class ExpensesForm(models.Model):
    financial_model = models.ForeignKey(FinancialModel, on_delete=models.CASCADE, related_name='expenses')
    cost_sh_bills = models.FloatField()
    cost_travel = models.FloatField()
    cost_groceries = models.FloatField()
    cost_other = models.FloatField()
    money_aftercosts = models.FloatField()

    def __str__(self):
        return f"Expenses Form for {self.financial_model.user.username}"

# SavingsInvestments Model
class SavingsInvestments(models.Model):
    financial_model = models.ForeignKey(FinancialModel, on_delete=models.CASCADE, related_name='savings')
    savings_amt = models.FloatField()
    savings_rate = models.FloatField()
    etf_amt = models.FloatField()
    etf_rate = models.FloatField()
    
    def __str__(self):
        return f"Savings and Investments Form for {self.financial_model.user.username}"