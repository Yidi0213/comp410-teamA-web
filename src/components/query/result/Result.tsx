import React from 'react';
import {Location, QueryResult} from "../QueryPage"




type Props = {
    results?: Array<QueryResult>;
}

export const Result = ({ results }: Props) => {

    const resultItems = results?results.map((item, index) =>
        <li key={index}>Username: {item.userName}; Latitude: {item.location.latitude}; Longitude: {item.location.longitude}; Date: {item.date}; UserMessage: {item.usrMsg}</li>
    ):null;

    return (
        <div>
            <h1>Query result(to be finished)</h1>
            <ul>{resultItems}</ul>
        </div>
      );
}