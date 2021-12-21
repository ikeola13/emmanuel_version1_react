import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Youtube from './youtube/Youtube'
import Weather from './weather/Weather'
import Home from './home/Home'


import { Navbar, Nav, Button, Row, Col, Container, Card } from 'react-bootstrap';

function App () {
  return (
    <Router>
      <div>
      
        <Navbar bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="#home">React Project</Navbar.Brand> 
          <Nav className="me-auto justify-content-center">
            <Nav.Link><Link to='/' className="link">Home</Link></Nav.Link>
            <Nav.Link><Link to='/youtube' className="link">YouTube</Link></Nav.Link>
            <Nav.Link><Link to='/weather' className="link">Weather</Link></Nav.Link>
          </Nav>
          </Container>
        </Navbar>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path='/youtube'>
            <Youtube />
          </Route>
          <Route path="/weather">
            <Weather />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
