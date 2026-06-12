
import React, { useState } from "react";
import "./App.css";

let idCounter = 1;

function Comment({
  comment,
  onReply,
  onEdit,
  onDelete,
  depth = 0,
}) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  const handleReply = () => {
    if (replyText.trim()) {
      onReply(comment.id, replyText);
      setReplyText("");
      setShowReplyInput(false);
    }
  };

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(comment.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <div className="comment" style={{ marginLeft: depth * 20 }}>
      {isEditing ? (
        <div className="comment-edit">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <>
          <p><strong>{comment.author}</strong>: {comment.text}</p>
          <div className="comment-actions">
            <button onClick={() => setShowReplyInput(!showReplyInput)}>Reply</button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(comment.id)}>Delete</button>
          </div>
        </>
      )}

      {showReplyInput && (
        <div className="reply-box">
          <textarea
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button onClick={handleReply}>Reply</button>
        </div>
      )}

      {comment.replies.map((reply) => (
        <Comment
          key={reply.id}
          comment={reply}
          onReply={onReply}
          onEdit={onEdit}
          onDelete={onDelete}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}

function App() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: idCounter++,
          author: "User",
          text: newComment,
          replies: [],
        },
      ]);
      setNewComment("");
    }
  };

  const handleReply = (parentId, text) => {
    const addReply = (items) =>
      items.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            replies: [
              ...item.replies,
              {
                id: idCounter++,
                author: "User",
                text,
                replies: [],
              },
            ],
          };
        } else {
          return {
            ...item,
            replies: addReply(item.replies),
          };
        }
      });
    setComments(addReply(comments));
  };

  const handleEdit = (id, newText) => {
    const edit = (items) =>
      items.map((item) => {
        if (item.id === id) {
          return { ...item, text: newText };
        } else {
          return { ...item, replies: edit(item.replies) };
        }
      });
    setComments(edit(comments));
  };

  const handleDelete = (id) => {
    const remove = (items) =>
      items.filter((item) => item.id !== id)
        .map((item) => ({ ...item, replies: remove(item.replies) }));
    setComments(remove(comments));
  };

  return (
    <div className="App">
      <h2>Nested Comment System</h2>
      <div className="new-comment">
        <textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={addComment}>Add Comment</button>
      </div>

      <div className="comment-list">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onReply={handleReply}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;