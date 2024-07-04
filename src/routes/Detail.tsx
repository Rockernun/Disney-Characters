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
    max-width: 480px;
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
                    null
                )}
        </Container>
    )
}

export default Detail;