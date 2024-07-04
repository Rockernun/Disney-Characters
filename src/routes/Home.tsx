//  디즈니 캐릭터 전체 리스트 페이지
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
    padding: 0px 20px;
    max-width:480px;
    margin: 0 auto;
`;

const CharacterList = styled.ul`

`;

const Character = styled.li`
    background-color:white;
    color:${(props) => props.theme.bgColor};
    margin-bottom:10px;
    border-radius:15px;
    a {
        transition:color 0.2s ease-in;
        padding: 20px;
        display: block;
    }
    &:hover {
        a {
            color:${(props) => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size:48px;
    color:${(props) => props.theme.accentColor};
`;

const Header = styled.div`
    height:10vh;
    display:flex;
    justify-content:center;
    align-items:center;
`;

const Loader = styled.span`
    text-align:center;
    display:block;
`;

interface ICharacters {
    "id":number,
    "name":string,
    "imageUrl":string
}

function Home() {
    const [loading, setLoading] = useState(true);
    const [characters, setCharacters] = useState<ICharacters[]>([]);
    const getCharacters = async() => {
        const response = await axios("https://disney_api.nomadcoders.workers.dev/characters");
        setCharacters(response.data.slice(0, 50));
        setLoading(false);
    }
    useEffect(() => {
        getCharacters();
    }, []);
    return (
        <Container>
            <Header>
                <Title>Disney Characters</Title>
            </Header>
            {loading ? (<Loader>Loading...</Loader>) : (
                <CharacterList>
                    {characters.map((character) => (<Character key={character.id}>
                        <Link to={`/${character.id}`}>{character.name}</Link>
                    </Character>))}
                </CharacterList>
            )}
        </Container>
    );
}

export default Home;