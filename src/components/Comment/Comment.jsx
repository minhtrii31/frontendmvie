import React, { useEffect, useState } from "react";
import "./Comment.css";
import { getCommentByMovie, postComment } from "../../services/comment.service";
import { toast } from "sonner";

function Comment({ movieId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleUpComment = async () => {
    if (!text) {
      return;
    }
    try {
      const response = await postComment(movieId, text, user);
      if (response) {
        window.location.reload();
      } else {
        return;
      }
    } catch (error) {
      toast.error("Error post comment: ", error);
    }
  };

  useEffect(() => {
    getCommentByMovie(movieId)
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [movieId]);
  return (
    <div className="comment">
      <div className="comment-list">
        {comments.map((comment) => (
          <div key={comment._id}>
            <p className="comment-user">{comment.user.name}</p>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
      <div className="comment-area">
        {user ? (
          <>
            <div className="comment-user">From: {user.name}</div>
            <textarea
              name="Text1"
              cols="40"
              rows="4"
              className="comment-input"
              placeholder="Express your feelings about the movie..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="buttonStyle"
              style={{ margin: "10px 0" }}
              onClick={handleUpComment}
            >
              Submit
            </button>
          </>
        ) : (
          <h4 style={{ textAlign: "center", padding: "30px 0" }}>
            You need login to comment
          </h4>
        )}
      </div>
    </div>
  );
}

export default Comment;
