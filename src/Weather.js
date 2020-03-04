import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faThermometerThreeQuarters } from '@fortawesome/free-solid-svg-icons'
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import {Alert} from "react-bootstrap";

function convertTemperature(tempFormat, tempValue) {
    if (tempFormat) {
        return ((tempValue * 1.8) + 32).toFixed(0);
    } else {
        return ((tempValue * 1.8) * .5556).toFixed(0);
    }
}
const CurrWeather = ({city, state, country, dayDetails, tempFormat, error}) => {
    return (
        <div>
            <h5 className="font-weight-light">Current Location<FontAwesomeIcon className="ml-3" icon={faMapMarkerAlt} size="lg" /></h5>
            {city && state && country && <h2 className="pb-3">{city}, {state} ({country})</h2>}
            <h5 className="font-weight-light">
                Current Temp {tempFormat ? 'F°': 'C°'}<FontAwesomeIcon className="ml-3" icon={faThermometerThreeQuarters} size="lg" />
            </h5>
            {dayDetails && (dayDetails.slice(0, 1).map(day => <h2>{convertTemperature(tempFormat, day.temp)}°</h2>))}
            {error && <Alert variant="danger">
                <Alert.Heading>Error! Invalid Zip Code entered...please try again!</Alert.Heading>
            </Alert>}
        </div>
    )
};

export default CurrWeather;