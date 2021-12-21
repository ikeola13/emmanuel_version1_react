import './Home.css'
import { Button, Row, Col, Container, Card } from 'react-bootstrap';

import { useHistory } from "react-router-dom";

function Home () {
  const history = useHistory();

  function handleYoutube() {
    history.push("/youtube");
  }

  function handleWeather() {
    history.push("/weather");
  }

  return (
    <div>
      <h1 className="title">Home</h1>

      <Container>
        <Row>
          <Col lg={4} xs={12}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://www.sketchappsources.com/resources/source-image/youtube-logo.png" />
              <Card.Body>
                <Card.Title>YouTube</Card.Title>
                <Card.Text>
                  Checkout Youtube's Api.
                </Card.Text>
                <Button variant="danger" onClick={handleYoutube}>Go To YouTube</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} xs={12}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://cdn.dribbble.com/users/915711/screenshots/5827243/weather_icon3.png" />
              <Card.Body>
                <Card.Title>Weather</Card.Title>
                <Card.Text>
                  Checkout Weather's Api.
                </Card.Text>
                <Button variant="secondary" onClick={handleWeather}>Go To Weather App</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

    </div>
  )
}

export default Home
