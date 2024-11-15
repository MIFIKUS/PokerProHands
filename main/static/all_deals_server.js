let currentPage = 1;
const pageSize = 10; // Количество элементов на странице
const contentDiv = document.getElementById('content');
const url = '127.0.0.1';


var start_date_value = '';
var end_date_value = '';

var type_value = [];
var buy_in_value = [];
var table_size_value = [];
var speed_value = [];


const filters_url = '';

const loaded_deals = [];

// Флаг для отслеживания состояния загрузки
let isLoading = false;

function checkBuyPanelVisibility(){
    const buy_panel = document.getElementById('buy_panel');
    const selected_deals = parseFloat(document.getElementById('amount_of_selected_deals').textContent);

    console.log(selected_deals);
    if (buy_panel.style.display == 'none'){
        buy_panel.style.display = '';
    }

    if (selected_deals == 0){
        console.log(buy_panel);
        buy_panel.style.display = 'none';
    }
}

function countSelectedDeals() {
    const selectedCount = document.querySelectorAll('.selected').length;

    const amountElement = document.getElementById('amount_of_selected_deals');
    amountElement.textContent = `${selectedCount}`;
}

function countSelectedHands(){
    const selectedRows = document.querySelectorAll('tr.selected');
    let sum = 0;

    // Проходим по каждой выбранной строке
    selectedRows.forEach(row => {
        // Получаем предпоследний td
        const cells = row.getElementsByTagName('td');
        if (cells.length >= 2) { // Убедимся, что есть достаточно ячеек
            const value = parseFloat(cells[cells.length - 2].textContent);
            if (!isNaN(value)) {
                sum += value; // Суммируем значения
            }
        }
    });

    // Обновляем текст в элементе с ID 'amount_of_hands'
    const amountElement = document.getElementById('amount_of_hands');
    sum = sum.toLocaleString('ru-RU');
    amountElement.textContent = `${sum}`;
}


function countSelectedCost(){
    const selectedRows = document.querySelectorAll('tr.selected');
    let sum = 0;

    // Проходим по каждой выбранной строке
    selectedRows.forEach(row => {
        // Получаем предпоследний td
        const cells = row.getElementsByTagName('td');
        if (cells.length >= 2) { // Убедимся, что есть достаточно ячеек
            const value = parseFloat(cells[cells.length - 1].textContent.replace('$', ''));
            console.log(value);
            if (!isNaN(value)) {
                sum += value; // Суммируем значения
            }
        }
    });

    // Обновляем текст в элементе с ID 'amount_of_hands'
    const amountElement = document.getElementById('cost_amount');
    sum = sum.toLocaleString('ru-RU');
    console.log(sum);
    amountElement.textContent = `$${sum}`;
}


// Функция для загрузки данных с сервера
async function loadData(page) {

    console.log(page);
    console.log(start_date_value);
    console.log(end_date_value);
    if (isLoading) return; // Если уже идет загрузка, выходим из функции
    isLoading = true; // Устанавливаем флаг загрузки

    try {
        const tournamentsTable = document.getElementById('content');

        type_value_for_request = type_value.join(',');
        buy_in_value_for_request = buy_in_value.join(',');
        table_size_value_for_request = table_size_value.join(',');
        speed_value_for_request = speed_value.join(',');

        console.log(type_value);
        console.log(type_value_for_request);

        const response = await fetch(`http://${url}:8000/api/deals?page=${page}&start_date=${start_date_value}&end_date=${end_date_value}&type=${type_value_for_request}&buy_in=${buy_in_value_for_request}&table_size=${table_size_value_for_request}&speed=${speed_value_for_request}`);
        const data = await response.json();



        Object.entries(data).forEach(([id, tournament]) => {
            var buy_in = tournament.buy_in;
            var name = tournament.name;
            var table_size = tournament.table_size;
            var speed = tournament.speed;
            var tournament_type = tournament.tournament_type;
            var hands = tournament.hands;

            var table_size_img_name = table_size + 'max.svg';
            var speed_img_name;
            var tournament_type_img_name;

            switch (speed){
                case 'SLOW':
                    speed_img_name = 'slow.svg';
                    break;
                case 'REG':
                    speed_img_name = 'regular.svg';
                    break;
                case 'TURBO':
                    speed_img_name = 'turbo.svg';
                    break;
                case 'HYPER':
                    speed_img_name = 'hyper_turbo.svg';
                    break;
            }

            switch (tournament_type){
                case 'KO':
                    tournament_type_img_name = 'knockout.svg';
                    break;
                case 'FREEZE':
                    tournament_type_img_name = 'freezeout.svg';
                    break;
                case 'MYSTERY':
                    tournament_type_img_name = 'mystery.svg';
                    break;
            }

            tournamentsTable.innerHTML += `
                <tr>
                    <td class='buy_in_select'><img src="/static/img/select.svg">${buy_in}</td>
                    <td>${name}</td>
                    <td>
                        <div class='tournament_info_details'>
                            <img src="/static/img/${tournament_type_img_name}"><img src="/static/img/${speed_img_name}"><img src="/static/img/${table_size_img_name}">
                        </div>
                    </td>
                    <td>${hands}</td>
                    <td>$12</td>
                </tr>
            `;
        });
    isLoading = false;
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        isLoading = true;
    }

    const rows = document.querySelectorAll('tr');

    countSelectedDeals();
    countSelectedHands();
    countSelectedCost();
    checkBuyPanelVisibility();
// Добавляем обработчик события для каждого tr
    rows.forEach(row => {
        if (loaded_deals.includes(row)){
            return;
        }
        else{
            loaded_deals.push(row);
        }
        row.addEventListener('click', function() {

            if (this.classList.contains('selected')){
                this.classList.remove('selected');

                const select_img = this.querySelector('td').querySelector('img');
                select_img.src = '/static/img/select.svg'

                countSelectedDeals();
                countSelectedHands();
                countSelectedCost();
                checkBuyPanelVisibility();
            } else{
                this.classList.add('selected');
                console.log(this.classList);
                const select_img = this.querySelector('td').querySelector('img');
                select_img.src = '/static/img/selected.svg'

                countSelectedDeals();
                countSelectedHands();
                countSelectedCost();
                checkBuyPanelVisibility();
          }
        });
    });



}

