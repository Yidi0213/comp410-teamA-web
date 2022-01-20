import React from 'react';
import {Location, OneResult} from "../QueryPage"




type Props = {
    results: Array<OneResult>;
}

export const Result = ({ results }: Props) => {

    const resultItems = results.map((item, index) =>
        <li key={index}>Username: {item.userName}; Latitude: {item.location.latitude}; Longitude: {item.location.longitude}; Date: {item.date}; UserMessage: {item.usrMsg}</li>
    );

    return (
        <div>
            <h1>Query result(to be finished)</h1>
            <ul>{resultItems}</ul>
        </div>
      );
}