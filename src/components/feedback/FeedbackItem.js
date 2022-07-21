import Card from "../UI/Card/Card";
import {FaEdit, FaTimes} from 'react-icons/fa'
import {useContext} from "react";
import FeedbackContext from "../../context/FeedbackContext";

const FeedbackItem = ({ feed }) => {
    const { deleteHandler, activateEditMode } = useContext(FeedbackContext)
    return (
        <Card>
            <div className='num-display'>{ feed.rating }</div>
            <button onClick={() => deleteHandler(feed.id)} className='close'>
                <FaTimes color='purple' />
            </button>
            <button onClick={() => activateEditMode(feed)} className='edit'>
                <FaEdit color='purple' />
            </button>
            <div className='text-display'>
                { feed.text }
            </div>
        </Card>
    )
}

export default FeedbackItem