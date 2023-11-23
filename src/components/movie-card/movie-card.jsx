import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.Title}
        </div>
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