import React from 'react';
import ReactDOM from 'react-dom';
import SearchTable from './SearchTable';
import { data } from './data';

ReactDOM.render(<SearchTable data={data}/>, document.getElementById('searchableTable'));
