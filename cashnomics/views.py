from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
import json
import simplejson
from decimal import Decimal
from .models import ExpensesForm, IncomeForm, SavingsInvestments, UserProfile, CustomUser, FinancialModel

# Create your views here.

from django.http import HttpResponse

def index(request):
    return render(request, "cashnomics/index.html", {
    })

def add(request):
    return render(request, "cashnomics/add.html", {
    })

@login_required
def dashboard(request):
    user = request.user
    financial_models = FinancialModel.objects.filter(user=user)
    financial_model_count = financial_models.count()

    data = {}
    for model in financial_models:
        income_forms = IncomeForm.objects.filter(financial_model=model).values()
        expenses_forms = ExpensesForm.objects.filter(financial_model=model).values()
        savings_investments = SavingsInvestments.objects.filter(financial_model=model).values()

        income_forms = [{k: float(v) if isinstance(v, Decimal) else v for k, v in form.items()} for form in income_forms]
        expenses_forms = [{k: float(v) if isinstance(v, Decimal) else v for k, v in form.items()} for form in expenses_forms]
        savings_investments = [{k: float(v) if isinstance(v, Decimal) else v for k, v in form.items()} for form in savings_investments]

        model_data = {
            'model_info': {
                'model_id': model.id,
                'model_name': model.model_name,
                'date_created': model.date_created.strftime('%Y-%m-%d %H:%M:%S')
            },
            'income_forms': income_forms,
            'expenses_forms': expenses_forms,
            'savings_investments': savings_investments
        }

        data[model.id] = model_data

    json_data = json.dumps(data)

    context = {
        'financial_model_count': financial_model_count,
        'financial_model_data': json_data
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

def update(request, financial_model_id):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user = request.user  # Assuming 'request.user' is a valid user instance
            
            # Retrieve the FinancialModel instance using the provided ID
            financial_model = get_object_or_404(FinancialModel, id=financial_model_id, user=user)

            # Update the model_name if it exists in the JSON data
            model_name = data.get('model_name')
            if model_name:
                financial_model.model_name = model_name
                financial_model.save()

            # Update the existing instances with the new data
            expenses_data = data.get('expenses')
            if expenses_data:
                expenses_dict = json.loads(expenses_data)
                ExpensesForm.objects.update_or_create(financial_model=financial_model, defaults=expenses_dict)

            income_data = data.get('income')
            if income_data:
                income_dict = json.loads(income_data)
                IncomeForm.objects.update_or_create(financial_model=financial_model, defaults=income_dict)

            profile_data = data.get('profile')
            if profile_data:
                profile_dict = json.loads(profile_data)
                UserProfile.objects.update_or_create(user=user, defaults=profile_dict)

            savings_data = data.get('savings')
            if savings_data:
                savings_dict = json.loads(savings_data)
                SavingsInvestments.objects.update_or_create(financial_model=financial_model, defaults=savings_dict)

            return HttpResponse(status=200)
        except json.JSONDecodeError:
            return HttpResponse(status=400)

    return HttpResponse(status=405)