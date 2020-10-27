import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import styles from './Likes.module.scss'


export default function Likes(props) {
	const postLikes = props.likes.filter(
    (like) => props.post.post_id === like.post_id
  );

	const likeSum = postLikes.length;
	
	const myLikes = postLikes.filter(
		(like) => props.currentUser.id === like.liker_id
	);

	const iAlreadyLikeThis = myLikes.length > 0;

	return (
		<div>
			 <div className={styles.likes}>
				{iAlreadyLikeThis ? (
					<FontAwesomeIcon 
					onClick={() => props.removeLike(props.post.post_id, props.currentUser.id)}
					className="unlove"
					icon={fasHeart} size="1x" />
				) : (                  
					<FontAwesomeIcon 
						onClick={() => props.addLike(props.post.post_id, props.currentUser.id)}
						className="love"
						icon={farHeart} size="1x" />
				)}

				<div className={styles.likescomments}>
					{/* LIKE COUNT */}

					{iAlreadyLikeThis && likeSum > 1 ? 
						<p onClick={() => props.removeLike(props.post.post_id, props.currentUser.id)}>
						<b>You and {likeSum - 1} others</b></p> : ""}

					{!iAlreadyLikeThis && likeSum > 1 ? 
						<p onClick={() => props.addLike(props.post.post_id, props.currentUser.id)}>
						<b>{likeSum}  likes</b></p> : ""}

					{iAlreadyLikeThis && likeSum === 1 ? 
						<p                       onClick={() => props.removeLike(props.post.post_id, props.currentUser.id)}>
						<b>You like this</b></p> : ""}

					{!iAlreadyLikeThis && likeSum === 1 ? 
					<p onClick={() => props.addLike(props.post.post_id, props.currentUser.id)}><b>{likeSum} like</b></p> : ""}
					
				</div>
			</div>
		</div>
	);
};
