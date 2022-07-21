import Header from "./components/header/Header";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import FeedbackStats from "./components/feedback/FeedbackStats";
import FeedbackList from "./components/feedback/FeedbackList";
import FeedbackForm from "./components/feedback/FeedbackForm";
import AboutPage from "./pages/AboutPage";
import AboutPageLink from "./components/AboutPageLink";
import {FeedbackProvider} from "./context/FeedbackContext";


function App() {

    return (
        <FeedbackProvider>
            <Router>
                <Header />
                <div className='container'>
                    <Routes>
                        <Route path='/' exact element={
                            <>
                                <FeedbackForm />
                                <FeedbackStats />
                                <FeedbackList />
                            </>
                        } />
                        <Route path='/about' element={<AboutPage />} />
                    </Routes>
                </div>
                <AboutPageLink />
            </Router>
        </FeedbackProvider>
    );
}

export default App;
