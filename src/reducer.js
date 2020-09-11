// REDUX - это функция которая получает два значения,
// 1) первое значение это текущее состояние (STATE)
// 2) второе значени это действие (ACTION) которое необходимо совершить.
// Если STATE - undefined - то мы должны вернуть первоначальное состояние STATE
const reducer = (state = 0, action) => {

    // проверка состояния. если функция reducer еще не имеет State.  возвращаем 0
    // if (state === undefined) {
    //     return 0
    // }
    // Проверка Действия, если INC то увеличиваем значение +1
    // if (action.type === 'INC') {
    //     return state + 1;
    // }
    // return 0;

    //Action - это обычный объект у которого есть тип - TYPE
    // мы можем проверить тип, и в зависимости от типа
    // выполнить некоторое действие.
    // Если мы получили тип Aсtion, которого мы не знаем, то не трогаем STATE
    switch (action.type) {
        case 'INC':
            return state + 1;
        case 'DEC':
            return state - 1;
        case 'RND':
            return state + action.payload;
        default:
            return state;
    }
};

export default reducer;