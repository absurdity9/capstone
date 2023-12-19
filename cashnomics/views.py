from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
import json
from .models import ExpensesForm, IncomeForm, SavingsInvestments, UserProfile, CustomUser, FinancialModel

# Create your views here.

from django.http import HttpResponse

def index(request):
    return render(request, "cashnomics/index.html", {
    })

@login_required
def dashboard(request):
    user = request.user
    financial_models = FinancialModel.objects.filter(user=user)
    financial_model_count = FinancialModel.objects.filter(user=user).count()

    income_forms = IncomeForm.objects.filter(financial_model__in=financial_models)
    expenses_forms = ExpensesForm.objects.filter(financial_model__in=financial_models)
    savings_investments = SavingsInvestments.objects.filter(financial_model__in=financial_models)

    context = {
        'financial_model_count': financial_model_count,
        'income_forms': income_forms,
        'expenses_forms': expenses_forms,
        'savings_investments': savings_investments
        }
    return render(request, "cashnomics/dashboard.html", context)

@csrf_exempt
def json_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            data_string = json.dumps(data)
            user = request.user  # Assuming 'request.user' is a valid user instance
            financial_model = FinancialModel.objects.create(user=user)
            print(data_string)  # Print the JSON data as a string in the terminal

            expenses_data = data.get('expenses')
            expenses_dict = json.loads(expenses_data)
            income_data = data.get('income')
            income_dict = json.loads(income_data)
            profile_data = data.get('profile')
            profile_dict = json.loads(profile_data)
            savings_data = data.get('savings')
            savings_dict = json.loads(savings_data)

            if data:
                IncomeForm.objects.create(financial_model=financial_model, **income_dict)
                ExpensesForm.objects.create(financial_model=financial_model, **expenses_dict)
                SavingsInvestments.objects.create(financial_model=financial_model, **savings_dict)
                UserProfile.objects.create(user=user, **profile_dict)
                # UserProfile.objects.create(user=user, **profile_dict)  # Assuming UserProfile is a separate model

            return HttpResponse(status=200)
        except json.JSONDecodeError:
            return HttpResponse(status=400)

    return HttpResponse(status=405)

def ranking(request):
    return render(request, "cashnomics/ranking.html", {
    })
