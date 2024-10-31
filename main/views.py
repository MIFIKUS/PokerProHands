from django.shortcuts import render
from django.http import HttpResponse

from main.database.get_deals import get_all_deals

import random

def home(request) -> HttpResponse:
    return HttpResponse('<h1>HUI</h1>')


def about(request) -> HttpResponse:
    return HttpResponse('<h4>PISYA</h4>')


def all_deals(request):
    answer = ''

#    all_deals_data = get_all_deals()
#
#    for i in all_deals_data:
#        if '' in i:
#            continue
#        tournament_id = i[0]
#        name = i[1].replace('_', ' ')
#        buy_in = i[2]
#        table_size = i[3]
#        speed = i[4]
#        tournament_type = i[5]
#        hands = i[6]
#        deal_info = f'''<tr>
#                            <td><img src="/static/img/select.svg" class="select_tournament">
#                            {buy_in}</td>
#                            <td>{name}</td>
#                            <td>{table_size}</td>
#                            <td>{hands}</td>
#                            <td>${random.randint(1, 15)}</td>
#                        </tr>'''
#        answer += deal_info
#
#    context = {'tournaments': answer}

    return render(request, "all_deals.html")


def get_deals(request):
    page = request.GET.get('page', 1)
    return HttpResponse(get_all_deals(page), content_type='application/json')