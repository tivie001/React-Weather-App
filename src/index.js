import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Form from "./Form";
import Weather from "./Weather";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Spinner from "react-bootstrap/Spinner";

function getDayOfWeek(date) {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let formattedDate = new Date(date);
    let indexDay = formattedDate.getDay();
    return daysOfWeek[indexDay];
}
function convertTemperature(tempFormat, tempValue) {
    if (tempFormat) {
        return ((tempValue * 1.8) + 32).toFixed(0);
    } else {
        return ((tempValue * 1.8) * .5556).toFixed(0);
    }
}
function getIcon(iconCode) {
    return `../icons/${iconCode}.png`;
}

function WeatherApp() {
    const [tempFormat, setValue] = useState(true);
    const [weather, setWeather] = useState([]);
    const [isLoaded, setLoader] = useState(true);

    const APIKey = 'e2a575ec713c4ea5bf02c43b2100d455';

    async function fetchData(el) {
        setLoader(isLoaded => false);
        el.preventDefault();
        const zip = el.target.elements.zip.value;
        const apiData = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?postal_code=${zip}&key=${APIKey}`)
            .then(res => res.json())
            .then(data => data);
        setWeather({
            data: apiData,
            cityName: apiData.city_name,
            countryName: apiData.country_code,
            stateName: apiData.state_code,
            dayDetails: apiData.data,
            tempFormat: tempFormat,
            error: apiData.error
        },
        ); setLoader(isLoaded => true);
    }
    function FahrenheitCelsiusToggle() {
        function toggleTemperature() {
            setValue(!tempFormat);
        }
        return (
            <ToggleButtonGroup type="checkbox" value={tempFormat} onChange={toggleTemperature}>
                <ToggleButton variant="outline-primary" value={true} >F°</ToggleButton>
                <ToggleButton variant="outline-primary" value={false}>C°</ToggleButton>
            </ToggleButtonGroup>
        );
    }
    function loadSpinner(){
        const divStyle = {
            width: '5rem',
            height: '5rem',
        };
        return <Spinner animation="border" variant="info" style={divStyle}/>
    }
    return (
        <Container fluid={true} className="container-style">
            <Row>
                <Col className="d-flex justify-content-center mt-4">
                    <h1 className="header font-weight-light">Weather App</h1>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center mt-3 mb-4">
                    <FahrenheitCelsiusToggle />
                </Col>
            </Row>

            <Row>
                <Col className="d-flex justify-content-center mb-1" md={{ span: 2, offset: 5 }}>
                    <Form getWeather={fetchData} />
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center text-center mb-3">
                    {isLoaded ? <Weather
                            city={weather.cityName}
                            country={weather.countryName}
                            state={weather.stateName}
                            dayDetails={weather.dayDetails}
                            tempFormat={tempFormat}
                            error={weather.error}/>
                            :
                            loadSpinner()
                    }
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-lg-around">

                    {weather.dayDetails && (weather.dayDetails.slice(0, 7).map(day =>
                        <Card className="d-flex text-center" style={{ width: '12rem' }}>
                            {
                                isLoaded && <Card.Body>
                                    <Card.Title>{getDayOfWeek(day.datetime)}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{day.datetime}</Card.Subtitle>
                                    <img src={getIcon(day.weather.icon)} alt={day.weather.description}/>
                                    <Card.Text>{day.weather.description}</Card.Text>
                                    <Card.Text>
                                        <span className="font-weight-bold mr-1">{convertTemperature(tempFormat, day.high_temp)}°</span>
                                        <span className="text-muted ml-1">{convertTemperature(tempFormat, day.low_temp)}°</span>
                                    </Card.Text>
                                </Card.Body>
                            }
                        </Card>
                        )
                    )}
                </Col>
            </Row>
        </Container>
    );
}

ReactDOM.render(<WeatherApp/>, document.getElementById('root'));
