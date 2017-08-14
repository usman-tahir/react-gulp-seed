import React from 'react';
import ReactDOM from 'react-dom';
import SearchableTable from './SearchableTable';
import { data } from './data';

ReactDOM.render(<SearchableTable data={data}/>, document.getElementById('searchableTable'));
