import React from 'react';
import { useState } from 'react';
import QueryBuilder, { Field, RuleGroupType, NameLabelPair,formatQuery } from 'react-querybuilder';
import {CustomValueEditor} from './CustomValueEditor';
import 'react-querybuilder/dist/query-builder.scss';

const ONE_EQUAL_ONE = '(1 = 1)'
const fields: Field[] = [
  { name: 'userName', label: 'User Name',
    operators:[{ name: '=', label: '=' },{name: '!=', label: '!=' }] },
  { name: 'longitude', label: 'Longitude' },
  { name: 'latitude', label: 'Latitude' },
  { name: 'date', label:'Date',
    operators: [{ name: '<', label: '<' },
    { name: '>', label: '>' }],
    datatype: 'datetime',
    defaultValue:new Date()
  },
];

const operators: NameLabelPair[] = [
    { name: '=', label: '=' },
    { name: '!=', label: '!=' },
    { name: '<', label: '<' },
    { name: '>', label: '>' },
]

interface Props {
  onChangeQuery: (q:any)=> void
}

export const Filter:React.FC<Props> = ({onChangeQuery})=>{
    const [sqlCode,setSqlCode] = useState("");
    return (
        <div>
            <h1>Query filter</h1>
            {/*// @ts-ignore */}
            <QueryBuilder 
            enableDragAndDrop={true} 
            fields = {fields} 
            operators = {operators}
            onQueryChange = {(q)=>{onChangeQuery(q); setSqlCode(formatQuery(q,'sql'))}}
            controlElements={{
              addGroupAction: () => null,
              valueEditor:CustomValueEditor
            }}

            />
            <h2>{sqlCode.trim()===ONE_EQUAL_ONE?"No filter parameter yet":"SQL representation: "+ sqlCode}</h2>
            <hr/>
        </div>
      );
}