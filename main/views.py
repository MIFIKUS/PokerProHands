from django.shortcuts import render
from django.http import HttpResponse

from main.database.get_deals import get_all_deals

import random

def home(request) -> HttpResponse:
    return HttpResponse('<h1>HUI</h1>')


def about(request) -> HttpResponse:
    return HttpResponse('<h4>PISYA</h4>')


def all_deals(request):
    from django.shortcuts import render
    from .forms import DateForm, TypeForm, BuyInForm, TableSizeForm, SpeedForm

    form = DateForm()
    type_form = TypeForm()
    buy_in_form = BuyInForm()
    table_size_form = TableSizeForm()
    speed_form = SpeedForm()

    return render(request, 'all_deals.html', {'form': form, 'type_form': type_form,
                                                                  'buy_in_form': buy_in_form, 'table_size_form': table_size_form,
                                                                  'speed_form': speed_form})


def get_deals(request):
    page = request.GET.get('page', 1)
    start_date = request.GET.get('start_date', 1)
    end_date = request.GET.get('end_date', 1)
    tournament_type = request.GET.get('type', '')
    buy_in = request.GET.get('buy_in', '')
    table_size = request.GET.get('table_size', '')
    speed = request.GET.get('speed', '')

    return HttpResponse(get_all_deals(page, start_date, end_date, tournament_type, buy_in, table_size, speed), content_type='application/json')
