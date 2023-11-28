import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }
        fetch("https://my-movies-flix1123-ddfeafac7a4b.herokuapp.com/movies",
            { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => response.json())
            .then((data) => {
                console.log("Movies from API :", data);
                const moviesFromApi = data.map((movie) => {
                    return {
                        _id: movie._id,
                        Title: movie.Title,
                        ImagePath: movie.ImagePath,
                        Description: movie.Description,
                        Genre: {
                            Name: movie.Genre.Name
                        },
                        Director: {
                            Name: movie.Director.Name
                        }
                    };
                });
                setMovies(moviesFromApi);
            });
    }, [token]);

    return !user ? (
        <Row className="justify-content-md-center">
            <Col md={4}>
                <LoginView
                    onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }}
                />
                or
                <SignupView />
            </Col>
        </Row >
    ) : selectedMovie ? (
        <>
            <Button
                variant="outline-primary"
                onClick={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            >
                Logout
            </Button>
            <Row className="justify-content-md-center">
                <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}
                />
            </Row>
        </>
    ) : movies.length === 0 ? (
        <div>No results found!</div>
    ) : (
        <>
            <Button
                variant="outline-primary"
                onClick={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            >
                Logout
            </Button>
            <Row className="justify-content-md-center home-page-main">
                {movies.map((movie) => {
                    return (
                        <Col className="mb-5" key={movie._id} md={3}>
                            < MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                            }}
                            />
                        </Col>
                    );
                })}
            </Row>
        </>
    );
};