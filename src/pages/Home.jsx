import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { BASE_URL, BASE_URL1 } from "../config";
import { postsContext, todosContext, usersContext } from "../context/Store"

export default function Home() {
    let { users } = useContext(usersContext);
    let { todos } = useContext(todosContext);
    let { posts, setPosts } = useContext(postsContext);
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState({});
    const userData = JSON.parse(localStorage.getItem("userData"));

    console.log("comments:", comments);
    console.log("user data:", userData);



    const handleAddTag = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trimEnd()]);
            }
            setTagInput("");
        }
    }

    const handleLike = (postId) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId
                    ? { ...post, reactions: { ...post.reactions, likes: post.reactions.likes + 1 } }
                    : post
            )
        );
        // Optional: Send the updated likes to the backend
        // axios.patch(`${BASE_URL}/posts/${postId}`, { likes: newLikeCount });
    };
    const handleDislike = (postId) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId
                    ? { ...post, reactions: { ...post.reactions, dislikes: post.reactions.dislikes + 1 } }
                    : post
            )
        );
        // Optional: Send the updated likes to the backend
        // axios.patch(`${BASE_URL}/posts/${postId}`, { likes: newLikeCount });
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    }

    const handlePost = async () => {
        try {
            const PostData = {
                title: postTitle,
                body: postContent,
                userId: userData.id,
                tags: tags,
                reactions: {
                    likes: 0,
                    dislikes: 0
                },
                views: 0
            };

            const { data } = await axios.post(`${BASE_URL}/posts/add`, PostData);
            console.log("Post created:", data);
            setPosts(prevPosts => {
                const updatedPosts = prevPosts.map(post => {
                    // Example: Modify the title of every existing post
                    return { ...post, title: post.title.toUpperCase() };
                });

                return [data, ...updatedPosts];
            });
            setPostTitle("");
            setPostContent("");
            setTags([]);
        } catch (error) {
            console.error("Error creating post", error);
        }
    }
    const showComments = async () => {
        try {
            let { data } = await axios.get(`${BASE_URL}/comments`);
            setComments(data.comments);
        } catch (error) {
            console.error("Error show comments", error);
        }
    }
    const handleAddComment = (postId) => {
        const newComment = {
            id: comments.length + 1, // Or generate a unique ID if possible
            body: commentText[postId],
            userId: 1, // assuming a user ID
            postId: postId,
            likes: 0,
            user: {
                id: userData.id,
                username: userData.fullName,
                fullName: `${userData.firstName} ${userData.lastName}`,
                image: userData.image
            }
        };

        // Update the comments state with the new comment
        setComments((prevComments) => [...prevComments, newComment]);

        // Clear the input for that post
        setCommentText((prev) => ({
            ...prev,
            [postId]: ""
        }));
    };

    const handleCommentChnage = (postId, e) => {
        setCommentText(prev => ({
            ...prev,
            [postId]: e.target.value
        }))
    }
    useEffect(() => { showComments() }, [])
    return (
        <section className="contianer-fluid home row">
            <div className="col-md-2 left-side-bar" style={{
                background: 'white', padding: '20px 0 0 15px',
                height: '100vh', borderRadius: '10px', marginTop: '10px', position: 'sticky', top: '55px', left: '0'
            }}>
                <ul className='list-unstyled' style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'space-between', height: 'auto', paddingLeft: '20px' }}>
                    <Link to={'/users'} >
                        <li>
                            <i className="fa-solid fa-user-group"></i>
                            <span className="custom-text">Users</span>
                        </li>
                    </Link>
                    <Link to={'/quotes'}>
                        <li>
                            <i className="fa-solid fa-quote-left"></i>
                            <span className="custom-text">Qoutes</span>

                        </li>
                    </Link>
                    <Link to={'/todo'}>
                        <li>
                            <i className="fa-solid fa-table-list"></i>
                            <span className="custom-text">To do list</span>

                        </li>
                    </Link>
                    <Link to={'/recipes'}>
                        <li>
                            <i className="fa-solid fa-bowl-food"> </i>
                            <span className="custom-text">Recipes</span>
                        </li>
                    </Link>
                </ul>

            </div>
            <div className="col-md-7 posts">
                <div className="creatPost card my-2 mx-3 p-3" style={{ background: 'white', borderRadius: '10px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                    <form className='d-flex flex-column' action="">
                        <h4 style={{ textAlign: 'center', color: 'black', fontSize: 'large', fontWeight: 'bold' }}>Create Post</h4>
                        <input style={{ padding: '10px', borderRadius: '10px', border: 'solid 1px gray', marginTop: '10px' }}
                            id='Ptitle'
                            type="text"
                            placeholder='Title'
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)} />
                        <input style={{ padding: '40px 8px', borderRadius: '10px', border: 'solid 1px gray', margin: '20px 0' }}
                            id='Pcontent'
                            type="text-area"
                            placeholder='What is in you mind..?!'
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Type tag and press Enter"
                            style={{ padding: '10px', marginBottom: '20px', borderRadius: '10px', border: 'solid 1px gray' }}
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleAddTag}
                        />
                        <div className="d-flex flex-wrap gap-2 mt-2 mb-3">
                            {tags.map((tag, idx) => (
                                <span key={idx} className="badge bg-secondary d-flex align-items-center">
                                    {tag}
                                    <i
                                        className="fa fa-times ms-2"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => removeTag(tag)}
                                    ></i>
                                </span>
                            ))}
                        </div>
                        <div className="btn btn-info"
                            onClick={handlePost}>Post</div>
                    </form>
                </div>
                <div className="showPosts" style={{ padding: '20px' }}>
                    {posts ? (posts.map((post) => (
                        <div key={post.id} className="card mb-3 p-3" style={{ background: 'white', borderRadius: '10px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                            <h5>{post.title}</h5>
                            <p className="text-muted">{post.body}</p>

                            <div className="d-flex flex-wrap gap-2 mb-2">
                                {post.tags.map(tag => (
                                    <span key={tag} className="badge bg-primary text-light">{tag}</span>
                                ))}
                            </div>

                            <div className="d-flex justify-content-between align-items-center mt-2" style={{ fontSize: '14px', color: 'gray' }}>
                                <span onClick={() => handleLike(post.id)} style={{ cursor: "pointer" }}>
                                    <i className="fa-regular fa-thumbs-up me-1"></i> {post.reactions.likes} Likes
                                </span>
                                <span onClick={() => handleDislike(post.id)} style={{ cursor: "pointer" }}>
                                    <i className="fa-regular fa-thumbs-down me-1"></i> {post.reactions.dislikes} Dislikes
                                </span>                            </div>
                            <div>
                                <h6 style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '20px' }}>Comments</h6>

                                <div className="addComment">
                                    <input
                                        style={{ padding: '20px 8px', borderRadius: '10px', border: 'solid 1px gray', margin: '20px 0', width: '100%' }}
                                        id='Ccontent'
                                        type="text-area"
                                        placeholder='Add your comment'
                                        value={commentText[post.id] || ""} // Ensure it uses the correct comment for the post
                                        onChange={(e) => handleCommentChnage(post.id, e)} // Update the comment text
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleAddComment(post.id);
                                            }
                                        }}
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                                        <button style={{ fontSize: 'small' }}
                                            onClick={() => handleAddComment(post.id)}
                                            disabled={!commentText[post.id]}
                                            className='btn btn-info'>Add Comment</button>
                                    </div>
                                    {comments
                                        .filter(comment => comment.postId === post.id)
                                        .map(comment => (
                                            <div key={comment.id} style={{
                                                height: 'auto', padding: '10px', borderRadius: '10px', background: 'white',
                                                display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'
                                            }}>
                                                <div style={{ width: '100%' }}>
                                                    <img
                                                        src={comment.user.image}
                                                        alt={`${comment.user.firstName} ${comment.user.lastName}`}
                                                        width="50"
                                                        height="50"
                                                        style={{ borderRadius: "50%", objectFit: "cover", marginRight: "10px" }}
                                                    />
                                                </div>
                                                <div style={{ width: '100%', textAlign: 'center' }}>{comment.body}</div>
                                                <div style={{ width: '100%', fontSize: 'medium', fontWeight: 'bold' }}>{comment.user.fullName}</div>

                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                        </div>
                    ))) : (<p> Loading... </p>)}
                </div>
            </div>
            <div className="col-md-3 right-side-bar py-2" style={{
                fontSize: 'medium', position: 'sticky', top: '50px', right: '0', height: '100vh', overflow: 'hidden'
            }}>
                <div style={{
                    height: '100vh',
                    overflowY: 'auto',
                    paddingRight: '10px',
                    display: 'flex', flexDirection: 'column', justifyContent: 'start'
                }}>
                    <div className="users" style={{ background: 'white', padding: '10px 15px', borderRadius: '10px', height: 'auto' }}>
                        <p style={{ color: 'gray', textAlign: 'left' }}>suggested for you</p>
                        {users ? (users.slice(0, 2).map((user) => (
                            <div className="users-home" key={user.id} style={{ fontSize: 'small', display: 'flex', alignItems: 'start', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left', width: '100%' }} className="mb-4">
                                <img
                                    src={user.image}
                                    alt={`${user.firstName} ${user.lastName}`}
                                    width="50"
                                    height="50"
                                    style={{ borderRadius: "50%", objectFit: "cover", marginRight: "10px" }}
                                />
                                <div>
                                    <strong>{user.firstName} {user.lastName}</strong>
                                    <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>
                                        Gender: {user.gender}
                                    </p>
                                </div>
                            </div>
                        ))) : (<p>Loading...</p>)}
                        <Link to={'/users'}>
                            <p style={{ color: 'gray', textDecoration: 'none', marginBottom: '0' }}>See More</p>
                        </Link>
                    </div>
                    <div className="todos" style={{ background: 'white', padding: '15px', borderRadius: '10px', margin: '10px 0 10px 0', height: 'auto' }}>
                        <p style={{ color: 'gray', textAlign: 'left' }}>To do list</p>
                        {todos ? (todos.slice(0, 2).map((todo) => (
                            <div key={todo.id} className="d-flex align-items-center mb-3">
                                <div>
                                    <p>{todo.todo}</p>
                                    <p style={{ textAlign: 'left' }}>Completed? {todo.completed ? (<i style={{ fontSize: 'large', fontWeight: 'bold', color: 'green' }} className="fa-solid fa-check"></i>) :
                                        <i style={{ fontSize: 'large', fontWeight: 'bold', color: 'red' }} className="fa-solid fa-xmark"></i>}</p>
                                </div>
                            </div>
                        ))) : (<p>Loading ...</p>)}
                        <Link to={'/todo'}>
                            <p style={{ color: 'gray', textDecoration: 'none' }}>See More</p>
                        </Link>
                    </div>
                </div>
            </div>
        </section >
    )
}