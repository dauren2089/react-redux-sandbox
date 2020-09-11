# Документация React Redux

## Введение в Redux

> Redux решает проблему управления состоянием в приложении

> Redux предлагает хранить state в одном "глобальном" объекте

> Функция Reducer обновляет глобальный state в ответ на Actions (действия)

> Объект Store координирует обновления

## Установка библиотеки Redux

1. Инициализируем Redux-sandbox через `create-react-app`
```sh
create-react-app redux-sandbox
```

> Для работы с Redux нам понадобяться две библиотеки Redux и React-Redux

2. Устанавливаем основные библиотек Redux и React-Redux

```sh
npm install redux react-redux
```

> React-redux - библиотека, которая упрощает интеграцию между React и Redux

3. После завершения установки, очищаем созданные папки и файлы в директории. Оставляем только index.js и index.html

4. Добавляем в index.html <link> со стилями Bootstrap.

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css" crossorigin="anonymous">


## Основы функции Reducer

> Reducer - это обычная функция: 
(state, action) => newState

> Если state - undefined, то нужно вернуть первоначальное (initial)state

> Если тип Action неизвестен - нужно вернуть state - без именения!

```js
// инициализация State;
//const initialState = 0;

// REDUX - это функция которая получает два значения,
// 1) первое значение это текущее состояние (STATE)
// 2) второе значени это действие (ACTION) которое необходимо совершить.

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
        default:
            return state;
    }
};

// Если STATE - undefined - то мы должны вернуть первоначальное состояние STATE
let state = reducer(undefined, {});


state = reducer(state, { type: 'INC'});
state = reducer(state, { type: 'INC'});

console.log(state);

```

## Redux Store

> Координирует работу с данными в Redux приложении

const store = createStore(reducer);

> для того чтобы получить текущее состояние, мы вызываем store.getState()

> для того чтобы обработать кокое-либо нове действие, мы вызываем store.dispatch()

 > для того чтобы получать обновления, мы вызываем store.subscribe()

```js
// импортируем createStore из redux
import { createStore } from  'redux';

const store = createStore(reducer);

// для того чтобы получать обновления, мы вызываем store.subscribe()
store.subscribe(() => {
// для того чтобы получить текущее состояние, мы вызываем store.getState()
    console.log(store.getState());
})
// для того чтобы обработать кокое-либо действие, мы вызываем store.dispatch()
store.dispatch({type: 'INC'});
```
## Чистые функции

> Функция-reducer должна быть чистой функцией:

1. Возвращаемое значение зависит только от заданных аргументов, а не от побочных.
Правильно:

> (a, b) => a > b ? a : b;

Не правильно:

> (a) => Math.random() * a


2. В теле функции нет побочных эффектов.

Не правильно:
> const render = (el) => {
	el.innetHTML = 'Hi'
}

```js
const store = createStore(reducer);

document
    .getElementById('inc')
    .addEventListener('click', () => {
        store.dispatch({ type: 'INC'});
    });

const update = () => {
    document
        .getElementById('counter')
        .innerHTML = store.getState();
};

store.subscribe(update);
````

## Действия с параметрами

>  Кроме типа, любое действие (action) может содержать дополнительную информацию:

store.dispatch({
	type: 'USER_LOGGED_IN',
	name: 'Arnold',
	role: 'admin'
});

> Часто доплнительные параметры передают в поле payload.

## Action creator

> Action Creator - функция которая создает объекты action. Упрощает код:

```js
const userLoggedIn = (name, role) => {
	return {type: 'USER_LOGGED_IN', name, role};
}

store.dispatch(userLoggedIn('Arnold', admin));
```

## bindActionCreators()

> bindActionCreators() - связывает функцию  action creator с функцией dispatch()

const {add, remove } = bindActionCreators(actions);

> Созданные таким способом функции делают сразу два действия - создание действия (action) и отправка в dispatch()


## React и Redux

> React должен "знать" когда нужно обновлять компоненты (store.subscribe сообщает о том, что state обновился)

> React компоненты должны быть как можно меньше связаны с Redux

## React-redux и функция Connect()

> React-redux упрощает интеграцию между React и redux

> Provider делает store доступныи всему дереву компонентов (через контекст)

> Connect() -  компонент высшего порядка, который передает значения из store в компонент

```js
const mapStateToProps = (state) => {
	return {name: state.name, age:state.age };
};

export default connect(mapStateToProps)(MyComponent);
```

## MapDispatchToProps()

> MapDispatchToProps() - второй аргумент для функции Connect():
```js
const mapDispatchToProps = (dispatch) => {
	return {
		inc: () => dispatch({ type: 'INC'});
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
```

> Созданные функции будут переданы в компонент. Таким способом компонент может обновить состояние в Store.

> Action Creator не обязательно должен быть чистой функцией

> Если второй аргумент connect() это объект:

```js
 connect(mapStateToProps, actions)(MyComponent);
```

> То результат будет таким же, как для кода

```js
connect(mapStateToProps, 
	(dispatch) => bindActionCreators(actions, dispatch))(MyComponent);


PS: This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
