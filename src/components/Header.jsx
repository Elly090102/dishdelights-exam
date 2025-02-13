import { Link } from "react-router-dom";
export default function Header() {

    return (
        <header>
            <nav style={{display: "flex", gap: "20px"}}>
                <p>
                    <Link to="home">Home</Link>
                </p>
                <p>
                    <Link to="about">About</Link>
                </p>
                <p>
                    <Link to="recipes">Recipes</Link>
                </p>

                <p>
                    <Link to="favourites">Favourites</Link>
                
                </p>

                <p>
                    <Link to="contact">Contact</Link>
                </p>

            </nav>
        </header>
    )
}