import React from "react";
import { Card, CardBody } from "reactstrap";
import timeSince from "../../helpers/timeSince";
import CommentList from "./Comments/CommentList";
import CommentForm from "./Comments/NewComment";
import EditPostItem from "./EditPost";
// import ContextConsumer from "../../context/context";
import useVisualMode from "../../hooks/useVisualMode";
import Likes from './Likes';
import styles from './PostListItem.module.scss'
import { Link, NavLink } from 'react-router-dom';

const SHOW = "SHOW";
// const CONFIRM = "CONFIRM";
// const SAVING = "SAVING";
const EDITING = "EDITING";
// const ERROR_SAVE = "ERROR_SAVE";
// const ERROR_DELETE = "ERROR_DELETE";

function PostListItem(props) {
  const { mode, transition } = useVisualMode(SHOW);

  function onDelete() {
    props.deletePost(props.post.post_id);
    // transition(EDITING);
  }

  function onEdit() {
    transition(EDITING);
  }

  function onSaveEdit() {
    transition(SHOW);
  }

  // function onCancel() {
  //   back();
  // }
  const commentData = props.comments.filter((comment) => {
    if (props.post.post_id === comment.post_id) {
      return comment;
		}
		
  });

	const stack = props.post.stack.map((tech_stack, index) => {
    return (
      <li className="list" key={index}>
        {tech_stack}&nbsp;
      </li>
    );
	});

				const commentList = commentData.map((comment, index) => {
					return (
						<div
							key={index}
						>
							<CommentList
								index={props.index}
								avatar={comment.avatar}
								username={comment.username}
								text_body={comment.text_body}
								removeComment={props.removeComment}
								editComment={props.editComment}
								currentUser={props.currentUser}
								comment={comment}
								post={props.post}
							/>
							<CommentForm 
							post={props.post}
							currentUser={props.currentUser}
							/>
						</div>
					);
				});

				const myPost = props.currentUser.id === props.post.owner_id ;

				const timeAgo = timeSince(props.post.time_posted);
        return (
					<Card accent="Info">
						<div className={styles.dashboard}>
							{mode === SHOW && (
								<CardBody className={styles.postbody}>
								{ myPost ?
								<div>
									<div
									// className={styles.bluebutton}
									// className={styles.buttontransition} 
									// className={styles.editbtn}  className={styles.floatright}
									onClick={onEdit}
									>
									Edit
									</div>
									<div 
									// className={styles.bluebutton}className={styles.deletebuttontransition}className={styles.deletebtn}
									// className={styles.floatright} 
									onClick={onDelete}>Delete</div> 
								</div> : ""
								}

								{/* USERS DETAILS */}

								<Link className={styles.userlink} to={{
									pathname:`/profile/${props.post.username}`,
									search: "?sort=name",
									hash: "#the-hash",
									state: { id: props.post.owner_id }}}>
									<div className={styles.usercard}>
										<div className={styles.circle}>
											<img src={props.post.avatar} alt="avatar"></img>
										</div>
										<span className={styles.bg}>
											<h3>{props.post.username}</h3>
										</span>
									</div>
								</Link>
								<Link className={styles.onlinelink} to={{
									pathname:`/profile/${props.post.username}`,
									search: "?sort=name",
									hash: "#the-hash",
									state: { id: props.post.owner_id }}}>
									<span>{props.post.active ? <h6>User is online</h6> : <h6>User is offline</h6>}
									</span>
								</Link>
								{/* MESSAGE BUTTON */}
								<div className={styles.messagebutton}>
									<NavLink
										className={styles.userlink}
										to={{
										pathname:'/messages/',
										state: {username: props.post.username }
									}}
									>
										<div className={styles.bluebutton}
										>Message User</div>
									</NavLink>
								</div>
								<small className={styles.floatright}>{timeAgo}</small>
								</CardBody>
							)}

							{/* POST TEXT BODY */}
							{mode === SHOW && (
								<p className={styles.textbody}>{props.post.text_body}</p>
							)}

							{mode === EDITING && (
								<EditPostItem
									id={props.post.post_id}
									time_posted={props.post.time_posted}
									text_body={props.post.text_body}
									stack={props.post.stack}
									onSaveEdit={onSaveEdit}
									user={props.currentUser}
									updatePost={props.updatePost}
								/>
							)}
							<h5 className={styles.stack}> {stack}</h5>

							<div className={styles.wrapcollabsible}>
								<input
									id={"collapsible" + props.index}
									className="toggle"
									type="checkbox"
								/>
								<label htmlFor={"collapsible" + props.index} className={styles.lbltoggle}>
									Comments
								</label>
								<div className={styles.collapsiblecontent}>
									<div className={styles.contentinner}>
										{commentList}
									</div>
								</div>
							</div>
							<div>
								<Likes 
									currentUser={props.currentUser}
									likes={props.likes}
									post={props.post}
									addLike={props.addLike}
									removeLike={props.removeLike}
								/>
							</div>
						</div>
					</Card>
        );
}

export default PostListItem;
