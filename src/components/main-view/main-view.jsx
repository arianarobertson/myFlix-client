import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view.jsx";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { setUser } from "../../redux/reducers/user";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    // const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    // const [movies, setMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const movies = useSelector((state) => state.movies.list);
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

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
                dispatch(setMovies(moviesFromApi));
            });
    }, [token]);

    return (
        <BrowserRouter>
            <NavigationBar
            // user={user}
            // onLoggedOut={() => {
            //     setUser(null);
            //     setToken(null);
            //     localStorage.clear();
            // }}
            />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={4}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={4}>
                                        <LoginView
                                        // onLoggedIn={(user, token) => {
                                        //     setUser(user);
                                        //     setToken(token);
                                        // }}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>No results found!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView
                                            // movies={movies}
                                            user={user}
                                            token={token}
                                            // onToggleFavorite={handleToggleFavorite}
                                            // isFavorite={user.FavoriteMovie.includes(movie._id)}
                                            favorites={favorites} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            <Col className="mb-5" key={movie._id} md={3}>
                                                <MoviesList />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                    <Route
                        path='/profile'
                        element={
                            <>
                                {!user ? (
                                    <Navigate to='/login' replace />
                                ) : (
                                    <Col>
                                        <Row>
                                            <ProfileView
                                                user={user}
                                                token={token}
                                                movies={movies}
                                                favoriteMovies={favoriteMovies}
                                                onDelete={() => {
                                                    setUser(null);
                                                    setToken(null);
                                                    localStorage.clear();
                                                }}
                                            />
                                        </Row>
                                    </Col>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};