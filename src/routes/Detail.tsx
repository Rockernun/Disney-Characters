//  캐릭터 상세 정보 페이지
import React from "react";
import { useParams } from "react-router-dom";

interface RouteParams {
    characterId:string;
}

function Detail() {
    const { characterId } = useParams<RouteParams>();
    return <h1>Character : {characterId}</h1>
}

export default Detail;