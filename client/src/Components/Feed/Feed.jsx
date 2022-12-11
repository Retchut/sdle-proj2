import { useState, useEffect, useMemo } from 'react';

import NewPostForm from '../NewPostForm/NewPostForm';
import SubscribeForm from '../SubscribeForm/SubscribeForm';

export default function Feed(props){
    const gun = props.gun;
    const userID = props.userID;
    const feedID = props.feedID;

    // posts state
    const [feedPosts, setFeedPosts] = useState([])

	// update state on the user's posts node when the state changes
	useEffect(() => {
		// gets the posts node
		// const posts = gun.get(feedID);
		const posts = gun.get(feedID).get('posts');
        const subscriptions = gun.get(feedID).get('subscriptions');

		// upon receiving updates from the posts node, calls a function on each update
		posts.map().once(post => {
            console.log(post)
			// updates the local feed
            const newPost = {
				id: post.id,               // sender id
				post: post.post,           // their post
				timestamp: post.timestamp  // post timestamp
			};

			setFeedPosts( oldFeedPosts =>[newPost, ...oldFeedPosts])
		})

        subscriptions.map().once((value) => {
            gun.get(value).get('posts').map().once((post) => {
                const newPost = {
                    id: post.id,               // sender id
                    post: post.post,           // their post
                    timestamp: post.timestamp  // post timestamp
                };

                setFeedPosts(oldFeedPosts => [newPost, ...oldFeedPosts])
            });
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const orderedFeedPosts = useMemo(() => feedPosts.sort((p1, p2) => p2.timestamp - p1.timestamp), [feedPosts])

	/**
	 * @brief Saves post to the posts node
	 */
	function savePost(newPost) {
		// const posts = gun.get(userID);
		const posts = gun.get(userID).get("posts"); 

		// Adds an entry to the node
		posts.set({
			id: newPost.id,    // TODO: is the parameter name inside gun id?
			post: newPost.post,  // TODO: is the parameter name inside gun post?
			timestamp: Date.now()  // TODO: is the parameter name inside gun timestamp?
		})
	}

    	/**
	 * @brief Saves user to be subscriptions node
	 */
	function saveSubscription(newSubscription) {
		// gets the posts node
		const subscriptions = gun.get(userID).get("subscriptions");
		// Adds an entry to the node
		subscriptions.set(
			newSubscription.subscription
        )
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
        <div className='row'>
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
                            orderedFeedPosts.map((post, index) => (
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
            <div className="col-6 d-flex flex-column p-4">
                <SubscribeForm id={userID} saveSubscription={saveSubscription} />
            </div>
        </div>
    );
}