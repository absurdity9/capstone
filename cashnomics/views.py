from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
import json
from .models import ExpensesForm, IncomeForm, SavingsInvestments, UserProfile

# Create your views here.

from django.http import HttpResponse

def index(request):
    return render(request, "cashnomics/index.html", {
    })

@login_required
def dashboard(request):
    return render(request, "cashnomics/dashboard.html", {
    })

@csrf_exempt
def json_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            data_string = json.dumps(data)
            user_id = request.user
            print(data_string)  # Print the JSON data as a string in the terminal
            # Save data to respective tables
            expenses_data = data.get('expenses')
            expenses_dict = json.loads(expenses_data)
            income_data = data.get('income')
            income_dict = json.loads(income_data)
            profile_data = data.get('profile')
            profile_dict = json.loads(profile_data)  
            savings_data = data.get('savings')
            savings_dict = json.loads(savings_data) 
            if data:
                ExpensesForm.objects.create(user=user_id, **expenses_dict)
                IncomeForm.objects.create(user=user_id, **income_dict)
                UserProfile.objects.create(user=user_id, **profile_dict)
                SavingsInvestments.objects.create(user=user_id, **savings_dict)
            return HttpResponse(status=200)
        except json.JSONDecodeError:
            return HttpResponse(status=400)

    return HttpResponse(status=405)

def ranking(request):
    return render(request, "cashnomics/ranking.html", {
    })
