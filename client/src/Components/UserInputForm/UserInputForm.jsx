import { useState } from "react";

export default function UserInputForm(props){
    // get userID state setter from props
    const setUserID = props.setUserID;

    const [userIDInput, setUserIDInput] = useState("");

    /**
	 * @brief Submits the form, setting the user ID, then resetting the form input
	 * @param {Event} e - event received
     */
    const submitForm = (e) => {
        e.preventDefault(); // prevent default submit action (page reload)
        setUserID(userIDInput);
        setUserIDInput("");
    }

    return (
        <form className="w-100" onSubmit={submitForm}>
            <label className="form-label" htmlFor="userid-input">Input your user ID:</label>
            <input
            type="text"
            className="form-control"
            id="userid-input"
            value={userIDInput}
            onChange={(e) => setUserIDInput(e.target.value)}
            />
            <input type="submit" className="my-2 btn-secondary" value="Join" />
        </form>
    )
}