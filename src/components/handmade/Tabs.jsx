import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tabs extends Component {
  state = {
    activeTab: this.props.children[0].props.label,
  };

  clickTab = tab => {
    this.setState({ activeTab: tab });
  };

  render() {
    const {
      state: { activeTab },
      props: { children },
      clickTab,
    } = this;
    return <div className='tabs'></div>;
  }
}

export default Tabs;
