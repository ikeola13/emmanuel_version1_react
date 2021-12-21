import './Weather.css'
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

import { Button, Row, Col, Container, Card, InputGroup, FormControl, Modal, Image } from 'react-bootstrap';

const KEY = '64496665a00347f79b6142640212112';

function Weather () {
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState([]);
  const [input, setInput] = useState('');
  const [nothing, setNothing] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory();

  function handleYoutube() {
    history.push("/youtube");
  }

  function handleHome() {
    history.push("/");
  }

  function viewDays(e) {
      handleShow();
  }

  function inputChanged(e) {
    setInput(e);
  }

  function getWeatherList() {
    axios({
      "method": 'GET', 
      "url": 'http://api.weatherapi.com/v1/forecast.json',
      "params":{
                    'key': KEY,
                    'q': input.target.value,
                    'days': 5
                }
      })
      .then(res => {
        setNothing(false);
        console.log(res.data);
        const loc = [res.data];
        setLocation(loc);
      })
  }

  function getWeatherListforecast() {
    axios({
      "method": 'GET', 
      "url": 'http://api.weatherapi.com/v1/forecast.json',
      "params":{
                    'key': KEY,
                    'q': input.target.value,
                    'days': 5
                }
      })
      .then(res => {
        // setNothing(false);
        console.log(res.data);
        // const loc = [res.data];
        // setLocation(loc);
      })
  }

  return (
    <div>
      <h1 className="title">Weather</h1>
      <h6 style={{ textAlign: 'center' }}> Check the weather in your Location </h6>

      <InputGroup className="mb-3 searchbar">
        <FormControl
          placeholder="Search Location"
          aria-label="Search Location"
          aria-describedby="basic-addon2"
          onChange={inputChanged}
        />
        <InputGroup.Text id="basic-addon2" className="searchBtn" onClick={getWeatherList}>Search</InputGroup.Text>
      </InputGroup>

      <Container style={{ marginTop: '50px' }}>
        <Row>
          {location.map((data,id)=>{
          return <div><Col lg={12} xs={12} key={id}>
                  <Card style={{ width: '100%' }} className="card">
                    <Card.Body>
                      <Card.Title>
                        <div>Today</div>
                        <div>Location: {data.location.region}, {data.location.country}</div>
                      </Card.Title>
                      <Card.Text>
                        <div><Image src={data.current.condition.icon} rounded /></div>
                        <div>Feels like: {data.current.feelslike_c}°C / {data.current.feelslike_f}°F </div>
                        <div>Humidity: {data.current.humidity} </div>
                        <div>Tempeature: {data.current.temp_c}C / {data.current.temp_f}F </div>
                        <div>UV: {data.current.uv}</div>
                        <div>Wind Degree: {data.current.wind_degree}</div>
                        <div>Wind Direction: {data.current.wind_dir}</div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Row>
                    {data.forecast.forecastday.map((data,id)=>{
                    return <Col lg={12} xs={12} key={id}>
                            <Row className="other-days-row ">
                              <Col className="spacer" lg={12} xs={12}><Image src={data.day.condition.icon} rounded /> Date: {data.date}</Col>
                              <Col className="spacer" lg={4} xs={12}>Average Humidity: {data.day.avghumidity} </Col>
                              <Col className="spacer" lg={4} xs={12}>Average Tempeature: {data.day.avgtemp_c}C / {data.day.avgtemp_f}F </Col>
                              <Col className="spacer" lg={4} xs={12}>Max Tempeature: {data.day.maxtemp_c}C / {data.day.maxtemp_f}F</Col>
                              <Col className="spacer" lg={4} xs={12}>Min Tempearature: {data.day.mintemp_c}C / {data.day.mintemp_f}F</Col>
                              <Col className="spacer" lg={4} xs={12}>Chance of Rain: {data.day.daily_chance_of_rain}</Col>
                              <Col className="spacer" lg={4} xs={12}>Chance of Snow: {data.day.daily_chance_of_snow}</Col>
                              <Col className="spacer" lg={4} xs={12}>Will it rain?: {data.day.daily_will_it_rain}</Col>
                              <Col className="spacer" lg={4} xs={12}>Will it snow?: {data.day.daily_will_it_snow}</Col>
                            </Row>
                          </Col>
                    })}
                  </Row>
                </Col>
                </div>
          })}
        </Row>
        { nothing ? 
        <div className="nothing">
        Nothing to see yet!
        </div> : null
        }

        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <iframe width="100%" height="450px" allow="fullscreen;"
            src={"https://www.youtube.com/embed/" + 'videoId' + "?autoplay=1"} >
            </iframe>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

      </Container>
    </div>
  )
}

export default Weather
