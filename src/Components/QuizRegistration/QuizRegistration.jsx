import './QuizRegistration.css'
export const QuizRegistration = () => {
    return (
        <div className='qr-container'>
            <h1>Registration</h1>
            <form className='qr-form'>
                <div>
                    <label>School Name</label><input type='text' placeholder='school name' required />
                </div>
                <div>
                    <label>School Address</label>
                    <div className='qr-address'>
                        <input type='text' placeholder='address line 1' required />
                        <input type='text' placeholder='address line 2' required />
                        <input type='text' placeholder='address line 3'/>
                        <input type='text' placeholder='city' required />
                    </div>
                    <div>
                        
                    </div>
                </div>
            </form>
        </div>
    )
}