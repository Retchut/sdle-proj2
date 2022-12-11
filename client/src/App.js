import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Gun from 'gun';

import UserInputForm from './Components/UserInputForm/UserInputForm';
import Feed from './Components/Feed/Feed';

const id = 9000 + Number(process.env.REACT_APP_ID)
const peer = 9000 + Number(process.env.REACT_APP_PEER_ID)

// gun instance
var gun
if (process.env.REACT_APP_PEER_ID == ""){
	gun = Gun(`http://localhost:${id}/gun`)
}else{
	console.log("Front-end: Connecting to peer " + peer)
	gun = Gun({
		peers: [`http://localhost:${id}/gun`, `http://localhost:${peer}/gun`]
	})
}

function App() {
	// Local state (userID and feed to be displayed)
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
				<Feed gun={gun} userID={userID} feedID={"B"} />
			}
		</div>
	)
}

export default App;
