import FeedbackItem from "./FeedbackItem";
import {motion, AnimatePresence} from 'framer-motion'
import {useContext} from "react";
import FeedbackContext from "../../context/FeedbackContext";


const FeedbackList = () => {
    const {feedback} = useContext(FeedbackContext)
    return (
        <div className='feedback-list'>
            <AnimatePresence>
                {
                    feedback && feedback.length > 0 ?
                        feedback.map((feed, index) => {
                            return (<motion.div
                                key={index}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                            >
                                <FeedbackItem feed={feed}/>
                            </motion.div>)
                        }) : (<p>No feedbacks yet!</p>)
                }
            </AnimatePresence>
        </div>
    )
}

export default FeedbackList