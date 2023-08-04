import { Component } from 'react';
import propTypes from 'prop-types';
import { ModalDiv, Overlay } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.eventFunction();
    }
  };

  handleClick = event => {
    if (event.target === event.currentTarget || event.target) {
      this.props.eventFunction();
    }
  };

  render() {
    return (
      <Overlay onClick={this.handleClick}>
        <ModalDiv>
          <img src={this.props.imageLink} alt="" />
        </ModalDiv>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  eventFunction: propTypes.func.isRequired,
  imageLink: propTypes.string.isRequired,
};
