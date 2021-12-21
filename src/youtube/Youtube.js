import './Youtube.css'
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

import { Button, Row, Col, Container, Card, InputGroup, FormControl, Modal } from 'react-bootstrap';
const KEY = 'AIzaSyDwVexVfltDIbBYA62LzuCvuSSe1SDHL20';

function Youtube () {
  const [show, setShow] = useState(false);
  const [videos, setVideos] = useState([]);
  const [input, setInput] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoId, setVideoId] = useState('');
  const [nothing, setNothing] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory();

  function handleHome() {
    history.push("/");
  }

  function watchVid(e) {
      setVideoId(e[2]);
      setVideoTitle(e[0] + ' - ' + e[1]);
      handleShow();
  }

  function inputChanged(e) {
    setInput(e);
  }

  function getYTapilist() {
    axios({
      "method": 'GET', 
      "url": 'https://www.googleapis.com/youtube/v3/search',
      "params":{
                    'part':'snippet',
                    'maxResults':'20',
                    'key': KEY,
                    'q': input.target.value
                }
      })
      .then(res => {
        setNothing(false);
        console.log(res.data.items);
        const videos = res.data.items;
        setVideos(videos);
      })
  }

  return (
    <div>
      <h1 className="title">YouTube</h1>
      <h6 style={{ textAlign: 'center' }}> Search for your favorite Videos </h6>

      <InputGroup className="mb-3 searchbar">
        <FormControl
          placeholder="Search Video"
          aria-label="Search Video"
          aria-describedby="basic-addon2"
          onChange={inputChanged}
        />
        <InputGroup.Text id="basic-addon2" className="searchBtn" onClick={getYTapilist}>Search</InputGroup.Text>
      </InputGroup>

      <Container style={{ marginTop: '50px' }}>
        <Row>
          {videos.map((data,id)=>{
          return <Col lg={3} xs={12} key={id}>
                  <Card style={{ width: '100%' }} className="card">
                    <Card.Img variant="top" src={data.snippet.thumbnails.high.url} />
                    <Card.Body>
                      <Card.Title style={{ textDecoration: 'underline' }}>{data.snippet.title}</Card.Title>
                      <Card.Text>
                        {data.snippet.description}
                      </Card.Text>
                      <Button variant="danger" onClick={() => watchVid([data.snippet.title, data.snippet.channelTitle , data.id.videoId])}>Watch Video</Button>
                    </Card.Body>
                  </Card>
                </Col>
          })}
        </Row>
        { nothing ? 
        <div className="nothing">
        Nothing to see yet!
        </div> : null
        }

        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>{ videoTitle }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <iframe width="100%" height="450px" allow="fullscreen;"
            src={"https://www.youtube.com/embed/" + videoId + "?autoplay=1"} >
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

export default Youtube
