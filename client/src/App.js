import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserInputForm from './Components/UserInputForm/UserInputForm';
import Feed from './Components/Feed/Feed';

function App() {

	// Local state (userID and feed to be displayed)
	// const [userID, setUserID] = useState("");
	const [userID, setUserID] = useState("");

	return (
		<div className="vw-100 vh-100 m-0 overflow-auto">
			{ /* Displays the UserInputForm if the userID is "" */ }
			{ 
			  userID === "" && 
				<div className="row m-0 h-50">
					<div className="col-6 d-flex flex-column p-4">
						<UserInputForm setUserID={setUserID} />
					</div>
				</div>
			}
			{ /* Displays the Board if the userID is not "" */ }
			{/* { userID !== "" && <UserInputForm setUserID={setUserID} />} */}
			{ userID !== "" && 
				<Feed userID={userID} />
			}
		</div>
	)
}

export default App;
