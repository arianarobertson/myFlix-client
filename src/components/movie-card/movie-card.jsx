import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.ImagePath} alt={movie.title} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Button onClick={() => onMovieClick(movie)}
                    variant="link">
                    Open
                </Button>
            </Card.Body>
        </Card>
    );
};

// define all the props constraints for the MovieCard
MovieCard.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        image: PropTypes.string,
        description: PropTypes.string,
        year: PropTypes.string,
        genre: PropTypes.string,
        director: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};