import React from 'react'


const Comment = (props) => {
  return (
      <div>
          <p><b><i>{props.author}</i></b> says {props.content}</p>

      </div>
    )
  }

export default Comment
