import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const MovieCard = ({ movie, user, token, setUser }) => {
    const [isFavorite, setFavorite] = useState(
        user?.FavoriteMovies?.includes(movie._id) || false);

    export const MovieCard = ({ movie, user, token }) => {
        const [isFavorite, setFavorite] = useState(user?.FavoriteMovies?.includes(movie._id) || false);

        useEffect(() => {
            setFavorite(user?.FavoriteMovies?.includes(movie._id) || false);
        }, [user, movie]);

        const handleToggleFavorite = (movieId) => {
            if (user.FavoriteMovies.includes(movieId)) {
                //Remove from favorites
                deleteUserFavorites(movieId);
                setFavorite(false);
            } else {
                //Add to favorites
                addUserFavorites(movieId)
                setFavorite(true);
            }
        };

        const deleteUserFavorites = (movieId) => {
            fetch(`https://my-movies-flix1123-ddfeafac7a4b.herokuapp.com/users/${user.Username}/favorites/${movieId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            }).then((response) => response.json())
                .then((data) => {
                    console.log("Delete favorite response: ", data);
                    localStorage.setItem("user", JSON.stringify(data));
                    setUser(data);
                    setFavorite((prevFavorite) => !prevFavorite);
                })
                .catch((e) => {
                    alert("Something went wrong");
                });
        }

        const addUserFavorites = (movieId) => {
            fetch(`https://my-movies-flix1123-ddfeafac7a4b.herokuapp.com/users/${user.Username}/favorites/${movieId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            }).then((response) => response.json())
                .then((data) => {
                    console.log("Add favorite response: ", data);
                    localStorage.setItem("user", JSON.stringify(data));
                    setUser(data);
                    setFavorite((prevFavorite) => !prevFavorite);
                })
                .catch((e) => {
                    alert("Something went wrong");
                });
        }
        return (
            <Card className="h-100">
                <Card.Img variant="top" src={movie.ImagePath} alt={movie.title} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                        <Button variant="link">
                            See more
                        </Button>
                    </Link>
                    <Button
                        variant={isFavorite ? "danger" : "primary"}
                        onClick={() => handleToggleFavorite(movie._id)}
                    >
                        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
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
        // onToggleFavorite: PropTypes.func.isRequired,
        isFavorite: PropTypes.bool.isRequired,
        // handleToggleFavorite: PropTypes.isRequired,
    };