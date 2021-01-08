import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

import NavigationBar from './NavigationBar';

function Home() {
    const [season, setSeason] = useState(1);
    const [episode, setEpisode] = useState(1);
    const [frame, setFrame] = useState(4);
    const [imgSrc, setImgSrc] = useState("https://i.imgur.com/avClfdP.jpg");

    async function getRandomFrame() {
        const frameNum = Math.floor(Math.random() * 4) + 1;
        let response = await axios.get(
            `http://localhost:5000/frames/${season}/${episode}/${frameNum}`);
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

    // useEffect(() => {
    //     console.log(season + " " + episode + " " + frame + " " + imgSrc);
    // }, [season, episode, frame, imgSrc]);

    // load SDK
    useEffect(() => {
        loadFBLogin()
    }, []);

    // when button clicked, generates a random frame id
    async function onGenerate() {
        let response = await getRandomFrame();
        setSeason(response.season);
        setEpisode(response.episode);
        setFrame(response.frame);
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
                        width="800"
                    />
                </Row>
                <br />
                <Row>
                    <p>Season {season} Episode {episode} Frame {frame}</p>
                </Row>
            </Container>
            <br />
        </div>
    );
}

export default Home;