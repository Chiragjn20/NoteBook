import React , {useContext} from 'react'
import noteContext from '../Context/Notes/nodeContext'
const  About=() =>{
  const  a = useContext(noteContext)
  return (
    <div>It is what it is {a.name}</div>
  )
}

export default About