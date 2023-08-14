import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab, Button } from "react-bootstrap";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_SPOTIFY } from "../utils/queries";
import { useCookies } from "react-cookie";
import SignUpForm from "../component/signup";
import LoginForm from "../component/login";
import Auth from "../utils/auth";

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie] = useCookies(["access_token", "refresh_token"]);

  const [loginSpotify] = useLazyQuery(LOGIN_SPOTIFY, {
    onCompleted: (data) => {
      console.log("Spotify login URL generated:", data.loginSpotify);
      window.location.href = data.loginSpotify;
    },
  });

  const handleSpotifyLogin = async (e) => {
    e.preventDefault();

    try {
      await loginSpotify();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar className='navbar' expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="nav-brand">
            Cadence
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar" className="custom-toggler" />

          <Navbar.Collapse
            id="navbar"
            className=" navToggle d-lg-flex justify-content-end"
          >
            <Nav className="ml-lg-auto d-lg-flex nav-option">
              <Nav.Link as={Link} to="/">
                AI Playlist
              </Nav.Link>

              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to="/playlists" className="nav-option">
                    Your Playlists
                  </Nav.Link>

                  {!cookies.refresh_token || !cookies.access_token ? (
                    <Button
                      className="btn btn-success"
                      onClick={handleSpotifyLogin}
                    >
                      Login to Spotify
                    </Button>
                  ) : null}
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Login/Sign Up
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
