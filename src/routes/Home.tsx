//  디즈니 캐릭터 전체 리스트 페이지
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
    padding: 0px 20px;
    max-width:1000px;
    margin: 0 auto;
`;

const CharacterList = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    padding: 0;
    list-style: none;
`;

const Character = styled.li`
    background-color:#C15AF4;
    color:${(props) => props.theme.bgColor};
    margin-bottom:10px;
    border-radius:15px;
    display: flex;
    justify-content: flex-start;;
    align-items: center;
    text-align: center;
    height: 250px; 
    a {
        transition:color 0.2s ease-in-out, background-color 0.2s ease-in-out;
        padding: 30px;
        display: block;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        text-decoration: none; 
        border-radius: inherit;
        color: inherit; 
        font-family: ; 
        font-size: 16px; 
        font-style: normal;
    }
    &:hover {
        a {
            color:${(props) => props.theme.accentColor};
            background-color:${(props) => props.theme.transformColor};
        }
    }
`;

const Title = styled.h1`
    font-size:48px;
    color:${(props) => props.theme.accentColor};
    font-family: "Bodoni Moda SC", serif;
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

const Img = styled.img`
    width:150px;
    height:150px;
    border-radius:75px;
`;

const CharacterName = styled.div`
    font-size: 18px; 
    font-weight: bold;
    color: #333; 
    margin-top: 20px;
    font-family: "Ga Maamli", sans-serif; 
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
        setCharacters(response.data.slice(0, 100));
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
                        <Link to={`/${character.id}`}>
                        <Img src={character.imageUrl} alt={character.name} />
                        <CharacterName>{character.name}</CharacterName>
                        </Link>
                    </Character>))}
                </CharacterList>
            )}
        </Container>
    );
}

export default Home;