// Обработчик события прокрутки
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {

        console.log(currentPage);
        currentPage++;
        loadData(currentPage);
    }
});

window.onload = function() {
    const startDate = document.getElementById('start_date');
    start_date_value = startDate.value;

    const endDate = document.getElementById('end_date');
    end_date_value = endDate.value;

    startDate.addEventListener('change', () => {
    currentPage = 1;

    start_date_value = startDate.value;

    const tournamentsTable = document.getElementById('content');
    tournamentsTable.innerHTML = '';
    loadData(currentPage);


    });

    endDate.addEventListener('change', () => {
        currentPage = 1;
        end_date_value = endDate.value;

        const tournamentsTable = document.getElementById('content');
        tournamentsTable.innerHTML = '';
        loadData(currentPage);


    });

    loadData(currentPage);

};

function HandleTypeValue() {
    const TypeCheckboxes = document.querySelectorAll('input[class="filters_checkbox"]');
    const typeContent = document.getElementById('myDropdown');
    const tournamentsTable = document.getElementById('content');
    type_value = [];

    if (!typeContent.classList.contains('show')){
       TypeCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                window.type_value.push(checkbox.value);
                console.log(type_value);
            }
        });
       currentPage = 1;
       tournamentsTable.innerHTML = '';
       loadData(currentPage);
    }

};


function HandleBuyInValue() {
    const BuyInCheckboxes = document.querySelectorAll('input[class="buy_in_checkbox"]');
    const buyInContent = document.getElementById('buy_in_dropdown');
    const tournamentsTable = document.getElementById('content');
    buy_in_value = [];

    if (!buyInContent.classList.contains('show')){
       BuyInCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                window.buy_in_value.push(checkbox.value);
                console.log(type_value);
            }
        });
       currentPage = 1;
       tournamentsTable.innerHTML = '';
       loadData(currentPage);
    }

};


function HandleTableSizeValue() {
    const TableSizeCheckboxes = document.querySelectorAll('input[class="table_size_checkbox"]');
    const TableSizeContent = document.getElementById('table_size_dropdown');
    const tournamentsTable = document.getElementById('content');
    table_size_value = [];

    if (!TableSizeContent.classList.contains('show')){
       TableSizeCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                window.table_size_value.push(checkbox.value);
                console.log(type_value);
            }
        });
       currentPage = 1;
       tournamentsTable.innerHTML = '';
       loadData(currentPage);
    }

};


function HandleSpeedValue() {
    const SpeedCheckboxes = document.querySelectorAll('input[class="speed_checkbox"]');
    const SpeedContent = document.getElementById('speed_dropdown');
    const tournamentsTable = document.getElementById('content');
    speed_value = [];

    if (!SpeedContent.classList.contains('show')){
       SpeedCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                window.speed_value.push(checkbox.value);
                console.log(type_value);
            }
        });
       currentPage = 1;
       tournamentsTable.innerHTML = '';
       loadData(currentPage);
    }

};

