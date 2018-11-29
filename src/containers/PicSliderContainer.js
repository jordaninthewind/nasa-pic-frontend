import React, { Component } from 'react';
import Slide from '../components/slider/Slide'
import LeftArrow from '../components/slider/LeftArrow'
import RightArrow from '../components/slider/RightArrow'
import { connect } from 'react-redux'
import {fetchAllPhotos} from '../actions/picActions'


class PicSliderContainer extends Component {
  constructor(props) {
  super(props)

  this.state = {
    images: [],
    currentIndex: 0,
    translateValue: 0
  }
}

  componentWillMount(){
    // action to update store - how can I update state after this.
    this.props.fetchAllPhotos()
    // without using this.
    fetch(`http://localhost:3001/pictures`,{
       method: 'GET'
     })
     .then(response => response.json())
     .then(data => this.setState({
       images: data
     }))
  }

  goToPrevSlide = () => {
      if(this.state.currentIndex === 0)
        return;

      this.setState(prevState => ({
        currentIndex: prevState.currentIndex - 1,
        translateValue: prevState.translateValue + this.slideWidth()
      }))
    }

   goToNextSlide = () => {
     if(this.state.currentIndex === this.state.images.length - 1) {
       return this.setState({
         currentIndex: 0,
         translateValue: 0
       })
     }

     // This will not run if we met the if condition above
     this.setState(prevState => ({
       currentIndex: prevState.currentIndex + 1,
       translateValue: prevState.translateValue + -(this.slideWidth())
     }));
   }

   slideWidth = () => {
      return document.querySelector('.slide').clientWidth
   }



   render() {

     return (
       <div className="slider">

         <div className="slider-wrapper"
           style={{
             transform: `translateX(${this.state.translateValue}px)`,
             transition: 'transform ease-out 0.45s'
           }}>
             {
               this.state.images.filter(photos => photos.media_type === "image")
               .map((image, i) => (
                 <Slide key={i} image={image.url} />
               ))
             }
         </div>

         <LeftArrow
          goToPrevSlide={this.goToPrevSlide}
         />

         <RightArrow
          goToNextSlide={this.goToNextSlide}
         />
       </div>
     );
   }
 }



function mapStateToProps(state){
  return {images: state.pictures}
}

export default connect(mapStateToProps, {fetchAllPhotos})(PicSliderContainer)
