import 'bootstrap/dist/css/bootstrap.min.css';
import Gun from 'gun';

import Feed from './Components/Feed/Feed';

const name = process.env.REACT_APP_NAME
const server = `http://localhost:${9000 + Number(process.env.REACT_APP_ID)}/gun` 

// gun instance
const gun = Gun({
	localStorage : false,
	radisk : false,
	peers: [
		server
	]
});

// function App() {
//   const [posts, setPosts] = useState([]);
//   const [counter, setCounter] = useState(0);

//   function writePost(e) {
//     e.preventDefault();
//     const message = `${process.env.REACT_APP_ID}: ${counter}`;
//     gun.get('Test').set(message);
//     setCounter(counter+1);
//   }
  
//   useEffect(() => {
//     const testing = gun.get('Test')
//     testing.map().once(test => {
//       setPosts(current => [test, ...current])
//     })
//   }, []);

//   console.log(posts)

//   return (
//     <div className="App vh-100 vw-100">
//       <button type="button" onClick={writePost} className="m-3 w-25 h-25" />
//       {posts.map((testPost, index) => <p key={index}>{testPost}</p>)}
//     </div>
//   );
// }


function App() {
	return (
		<div className="vw-100 vh-100 m-0 overflow-auto">
			{ name !== "" && 
				<Feed gun={gun} userID={name} feedID={name} />
			}
      
		</div>
	)
}

export default App;
