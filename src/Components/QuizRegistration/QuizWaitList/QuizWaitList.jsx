import { useState } from 'react';
import './QuizWaitList.css'
const QuizWaitList = () => {
    const [waitlistEmail, setWaitlistEmail] = useState('');

    const handleWaitlistSubmit = (e) => {
        e.preventDefault();
        alert(`Success! ${waitlistEmail} has been added to the waitlist.`);
        setWaitlistEmail('');
    };

    return (
        <section className='q-waitlist-section'>
            <div className='q-waitlist-container'>
                <div className='q-waitlist-text-content'>
                    <h2 className='q-waitlist-heading'>Join the Waitlist</h2>
                    <p className='q-waitlist-subtext'>
                        Be the first to know about upcoming exam dates, proctoring schedules,
                        and scholarship winner announcements.
                    </p>
                </div>
                <form onSubmit={handleWaitlistSubmit} className='q-waitlist-form'>
                    <input
                        type="email"
                        placeholder="Enter School Email"
                        className='q-waitlist-input'
                        required
                        value={waitlistEmail}
                        onChange={(e) => setWaitlistEmail(e.target.value)}
                    />
                    <button type="submit" className='q-redbtn'>Join</button>
                </form >
            </div >
        </section >
    )
}
export default QuizWaitList