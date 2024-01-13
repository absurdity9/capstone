from django.test import TestCase, RequestFactory
from django.contrib.auth.models import User
from accounts.models import CustomUser
from .models import ExpensesForm, IncomeForm, SavingsInvestments, UserProfile, FinancialModel
from .views import json_api

class JsonApiTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.user = CustomUser.objects.create_user(username='testuser', password='testpassword')

    def test_post_request_creates_objects(self):
        data = {
            'expenses': '{"cost_sh_bills": 100, "cost_travel": 50, "cost_groceries": 200, "cost_other": 75, "money_aftercosts": 1000}',
            'income': '{"salary": 10000, "income_after_tax": 8000}',
            'profile': '{"username": "Test User", "age": 25, "industry": "Technology"}',
            'savings': '{"savings_amt": 5000, "savings_rate": 10, "etf_amt": 2000, "etf_rate": 5}',
            'model': '{"name": "Test Model"}',
        }
        request = self.factory.post('/api/json/', data=data, content_type='application/json')
        request.user = self.user
        response = json_api(request)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(FinancialModel.objects.filter(user=self.user).exists())
        self.assertTrue(IncomeForm.objects.filter(financial_model__user=self.user).exists())
        self.assertTrue(ExpensesForm.objects.filter(financial_model__user=self.user).exists())
        self.assertTrue(SavingsInvestments.objects.filter(financial_model__user=self.user).exists())
        self.assertTrue(UserProfile.objects.filter(user=self.user).exists())
        financial_model = FinancialModel.objects.get(user=self.user)
        self.assertEqual(financial_model.model_name, 'Test Model')

    def test_post_request_invalid_json(self):
        data = {
            'expenses': '{"expense_field": "expense_value"}',
            'income': 'Invalid JSON',  # Invalid JSON data
            'profile': '{"profile_field": "profile_value"}',
            'savings': '{"savings_field": "savings_value"}',
            'model': '{"name": "Test Model"}',
        }
        request = self.factory.post('/api/json/', data=data, content_type='application/json')
        request.user = self.user

        response = json_api(request)

        self.assertEqual(response.status_code, 400)
        self.assertTrue(FinancialModel.objects.filter(user=self.user).exists())
        self.assertFalse(IncomeForm.objects.filter(financial_model__user=self.user).exists())
        self.assertFalse(ExpensesForm.objects.filter(financial_model__user=self.user).exists())
        self.assertFalse(SavingsInvestments.objects.filter(financial_model__user=self.user).exists())
        self.assertFalse(UserProfile.objects.filter(user=self.user).exists())

    def test_get_request_returns_405(self):
        request = self.factory.get('/api/json/')
        request.user = self.user

        response = json_api(request)

        self.assertEqual(response.status_code, 405)