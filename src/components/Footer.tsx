// Footer.tsx
import './Footer.css'; // Ensure this path is correct based on your project structure

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </footer>
    );
};

export default Footer;
