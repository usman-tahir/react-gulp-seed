import React from 'react';

class Section extends React.Component {
  render() {
    return(
      <div>
        <p>
          {this.props.data.name} = {this.props.data.price}
        </p>
      </div>
    );
  }
}

export default Section;
