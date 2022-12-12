import { useState, useMemo } from 'react';
import { Buffer } from "buffer";

import NewPostForm from '../NewPostForm/NewPostForm';
import SubscribeForm from '../SubscribeForm/SubscribeForm';

export default function Feed(props){
    const userID = props.userID;
    const feedID = props.feedID;
    const ws = props.ws;

    // posts state
    const [feedPosts, setFeedPosts] = useState([])

    ws.onmessage = (newPost) => {
        newPost = JSON.parse(newPost.data)
        console.log(newPost)
        // if it's the result of our post, we 
        if(newPost._ === undefined){
            setFeedPosts(oldFeedPosts =>[newPost, ...oldFeedPosts])
        }
        else{
            let found = false;
            for(const post of feedPosts){
                if(post._ === undefined)
                    continue;
                if(post._['#'] === newPost._['#']){
                    found = true;
                    break;
                }
            }
            if(!found)
                setFeedPosts(oldFeedPosts =>[newPost, ...oldFeedPosts])
        }
    };

    const orderedFeedPosts = useMemo(() => feedPosts.sort((p1, p2) => p2.timestamp - p1.timestamp), [feedPosts])

	/**
	 * @brief Saves post to the posts node
	 */
	function savePost(newPost) {
        const obj = {
            operation : 'post',
            data : {
                id : newPost.id,
                post : newPost.post,
                timestamp : Date.now()
            }
        }
        ws.send(Buffer.from(JSON.stringify(obj)));
	}

    	/**
	 * @brief Saves user to be subscriptions node
	 */
	function saveSubscription(newSubscription) {
        const obj = {
            operation : 'subscribe',
            data : newSubscription.subscription
        }
        ws.send(Buffer.from(JSON.stringify(obj)));
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