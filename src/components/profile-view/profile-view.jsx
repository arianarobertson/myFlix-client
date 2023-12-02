import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { Button, Col, Form, Row, Modal } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';


export const ProfileView = ({ user, token, setUser, movies, favoriteMovies }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("'");
    const [showModal, setShowModal] = useState(false);




    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        let data = {
            Username: username,
            Email: email,
            Birthday: birthday,
            Password: password
        };
        if (!password) {
            alert("No password set")
            return
        }

        fetch(`https://my-movies-flix1123-ddfeafac7a4b.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Update failed.")
            }
        }).then((data) => {
            if (data) {
                localStorage.setItem("user", JSON.stringify(data));
            }
        })
    };

    const handleDeleteUser = () => {
        fetch(`https://my-movies-flix1123-ddfeafac7a4b.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                setUser(null);
                localStorage.clear();
                alert("Your account has been deleted");
                NavigationPreloadManager('/');
            } else {
                alert("something went wrong.")
            }
        })
        const favoriteMovies = movies.filter((movie) =>
            user.FavoriteMovies.includes(movie._id)
        );
    }

    return (
        <>

            <Row className='justify-content-center'>
                <Col md={5}>
                    <h1 className='profile'>My Profile</h1>
                    <Form onSubmit={handleSubmit} >

                        <Form.Group controlId="formUsername" className='form-group'>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className='form-group'>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail" className='form-group'>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBirthday" className='form-group'>
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control
                                type="date"
                                value={birthday.slice(0, 10)}
                                onChange={(e) => setBirthday(e.target.value)}
                                required
                            />
                        </Form.Group>

                    </Form>
                </Col>
            </Row>

            <Row className='justify-content-center'>
                <Col className='save-button' md={5}>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>Save changes</Button>
                </Col>
            </Row>

            <Row className='justify-content-center'>
                <Col className="delete-button" md={5}>
                    <Button variant="link" className="text-danger" onClick={handleShowModal}>
                        Delete my account
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h1 className='favorite-title'>Favorite movies:</h1>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                {movies.map((movie) => (
                    <Col className="mb-4" key={movie._id} xs={6} md={3} >
                        <MovieCard
                            movie={movie}
                            user={user}
                            token={token}
                            setUser={setUser}
                        >
                        </MovieCard>
                    </Col>
                ))}
            </Row>
            <Row className="justify-content-center">
                <Col>
                    <h1 className="favorite-title">Favorite movies:</h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                {favoriteMovies.map((movie) => (
                    <Col className="mb-4" key={movie._id} xs={6} md={3}>
                        <MovieCard movie={movie} user={user} token={token} setUser={setUser} />
                    </Col>
                ))}
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete account</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete your account permanantly?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleDeleteUser}>Yes</Button>
                    <Button variant="secondary" onClick={handleCloseModal}>No</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}