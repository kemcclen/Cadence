import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { SAVE_PLAYLIST } from "../utils/mutations";

const SavePlaylistForm = ({ tracks, images }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");

  const [savePlaylist] = useMutation(SAVE_PLAYLIST);

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
    <Form onSubmit={onSubmit}>
      <Form.Group className='mb-3' controlId='formPlaylistName'>
        <Form.Label>Playlist Name</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter playlist name'
          onChange={(e) => setPlaylistName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formPlaylistDescription'>
        <Form.Label>Playlist Description</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter playlist description'
          onChange={(e) => setPlaylistDescription(e.target.value)}
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Save Playlist
      </Button>
    </Form>
  );
};

export default SavePlaylistForm;
