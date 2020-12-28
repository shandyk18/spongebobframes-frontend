import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

import NavigationBar from './NavigationBar';

function Home() {
    const [frameId, setFrameId] = useState();
    const [imgSrc, setImgSrc] = useState("https://i.imgur.com/avClfdP.jpg");

    async function getRandomFrame() {
        const frameNum = Math.floor(Math.random() * 6);
        const response = await axios.get(`http://localhost:5000/frames/${frameNum}`);
        console.log(response.data);
        return response.data[0];
    }

    function loadFBLogin() {
        window.fbAsyncInit = function() {
            window.FB.init({
            appId            : process.env.FB_APP_ID,
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v9.0'
            });
        };

        console.log("Loading fb api");
          // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    useEffect(() => {
        console.log("src: " + imgSrc);
    }, [frameId, imgSrc]);

    // load SDK
    useEffect(() => {
        loadFBLogin()
    }, []);

    // when button clicked, generates a random frame id
    async function onGenerate() {
        let response = undefined;
        do {
            response = await getRandomFrame();
        } while (response === undefined);
        setFrameId(response.frameId);
        setImgSrc(response.image);
    }

    return (
        <div>
            <NavigationBar />
            <br />           
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
                        src={imgSrc}
                        alt="random frame"
                        width="1000"
                    />
                </Row>
                <br />
                <Row>
                    <p>Season 1 Episode 1</p>
                </Row>
            </Container>
            <br />
        </div>
    );
}

export default Home;