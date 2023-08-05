import { Component } from 'react';
import propTypes from 'prop-types';
import { ModalDiv, Overlay } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.eventFunction();
    }
  };

  handleClick = event => {
    if (event.target === event.currentTarget) {
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
