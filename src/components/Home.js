import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import rock from '../images/rock.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function Home() {
    const [frameId, setFrameId] = useState();
    const [imgSrc, setImgSrc] = useState();

    async function getRandomFrame() {
        const frameNum = Math.floor(Math.random() * 2);
        const response = await axios.get(`http://localhost:5000/frames/${frameNum}`);
        return response.data[0];
    }

    useEffect(() => {
        console.log("src: " + imgSrc);
    }, [frameId, imgSrc]);

    // when button clicked, generates a random frame id
    async function onGenerate() {
        const response = await getRandomFrame();
        setFrameId(response.frameId);
        setImgSrc(response.image);
    }

    return (
        <div>
            <Container fluid="md">
                <Row className="justify-content-md-center">
                    <h1>Random Spongebob Frames</h1>
                </Row>
                <br />
                <Row className="justify-content-md-center">
                    <Button onClick={() => onGenerate()}>
                        Generate Random Frame
                    </Button>
                </Row>
                <br />
                <Row className="justify-content-md-center">
                    <img
                        width={1000}
                        src={imgSrc}
                        alt={imgSrc}
                    />
                </Row>
                <br />
                <Row>
                    <p>frame id: {frameId}</p>
                </Row>
            </Container>
        </div>
    );
}

export default Home;