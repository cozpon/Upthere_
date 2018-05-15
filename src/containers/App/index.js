import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadImages } from '../../actions/image.actions';
import ImageList from '../../components/imageList.components';
import Modal from '../Modal';

class App extends Component {
  constructor(){
    super();
    this.state = {
      images: [],
      search : '',
      isOpen: false,
      url: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let tags = {
      search : this.state.search
    };

    this.props.loadImages(tags);
  }

  handleSearchInput(evt) {
    this.setState(
    {
      search : evt.target.value
    });
  }

  openModal (evt) {
    let url = evt.target.src;
    if(url){
      this.setState({
        isOpen: true,
        url: url
      });
    }
  }

  closeModal (evt) {
    this.setState({
      isOpen: false,
      url: ''
    });
  }

  render() {
    return (
      <div id="main">
        <form onSubmit={this.handleSubmit}>
          <div id="search">
              <input
                name="search"
                type="text"
                placeholder="What do you want?"
                defaultValue={this.state.search}
                onChange={this.handleSearchInput}/>
          </div>
          <div id="submit_button">
            <button
              className="search-btn"
              type="submit"
              onClick={this.handleSubmit}>
              Search
            </button>
          </div>
        </form>
        <div className="images">
          <a onClick={this.openModal}>
            <ImageList images={this.props.images} />
          </a>
          <Modal
            show={this.state.isOpen}
            onClose={this.closeModal}>
            <img src={this.state.url} />
          </Modal>
        </div>
     </div>
    );
  }
}


const mapStateToProps = (state) => {
  console.log(state, "STATE")
  return {
    images : state.imageList, // makes it this.props.images
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadImages: (tag) => {
      dispatch(loadImages(tag));
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
