import React from 'react';
import SearchBar from './SearchBar';
import Table from './Table';

export default class SearchableTable extends React.Component {
  constructor() {
    super();
    this.state = {
      filterText: ''
    }
  }

  render() {
    return(
      <div>
        <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/>
        <Table data={this.props.data} filterText={this.state.filterText}/>
      </div>
    );
  }

  handleUserInput(filterText) {
    this.setState({
      filterText: filterText
    })
  }
}
