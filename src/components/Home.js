import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import rock from '../images/rock.jpg';

function Home() {
    return (
        <div>
            <Container fluid="md">
                <Row>
                    <h1>Random Spongebob Frames</h1>
                </Row>
                <Row>
                    <img
                        class="img-fluid"
                        src={rock}
                        alt="Patrick's House"
                    />
                </Row>
            </Container>
        </div>
    );
}

export default Home;