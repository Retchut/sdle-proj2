import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Gun from 'gun';

import UserInputForm from './Components/UserInputForm/UserInputForm';
import Feed from './Components/Feed/Feed';
	
// gun instance
const gun = Gun({
      localStorage: false,
      peers: [
              `http://localhost:${process.env.REACT_APP_GUN_PORT}/gun`
      ]
})

function App() {

	// Local state (userID and feed to be displayed)
	const [userID, setUserID] = useState("");
	const feeds = [];
	if (userID !== "") {
		feeds.push(userID);
	}

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
				<Feed gun={gun} userID={userID} feedID={userID} />
			}
		</div>
	)
}

export default App;
