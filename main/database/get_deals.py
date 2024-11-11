from django.http import HttpResponse

from . import MAX_AMOUNT_OF_DEALS_TO_RETURN, DB_DEALS_IP, DB_DEALS_PASSWORD, DB_DEALS_USER

import mysql.connector

import json


def get_all_deals(page, start_date, end_date, tournament_type, buy_in, table_size, speed):
    _connection = mysql.connector.connect(host=DB_DEALS_IP, user=DB_DEALS_USER, password=DB_DEALS_PASSWORD)
    _connection.autocommit = True
    cursor = _connection.cursor()

    tournament_types = []
    buy_in_list = []
    table_size_list = []
    speed_list = []

    if tournament_type:
        if len(tournament_type) > 1:
            tournament_type = tournament_type.split(',')
        for i in tournament_type:
            i = i.lower().strip()
            print(i)
            match i:
                case 'freezeout':
                    tournament_types.append("'FREEZE'")
                    continue
                case 'knockout':
                    tournament_types.append("'KO'")
                    continue
                case 'mystery':
                    tournament_types.append("'MYSTERY'")
                    continue

    else:
        tournament_types = ["'FREEZE'", "'KO'", "'MYSTERY'"]

    if buy_in:
        if len(buy_in) > 1:
            buy_in = buy_in.split(',')

        for i in buy_in:
            buy_in_list.append(f"'{i}'")
        buy_in = ', '.join(buy_in_list)
    else:
        buy_in = ', '.join(["'$33'", "'$44'", "'$55'", "'$82'", "'$109'", "'$162'", "'$215'", "'$320'", "'$530'", "'$1050'", "'$2100'", "'$5200'", "'$10300'", "'$25000'"])

    if table_size:
        if len(table_size) > 1:
            table_size = table_size.split(',')

        for i in table_size:
            i = str(i).replace('-max', '')
            table_size_list.append(i)
        table_size = ', '.join(table_size_list)

    else:
        table_size_list = ['5', '6', '7', '8', '9']
        table_size = ', '.join(table_size_list)

    if speed:
        if len(speed) > 1:
            speed = speed.split(',')
        for i in speed:
            i = i.lower().strip()
            match i:
                case 'slow':
                    speed_list.append("'SLOW'")
                    continue
                case 'regular':
                    speed_list.append("'REG'")
                    continue
                case 'turbo':
                    speed_list.append("'TURBO'")
                    continue
                case 'hyper-turbo':
                    speed_list.append("'HYPER'")
        speed = ','.join(speed_list)
    else:
        speed = ','.join(["'SLOW'", "'REG'", "'TURBO'", "'HYPER'"])


    tournament_names_query = f"""SELECT DISTINCT name FROM poker.archives WHERE modify_date BETWEEN '{start_date}' AND '{end_date}' 
    AND tournament_type IN({', '.join(tournament_types)}) AND total_buy_in IN ({buy_in}) AND table_size IN ({table_size}) AND   
    speed IN ({speed}) LIMIT 50 OFFSET {(int(page) - 1)*50};"""
    print(tournament_names_query)

    cursor.execute(tournament_names_query)

    tournament_names_answer = cursor.fetchall()

    tournament_names = []

    for j in tournament_names_answer:
        tournament_names.append(f"'{j[0]}'")

    if not tournament_names:
        return {}

    query = f"""SELECT tournament_id, name, total_buy_in, table_size, speed, tournament_type, hands FROM poker.archives WHERE table_size != 0 AND name IN ({','.join(tournament_names)}) 
    AND modify_date BETWEEN '{start_date}' AND '{end_date}' AND tournament_type IN({', '.join(tournament_types)}) AND total_buy_in IN ({buy_in}) AND table_size IN ({table_size}) AND  
    speed IN ({speed});
    """
    print(query)
    cursor.execute(query)
    result = cursor.fetchall()

    answer = {}

    for tournament_name in tournament_names:
        for i in result:
            if tournament_name.replace("'", '') in i:
                buy_in = i[2]
                table_size = i[3]
                speed = i[4]
                tournament_type = i[5]
                hands = i[6]
                if answer.get(tournament_name):
                    tournament_name = tournament_name.replace('_', ' ')
                    try:
                        answer[tournament_name]['hands'] += hands
                    except: pass
                else:
                    tournament_name = tournament_name.replace('_', ' ')
                    answer[tournament_name] = {'name': tournament_name.replace("'", ''), 'buy_in': buy_in, 'table_size': table_size, 'speed': speed,
                                              'tournament_type': tournament_type, 'hands': hands}


    return json.dumps(answer)
