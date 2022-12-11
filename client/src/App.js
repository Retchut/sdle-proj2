// import { useState } from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Gun from 'gun';

import UserInputForm from './Components/UserInputForm/UserInputForm';
import Feed from './Components/Feed/Feed';

const server = `http://localhost:${9000 + Number(process.env.REACT_APP_ID)}/gun` 

// gun instance
const gun = Gun({
	localStorage : false,
	radisk : false,
	peers: [
		server
	]
});

function App() {
  const [posts, setPosts] = useState([]);
  const [counter, setCounter] = useState(0);

  function writePost(e) {
    e.preventDefault();
    const message = `${process.env.REACT_APP_ID}: ${counter}`;
    gun.get('Test').set(message);
    setCounter(counter+1);
  }
  
  useEffect(() => {
    const testing = gun.get('Test')
    testing.map().once(test => {
      setPosts(current => [test, ...current])
    })
  }, []);

  console.log(posts)

  return (
    <div className="App vh-100 vw-100">
      <button type="button" onClick={writePost} className="m-3 w-25 h-25" />
      {posts.map((testPost, index) => <p key={index}>{testPost}</p>)}
    </div>
  );
}

// function App() {
// 	// Local state (userID and feed to be displayed)
// 	const [userID, setUserID] = useState("");

// 	return (
// 		<div className="vw-100 vh-100 m-0 overflow-auto">
// 			{ /* Displays the UserInputForm if the userID is "" */ }
// 			{ 
// 			  userID === "" && 
// 				<div className="row m-0 h-50">
// 					<div className="col-6 d-flex flex-column p-4">
// 						<UserInputForm setUserID={setUserID} />
// 					</div>
// 				</div>
// 			}
// 			{ /* Displays the Board if the userID is not "" */ }
// 			{/* { userID !== "" && <UserInputForm setUserID={setUserID} />} */}
// 			{ userID !== "" && 
// 				<Feed gun={gun} userID={userID} feedID={"B"} />
// 			}
// 		</div>
// 	)
// }

export default App;
