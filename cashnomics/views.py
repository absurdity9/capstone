from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
import json

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
            print(user_id)
            return HttpResponse(status=200)
        except json.JSONDecodeError:
            return HttpResponse(status=400)

    return HttpResponse(status=405)

def ranking(request):
    return render(request, "cashnomics/ranking.html", {
    })
