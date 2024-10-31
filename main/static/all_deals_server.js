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
            var name = tournament.name;
            var buy_in = tournament.buy_in;
            var hands = tournament.hands;

            tournamentsTable.innerHTML += `
                <tr>
                    <td>${buy_in}</td>
                    <td>${name}</td>
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