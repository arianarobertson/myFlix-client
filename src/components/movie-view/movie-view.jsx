import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Card, Row, Col } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movies.find((movies) => movies._id === movieId);
    console.log(movie)

    return (
        <div>
            <div>
                <img className="w-100" src={movie.ImagePath} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <Link to={`/`}>
                <Button
                    className="back-button"
                    style={{ cursor: "pointer" }}
                >
                    Back
                </Button>
            </Link>
        </div>
    );
};