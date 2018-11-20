export function fetchPhoto(date) {
  return (dispatch) => {
    dispatch({type: 'FETCH_PHOTO'});
    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&hd=false&api_key=s773cGTT3VGPiJQZ9Hx0I1l4Nv07JiihqIYQohKf`)
    .then(response => response.json())
    .then(data => dispatch({type: 'ADD_PHOTO_TO_STATE', data: data}))
  }
}
