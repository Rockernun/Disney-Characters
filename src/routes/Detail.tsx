//  캐릭터 상세 정보 페이지
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

interface RouteParams {
    characterId:string;
}

interface RouteState{
    name:string;
}

interface InfoData {
    id:number;
    name:string;
    imageUrl:string;
    sourceUrl:string;
    films: string[];
}

const Container = styled.h1`
    padding: 0px 20px;
    max-width: 1000px;
    margin: 0 auto;
`;

const Header = styled.div`
    height:15vh;
    display:flex;
    justify-content:center;
    align-items:center;
`;

const Loader = styled.span`
    text-align:center;
    display:block;
`;

const Title = styled.h1`
    font-size:48px;
    color:${(props)=>props.theme.accentColor};
`;

const Img = styled.img`
    width:400px;
    height:400px;
    border-radius:200px;
    margin: 0 auto; 
    display: block; 
`;

const OverView = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;
    font-size:25px;

    span:first-child {
        color:black;
        font-size:50px;
        font-weight:400;
        text-transform: uppercase;
        margin-top:20px;
        margin-bottom:10px;
    }
`;

function Detail() {
    const [loading, setLoading] = useState(true);
    const { characterId } = useParams<RouteParams>();
    const { state } = useLocation<RouteState>();
    const [info, setInfo] = useState<InfoData | null>(null);

    const getCharacter = async () => {
        try {
            const infoResponse = await axios.get<InfoData>(
                ` https://disney_api.nomadcoders.workers.dev/characters/${characterId}`
            );
            setInfo(infoResponse.data);
        } catch (error) {
            console.error("Error fetching character's data:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getCharacter();
    }, [characterId]);
    return (
        <Container>
            <Header>
                <Title>{state?.name || info?.name || "Loading..."}</Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
                ) : (
                    <div>
                    <Img src={info?.imageUrl} alt={info?.name} />
                    <OverView><span>Films</span></OverView>
                    <ul>
                        <OverView>
                        {info?.films.map((film, index) => (
                            <li key={index}>&rarr; {film}</li>
                        ))}
                        </OverView>
                    </ul>
                </div>
                )}
        </Container>
    )
}

export default Detail;