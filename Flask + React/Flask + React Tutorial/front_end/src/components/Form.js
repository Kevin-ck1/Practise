import { useState } from "react"

const Form = ({onAdd}) => {
    //Setting up the variables
    const [title, setTitle] = useState('')
    const [ratings, setRatings] = useState('')

    const onSubmit = (e) =>{
        e.preventDefault()
        onAdd({title, ratings})
        setTitle('')
        setRatings('')
    }
  return (
    <form className="add-form">
        <div className="form-group">
            <label htmlFor="" >Title</label>
            <input  type="text" name="" id="" placeholder="Add Title" value={title} onChange={(e)=> setTitle(e.target.value)}/>
        </div>

        <div className="form-group">
            <label htmlFor="">Rating</label>
            <input type="number" name="" id="" placeholder="Add Rating" value={ratings} onChange={(e)=> setRatings(e.target.value)} />
        </div>

        <input onClick={onSubmit} type="submit" value="Save" className="btn btn-block btn-primary"/>
    </form>
  )
}

export default Form