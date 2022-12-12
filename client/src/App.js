import 'bootstrap/dist/css/bootstrap.min.css';

import Feed from './Components/Feed/Feed';


const name = process.env.REACT_APP_NAME
const server = `ws://localhost:${4000 + Number(process.env.REACT_APP_ID)}/`
const ws = new WebSocket(server)

function App() {

	// const feeds = [];
	// if (name !== "") {
	// 	feeds.push(name);
	// }

	return (
		<div className="vw-100 vh-100 m-0 overflow-auto">
			{ name !== "" && 
				// <Feed gun={gun} userID={name} feedID={name} />
				<Feed ws={ws} userID={name} feedID={name} />
			}
		</div>
	)
}

export default App;
