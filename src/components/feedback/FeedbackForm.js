import Card from "../UI/Card/Card";
import {useContext, useEffect, useState} from "react";
import Button from "../UI/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../../context/FeedbackContext";


const FeedbackForm = () => {
    const { addHandler, editFeedback } = useContext(FeedbackContext)
    const [text, setText] = useState('')
    const [rating, setRating] = useState(10)
    const [message, setMessage] = useState('')
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if (editFeedback.edit) {
            setText(editFeedback.item.text)
            setRating(editFeedback.item.rating)
            setDisabled(false)
        }
    }, [editFeedback]);


    const textChangeHandler = (e) => {
        setText(e.target.value)
        if (text.trim().length > 10) {
            setDisabled(false)
            setMessage(null)
        } else {
            setDisabled(true)
            setMessage('Text must be at least 10 characters')
        }
    }
    const submitHandler = (e) => {
        e.preventDefault()
        if (text.trim().length > 10) {
            const feedback = {
                rating,
                text
            }

            setText('')
            addHandler(feedback)
        }
    }
    return (
        <Card>
            <form onSubmit={submitHandler}>
                <h2>
                    How would you rate your service with us?
                </h2>
                <RatingSelect select={(num) => setRating(num)} />
                <div className='input-group'>
                    <input type='text' onChange={textChangeHandler} value={text} placeholder='write a review' />
                    <Button type='submit' isDisabled={disabled}>Send</Button>
                </div>
                { message && <div className='message'>{message}</div> }
            </form>
        </Card>
    )
}

export default FeedbackForm