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
    currentIndex: 0,
    translateValue: 0
  }
}

  componentDidMount(){
    this.props.fetchAllPhotos()
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
     if(this.state.currentIndex === this.props.images.length - 1) {
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
               this.props.images.map((image, i) => (
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

function mapDispatchToProps(dispatch){
  return {fetchAllPhotos: () => dispatch(fetchAllPhotos())}
}



export default connect(mapStateToProps, mapDispatchToProps)(PicSliderContainer)
