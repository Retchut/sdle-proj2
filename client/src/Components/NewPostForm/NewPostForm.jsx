import { useState } from "react";

export default function NewPostForm(props){
    const savePost = props.savePost;
    const id = props.id;
	// Form States (input for userID and input for the post to be drawn)
	const [input, setInput] = useState('');

    /**
	 * @brief Submits the form, saving the post, then resetting the form input
	 * @param {Event} e - event received
     */
     const submitForm = (e) => {
        e.preventDefault(); // prevent default submit action (page reload)
        console.log("posting")
        savePost({ id : id, post : input });
		// Resets the form input to its initial state
		setInput('')
    }

    // id: newPost.id, post: newPost.post

    return (
        <form className="w-100" onSubmit={submitForm}>
            <div className="row">
                <div className="col-8">
                    <label className="form-label" htmlFor="userid-input">Input your post message:</label>
                    <input
                    type="text"
                    className="form-control"
                    name="post"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <div className="col-2">
                    <input type="submit" className="my-2 btn-secondary" value="Post" />
                </div>
            </div>
        </form>
    )
}