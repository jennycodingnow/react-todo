import { Link } from "react-router-dom";
import selfphotoSource from "../assets/selfphoto.jpeg";
import "./AboutMe.css";

const AboutMe: React.FC = () => {
    return (
        <main>
            <div className="about-content">
                <h1>A little about me</h1>
                <div className="aboutme-container">
                    <img className="developer-pic" src={selfphotoSource} alt="My pic" />
                </div>
                <p className="about-paragraph">
                Hey there! I'm Jen, a front-end enthusiast diving into web development with React. 
                I have a passion for design and creativity, focusing on creating user-friendly interfaces 
                that look great and work seamlessly. My journey with React goes beyond learning a framework; 
                it's about exploring how to build engaging websites and apps that users love. I enjoy transforming
                ideas into responsive designs that enhance user interaction. Outside of coding, drawing is another 
                passion of mine that I enjoy during my free time. Join me as I continue to grow my skills in React 
                and front-end development. Let's innovate, create, and explore new possibilities in the digital world together!
                </p>
            </div>
        </main>
    );
};

export default AboutMe;