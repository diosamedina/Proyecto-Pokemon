import { Link } from "react-router-dom";
import "./card.css";

function Card({ nombre, imagen, tipos, id }) {
    return (
        <div className="card-container">
            <Link to={`/detail/${id}`}>
                <h2>{nombre}</h2>
                <img src={imagen} alt={nombre} />
                {tipos?.map((tipo, index) => (
                    <h4 key={index}>{tipo}</h4>
                 ))}
            </Link>
        </div>
    );
}

export default Card;                                                    