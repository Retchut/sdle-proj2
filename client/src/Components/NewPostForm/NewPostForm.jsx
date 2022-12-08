import { useState } from "react";

export default function NewPostForm(props){
    const savePost = props.savePost;
	// Form States (input for userID and input for the post to be drawn)
    const defaultPostInput = { id : '', post : ''};
	const [newPostInput, setNewPostInput] = useState(defaultPostInput);

	/**
	 * @brief Update the post form's state, upon its values changing
	 * @param {Event} e - event received
	 */
	function handleFormChange(e) {
		setNewPostInput({ ...newPostInput, [e.target.name]: e.target.value })
	}

    /**
	 * @brief Submits the form, saving the post, then resetting the form input
	 * @param {Event} e - event received
     */
     const submitForm = (e) => {
        e.preventDefault(); // prevent default submit action (page reload)
        console.log(newPostInput)
        savePost(newPostInput);
		// Resets the form input to its initial state
		setNewPostInput(defaultPostInput)
    }

    // id: newPost.id, post: newPost.post

    return (
        <form className="w-100" onSubmit={submitForm}>
            <div className="row">
                <div className="col-2">
                    <label className="form-label" htmlFor="userid-input">UserID:</label>
                    <input
                    type="text"
                    className="form-control"
                    name="id"
                    value={newPostInput.id}
                    onChange={handleFormChange}
                    />
                </div>
                <div className="col-8">
                    <label className="form-label" htmlFor="userid-input">Input your post message:</label>
                    <input
                    type="text"
                    className="form-control"
                    name="post"
                    value={newPostInput.post}
                    onChange={handleFormChange}
                    />
                </div>
                <div className="col-2">
                    <input type="submit" className="my-2 btn-secondary" value="Post" />
                </div>
            </div>
        </form>
    )
}