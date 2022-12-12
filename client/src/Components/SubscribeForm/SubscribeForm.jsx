import { useState } from "react";

export default function SubscribeForm(props){
    const saveSubscription = props.saveSubscription;
    const id = props.id;
	// Form States (input for userID and input for the post to be drawn)
	const [input, setInput] = useState('');

    /**
	 * @brief Submits the form, saving the post, then resetting the form input
	 * @param {Event} e - event received
     */
     const submitForm = (e) => {
        e.preventDefault(); // prevent default submit action (page reload)
        saveSubscription({ id : id, subscription : input });
		// Resets the form input to its initial state
		setInput('')
    }

    // id: newPost.id, post: newPost.post

    return (
        <form className="w-100" onSubmit={submitForm}>
            <div className="row">
                <div className="col-8">
                    <label className="form-label" htmlFor="userid-input">Who do you want to subscribe to?</label>
                    <input
                    type="text"
                    className="form-control"
                    name="subscription"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <div className="col-2">
                    <input type="submit" className="my-2 btn-secondary" value="Subscribe" />
                </div>
            </div>
        </form>
    )
}