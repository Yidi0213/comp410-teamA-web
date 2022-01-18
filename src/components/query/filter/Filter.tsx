import React from 'react';
import { useState } from 'react';
import QueryBuilder, { Field, RuleGroupType, NameLabelPair,formatQuery } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.scss';

const fields: Field[] = [
  { name: 'userName', label: 'User Name' },
  { name: 'longitude', label: 'Longitude' },
  { name: 'latitude', label: 'Latitude' },
  { name: 'date', label:'Date'}
];

const operators: NameLabelPair[] = [
    { name: '=', label: '=' },
    { name: '!=', label: '!=' },
    { name: '<', label: '<' },
    { name: '>', label: '>' },
]

export const Filter = ()=>{
    return (
        <div>
            <h1>Query filter(to be finished)</h1>
            {/*// @ts-ignore */}
            <QueryBuilder 
            enableDragAndDrop={true} 
            fields = {fields} 
            operators = {operators}
            onQueryChange = {(q)=>{console.log(q);console.log(formatQuery(q,'sql'))}}
            />
        </div>
      );
}