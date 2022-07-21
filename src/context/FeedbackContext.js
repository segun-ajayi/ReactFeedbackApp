import {createContext, useEffect, useState} from "react";


const FeedbackContext = createContext([])

export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const raw = await fetch('http://localhost:5000/feedback')
        const data = raw.json()
        setFeedback(await data)
        setIsLoading(false)
    }

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

    const deleteHandler = async (id) => {
        setIsLoading(true)
        if (window.confirm('Are you sure you want to delete this feedback?')) {
            await fetch(`http://localhost:5000/feedback/${id}`, {
                method: 'DELETE'
            })
            setFeedback(() => feedback.filter(item => item.id !== id))
        }
        setIsLoading(false)
    }
    const addHandler = async (newFeedback) => {
        setIsLoading(true)
        if (editFeedback.edit) {
            newFeedback.id = editFeedback.item.id

            const resp = await fetch(`http://localhost:5000/feedback/${newFeedback.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newFeedback)
            })

            const data = await resp.json()

            setFeedback(feedback.map((item) => item.id === editFeedback.item.id ? { ...item, ...data } : item ))
            setEditFeedback({
                item: {},
                edit: false
            })
            setIsLoading(false)
        } else {
            const resp = await fetch('http://localhost:5000/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newFeedback)
            })

            const data = await resp.json()

            setFeedback([data, ...feedback])
            setIsLoading(false)
        }
    }

    return (
        <FeedbackContext.Provider value={{
            feedback,
            editFeedback,
            isLoading,
            deleteHandler,
            addHandler,
            activateEditMode
        }}>
            { children }
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext