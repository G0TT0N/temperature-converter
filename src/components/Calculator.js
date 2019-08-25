import React from 'react';

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

function toCelsius(fahrenheit) { // перевод в цельсии
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) { // перевод в фаренгейты
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) { // функция конвертации с проверкой
    const input = parseFloat(temperature); // обрезка строки до десятичной дроби
    if (Number.isNaN(input)) { // пропустит только число
        return '';
    }
    const output = convert(input); // запуск функции конвертации
    const rounded = Math.round(output * 1000) / 1000; // округление
    return rounded.toString(); // приведение к строке
}

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value); // "1", "33.8"
    }

    render() {
        const temperature = this.props.temperature; // "1", "33.8"
        const scale = this.props.scale; // c, f
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature}
                       onChange={this.handleChange} />
            </fieldset>
        );
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperature: '', scale: 'c'};
    }

    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature}); // c "1"
    }

    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }

    render() {
        const scale = this.state.scale; // с
        const temperature = this.state.temperature; // "1"
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature; // "1"
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature; // "33.8"

        return (
            <div>
                <TemperatureInput
                    scale="c"
                    temperature={celsius} // "1"
                    onTemperatureChange={this.handleCelsiusChange} />
                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit} // "33.8"
                    onTemperatureChange={this.handleFahrenheitChange} />
                <BoilingVerdict
                    celsius={parseFloat(celsius)} /> {/* "1" */}
            </div>
        );
    }
}

export default Calculator