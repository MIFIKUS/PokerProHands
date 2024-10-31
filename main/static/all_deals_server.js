let currentPage = 1;
const pageSize = 10; // Количество элементов на странице
const contentDiv = document.getElementById('content');
const url = '127.0.0.1';

// Флаг для отслеживания состояния загрузки
let isLoading = false;

// Функция для загрузки данных с сервера
async function loadData(page) {
    if (isLoading) return; // Если уже идет загрузка, выходим из функции
    isLoading = true; // Устанавливаем флаг загрузки

    try {
        const tournamentsTable = document.getElementById('content');

        const response = await fetch(`http://${url}:8000/api/deals?page=${page}`);
        const data = await response.json();

        console.log(typeof data);

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
                    <td>12</td>
                </tr>
            `;
        });

    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    } finally {
        isLoading = false; // Сбрасываем флаг загрузки после завершения
    }
}

// Обработчик события прокрутки
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        currentPage++;
        loadData(currentPage);
    }
});

// Начальная загрузка данных
loadData(currentPage);