import {firestore} from './firebase'


export const setPost = (postID, post) => 
  firestore.collection("posts").doc(postID + "").set(post)


export const loadPosts = (limit) =>
  firestore.collection("posts").limit(limit).get()

export const loadMorePosts = (limit, lastDoc) =>
  firestore.collection("posts").startAfter(lastDoc).limit(limit).get()


export const removePost = (postID) =>
  firestore.collection("posts").doc(postID).delete()