import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

//Renderiza somente ao carregar o pai pela primeira vez
const Button = React.memo(function Button({ incrementButton }) {
	return <button onClick={() => incrementButton(10)}>+10</button>;
});
Button.propTypes = {
	incrementButton: PropTypes.func,
};
function App() {
	const [reverse, setReverse] = useState(false);
	const [counter, setCounter] = useState(0);
	const reverseClass = reverse ? 'Reverse' : '';
	const handleClick = () => {
		setReverse(!reverse);
	};
	const handleIncrement = () => {
		setCounter((counter) => counter + 1);
	};
	const incrementCounter = useCallback((num) => {
		setCounter((counter) => counter + num);
	}, []);

	//Executa toda vez que o componete atualiza
	//componentDidUpdate
	useEffect(() => {
		console.log('componentDidUpdate');
	});
	//Executa somente 1X
	//componentDidMount
	useEffect(() => {
		console.log('componentDidMount');
	}, []);
	//Executa somente 1X
	//componentDidMount
	useEffect(() => {
		document.querySelector('h4')?.addEventListener('click', eventFn);
		//limpa o componete de eventos
		return () => {
			document.querySelector('h4')?.removeEventListener('click', eventFn);
		};
	}, []);
	//Executa toda vez que a dependencia mude
	//componentDidMount
	useEffect(() => {
		console.log('Contador mudou para', counter);
	}, [counter]);

	function eventFn() {
		console.log('h4 Clicado');
	}
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className={`App-logo ${reverseClass}`} alt="logo" />
				<h4>Counter {counter}</h4>
				<p>
					<button type="button" onClick={handleClick}>
						<code>{'<-->'}</code>
					</button>

					<button type="button" onClick={handleIncrement}>
						<code>{'+'}</code>
					</button>
					<Button incrementButton={incrementCounter} />
				</p>
			</header>
		</div>
	);
}
export default App;
