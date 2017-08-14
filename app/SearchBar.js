import React from 'react';

class SearchBar extends React.Component {
  render() {
    return(
      <form>
        <input type="text" placeholder="Search for a keyword" ref="filterTextInput" value={this.props.filterText} onChange={this.handleChange.bind(this)}/>
      </form>
    );
  }
}

export default SearchBar;
