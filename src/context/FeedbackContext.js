import {createContext, useState} from "react";
import {v4 as uuidv4} from "uuid";


const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'From the context',
            rating: 7
        }
    ])

    const [editFeedback, setEditFeedback] = useState({
        item: {},
        edit: false
    })

    const activateEditMode = (item) => {
        setEditFeedback({
            item,
            edit: true
        })
    }

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this feedback?')) {
            setFeedback(() => feedback.filter(item => item.id !== id))
        }
    }
    const addHandler = (newFeedback) => {
        if (editFeedback.edit) {

            setFeedback(feedback.map((item) => item.id === editFeedback.item.id ? { ...item, ...newFeedback } : item ))
            setEditFeedback({
                item: {},
                edit: false
            })
        } else {
            newFeedback.id = uuidv4()
            setFeedback([newFeedback, ...feedback])
        }
    }

    return (
        <FeedbackContext.Provider value={{
            feedback,
            editFeedback,
            deleteHandler,
            addHandler,
            activateEditMode
        }}>
            { children }
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext