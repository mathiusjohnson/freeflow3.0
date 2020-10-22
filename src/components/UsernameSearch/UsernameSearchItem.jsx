import React from 'react';

export default function UsernameSearchItem(props) {

  return (
    <div className='username-search-results-item' onClick={() => props.setUsernameValue(props.name)}>
      {props.name}
    </div>
  )

}