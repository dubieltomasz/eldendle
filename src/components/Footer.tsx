import image from '../assets/github-mark-white.png';
import './Footer.css';

function Footer() {
    return (
        <footer>
            <p>Eldendle - 2025</p>
            <a href='https://github.com/dubieltomasz/eldendle' target='_blank'>
                <img src={image} />
            </a>
        </footer>
    );
};

export default Footer;