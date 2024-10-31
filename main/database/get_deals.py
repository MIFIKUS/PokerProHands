from django.http import HttpResponse

from . import MAX_AMOUNT_OF_DEALS_TO_RETURN, DB_DEALS_IP, DB_DEALS_PASSWORD, DB_DEALS_USER
import mysql.connector


def get_all_deals(page):
    _connection = mysql.connector.connect(host=DB_DEALS_IP, user=DB_DEALS_USER, password=DB_DEALS_PASSWORD)
    _connection.autocommit = True
    cursor = _connection.cursor()

    query = f"""SELECT tournament_id, name, total_buy_in, table_size, speed, tournament_type, hands FROM poker.archives LIMIT 50 OFFSET {int(page)*50};
    """
    print(query)
    cursor.execute(query)
    result = cursor.fetchall()

    return result
