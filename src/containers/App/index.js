import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadImages } from '../../actions/image.actions';
import ImageList from '../../components/imageList.components';


class App extends Component {
  constructor(){
    super();
    this.state = {
      images: [],
      search : ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }
  // componentDidMount(){
  //   let tag = 'armadillo';
  //   this.props.loadImages(tag);
  //   // sending to the Actions to load images from the tag
  // }


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
          <ImageList images={this.props.images} />
        </div>
     </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    images : state.imageList, // makes it this.props.messages
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

