import React, { useState } from 'react';
import {Filter} from './filter/Filter';
import { Result } from './result/Result';

export interface Location {
    latitude: number;
    longitude: number;
}

export interface QueryResult {
    userName: string;
    location: Location;
    date: string;
    usrMsg: string;
}

export const QueryPage = ()=>{
    const [queryFilter, setQueryFilter] = useState();
    const [queryResult, setQueryResult] = useState<QueryResult[]>();
    //@ts-ignore
    const transformJSONtoAPI = (q) =>{
        //TODOs holder
        return q
    }
    const queryAPI = ()=>{
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transformJSONtoAPI(queryFilter))
        };
        fetch('https://tgw2warmupa.azurewebsites.net/api/querydata', 
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transformJSONtoAPI(queryFilter))})
            .then(response => response.json())
            .then(data => setQueryResult(data));
    }
    return (
        <div>
           <Filter onChangeQuery={(q)=>{setQueryFilter(q);console.log(q)}}/>
            <Result results={queryResult} />
            <button onClick={queryFilter}>Query</button>
        </div>
      );
}