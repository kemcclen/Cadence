import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_PLAYLISTS } from "../utils/queries";
import { DELETE_PLAYLIST } from "../utils/mutations";
import { Button, InputGroup, FormControl, Carousel } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import styles from "../components/SavePlaylist.css"

const SavedPlaylists = () => {
    const { loading, error, data, refetch } = useQuery(GET_USER_PLAYLISTS);
    const [deletePlaylist] = useMutation(DELETE_PLAYLIST);
    const [searchTerm, setSearchTerm] = useState("");

    if (loading) return <div>Loading...</div>;

    const filteredPlaylists = data?.getUserPlaylists?.filter(playlist =>
        playlist.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <div className="container-fluid">
            <div className="d-flex">
              
            <div className="sidebar col-md-3">
    <InputGroup className="mb-3">
        <FormControl
            placeholder="Search for playlists"
            onChange={e => setSearchTerm(e.target.value)}
        />
    </InputGroup>
    {filteredPlaylists.map(playlist => (
        <div key={playlist._id} className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-items-center">
                <Button variant="link">
                    {playlist.name}
                </Button>
                <img src={playlist.tracks[0]?.image} alt={`${playlist.name} thumbnail`} className="playlist-thumbnail" />
            </div>
            <Button
                variant="danger"
                onClick={async () => {
                    await deletePlaylist({
                        variables: {
                            playlistId: playlist._id,
                        },
                    });
                    refetch();
                }}
            >
                <FaTrash />
            </Button>
        </div>
    ))}
</div>


                <div className="main-content col-md-9 d-flex flex-wrap">
                    {data?.getUserPlaylists.map(playlist => (
                        <div key={playlist._id} className="playlist-content flex-fill">
                            <h1>{playlist.name}</h1>
                            <Carousel>
                                {playlist.tracks.map((track, index) => (
                                    <Carousel.Item key={index}>
                                        <img className="d-block w-100" src={track.image} alt={track.title} />
                                        <Carousel.Caption>
                                            <h3>{track.title}</h3>
                                            <p>{track.artists[0]}</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                            <h2>{playlist.description}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SavedPlaylists;
