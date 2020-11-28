import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import rock from '../images/rock.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function Home() {
    const [frameId, setFrameId] = useState();

    // upon load, generate random frame id
    useEffect(() => {
        const frameNum = Math.floor(Math.random() * 2);
        setFrameId(frameNum);
    }, []);

    // when button clicked, generates a random frame id
    async function onGenerate() {
        const frameNum = Math.floor(Math.random() * 2);
        const response = await axios.get(`http://localhost:5000/frame/${frameNum}`);
        setFrameId(response.data);
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
                        src={rock}
                        alt="Patrick's House"
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