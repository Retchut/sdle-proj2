import { useState, useEffect, useReducer } from 'react';

import NewPostForm from '../NewPostForm/NewPostForm';

/**
 * @brief Function which updates the state (posts). Used by the useReducer hook
 * @param {Object} state - The current state
 * @param {Object} post - post to append to the state
 * @returns The updated state
 */
function postReducer(state, post) {
	return {
		posts: [post, ...state.posts]
	}
}

export default function Feed(props){
    const gun = props.gun;
    const userID = props.userID;
    const feedID = props.feedID;

    // posts state
	const [feedPosts, dispatch] = useReducer(postReducer, { posts: [] });

	// update state on the user's posts node when the state changes
	useEffect(() => {
		// gets the posts node
		const posts = gun.get(feedID).get('posts');

		// upon receiving updates from the posts node, calls a function on each update
		posts.map().once(post => {
			// updates the local feed
			dispatch({
				id: post.id,               // sender id
				post: post.post,           // their post
				timestamp: post.timestamp  // post timestamp
			})
		})
	}, [userID]);

	/**
	 * @brief Saves post to the posts node
	 */
	function savePost(newPost) {
		// gets the posts node
		const posts = gun.get(userID).get("posts");

		// Adds an entry to the node
		posts.set({
			id: newPost.id,    // TODO: is the parameter name inside gun id?
			post: newPost.post,  // TODO: is the parameter name inside gun post?
			timestamp: Date.now()  // TODO: is the parameter name inside gun timestamp?
		})
	}

    /**
     * Transforms a timestamp into a human readable date
     * @param {Number} timestamp - milisseconds since epoch
     * @returns String representing the timestamp in a human readable format
     */
    const getDateString = (timestamp) => {
        const humanReadableDate = new Date(timestamp).toUTCString();
        return humanReadableDate.slice(0, humanReadableDate.length - 4);
    }

    return (
        <div id={1} className="col-6 d-flex flex-column p-4">
            <div className="row">
                <h3 className="w-auto">{feedID}'s feed</h3>
            </div>
            <div className="row flex-grow-1">
                <div className="row">
                    { userID === feedID && 
                        <NewPostForm id={userID} savePost={savePost} />
                    }
                </div>
                <div className="row">
                    <div className="h-100 d-flex flex-column align-items-center overflow-auto">
                    {
                        feedPosts.posts.map((post, index) => (
                        <div key={`post-` + index} className="my-2 pt-2 px-3 bg-secondary rounded">
                            <h2>From: {post.id}</h2>
                            <p>{getDateString(post.timestamp)}</p>
                            <p>{post.post}</p>
                        </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}

// Don't delete the next few posts of comments pls :) - Mário

// const buildRows = () => {
// 	let rowArray = [];
// 	const colNum = 2;

// 	for(let i = 0; i < subscribedFeeds.length; i++){
// 		if(i % colNum === 0){
// 			rowArray.push([subscribedFeeds[i]]);
// 		}
// 		else{
// 			rowArray[Math.floor(i/colNum)].push(subscribedFeeds[i]);
// 		}
// 	}

// 	return rowArray;
// }


// return (
//   <div className="vw-100 vh-100 m-0 overflow-auto">
//     {getNodeRows(nodes).map(row => {
//       return (
//         <div className="row m-0 h-50">
//           {row.map(node => <Node nodeData={node} />)}
//         </div>
//       )
//     })}
//   </div>
// );