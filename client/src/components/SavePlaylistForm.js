import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation, useLazyQuery } from "@apollo/client";
import { SAVE_PLAYLIST, CREATE_SPOTIFY_PLAYLIST } from "../utils/mutations";
import { useCookies } from "react-cookie";
import Auth from "../utils/auth";

const SavePlaylistForm = ({ tracks, images }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [showForm, setShowForm] = useState(false); 
  const [cookies, setCookie] = useCookies(["access_token", "refresh_token"]);

  const [savePlaylist] = useMutation(SAVE_PLAYLIST);

  const [createSpotifyPlaylist] = useMutation(CREATE_SPOTIFY_PLAYLIST);

  // create playlist on spotify account
  const handleSpotify = async (e) => {
    e.preventDefault();

    try {
      await createSpotifyPlaylist({
        variables: {
          name: playlistName,
          description: playlistDescription,
          images,
          tracks,
        },
        onCompleted: (data) => {
          console.log("Playlist Created!", data.createSpotifyPlaylist);
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
// save playlist
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await savePlaylist({
        variables: {
          name: playlistName,
          description: playlistDescription,
          images,
          tracks,
        },
        onCompleted: (data) => {
          console.log("Playlist Saved!", data.savePlaylist);
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {Auth.loggedIn() && (
        <div className="create-playlist">
          {/* Open create playlist form */}
          <Button
            className="playlist-btn save-playlist"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Create Playlist"}
          </Button>
          {showForm && (
            // Create playlist form
            <Form onSubmit={onSubmit} className="playlist-form">
              <Form.Group className="mb-3" controlId="formPlaylistName">
                <Form.Label>Playlist Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter playlist name"
                  onChange={(e) => setPlaylistName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPlaylistDescription">
                <Form.Label>Playlist Description:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  onChange={(e) => setPlaylistDescription(e.target.value)}
                />
              </Form.Group>
              <div>
                <Button className="playlist-btn" type="submit">
                  Save Playlist
                </Button>

                {cookies.access_token || cookies.refresh_token ? (
                  <Button
                    className="playlist-btn"
                    variant="success"
                    onClick={handleSpotify}
                  >
                    Save to Spotify
                  </Button>
                ) : (
                  <div>
                    <p>Login to Spotify to save Playlist to your account</p>
                  </div>
                )}
              </div>
            </Form>
          )}
        </div>
      )}
    </>
  );
};

export default SavePlaylistForm;
