import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { Link, useParams } from "react-router-dom";
const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  const [showfollow, setShowFollow] = useState(
    state ? !state.following.includes(userid) : true
  );
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result)

        setProfile(result);
      });
  }, []);

  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };
  const unfollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));

        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item != data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        setShowFollow(true);
      });
  };
  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {userProfile ? (
        // <div className="mainbody">
        //   <div
        //     style={{
        //       display: "flex",
        //       justifyContent: "space-around",
        //       margin: "18px 0px",
        //       borderBottom: "1px solid grey",
        //     }}
        //   >
        //     <div>
        //       <img
        //         style={{
        //           width: "160px",
        //           height: "160px",
        //           borderRadius: "80px",
        //         }}
        //         src={userProfile.user.pic}
        //       />
        //     </div>
        //     <div>
        //       <h4>{userProfile.user.name}</h4>
        //       <h5>{userProfile.user.email}</h5>
        //       <div
        //         style={{
        //           display: "flex",
        //           justifyContent: "space-between",
        //           width: "108%",
        //         }}
        //       >
        //         <h6>{userProfile.posts.length} posts</h6>
        //         <h6>{userProfile.user.followers.length} followers</h6>
        //         <h6>{userProfile.user.following.length} following</h6>
        //       </div>
        //       {showfollow ? (
        //         <button
        //           style={{
        //             margin: "10px",
        //           }}
        //           className="btn waves-effect waves-light #64b5f6 blue darken-1"
        //           onClick={() => followUser()}
        //         >
        //           Follow
        //         </button>
        //       ) : (
        //         <button
        //           style={{
        //             margin: "10px",
        //           }}
        //           className="btn waves-effect waves-light #64b5f6 blue darken-1"
        //           onClick={() => unfollowUser()}
        //         >
        //           UnFollow
        //         </button>
        //       )}
        //     </div>
        //   </div>

        //   <div className="gallery">
        //     {userProfile.posts.map((item) => {
        //       return (
        //         <img
        //           key={item._id}
        //           className="item"
        //           src={item.photo}
        //           alt={item.title}
        //         />
        //       );
        //     })}
        //   </div>
        // </div>
        <div className="mainbody">
          <div className="wrapper">
            <div className="inlinearea prfl">
              <div className="colm prflsdtl">
                <div className="pfl-pnl">
                  <img
                    className="prfl_pic_others"
                    src={userProfile.user.pic}
                  ></img>
                  <h1>{userProfile.user.name}</h1>
                </div>
              </div>
              <div className="colm rgtcont">
                <div className="flows">
                  <div className="tablearea">
                    <p>{userProfile.posts.length} posts</p>

                    <div className="cell">
                      <p>
                        <strong>Following</strong>
                      </p>
                      <p>{userProfile.user.following.length}</p>
                    </div>
                    <div className="cell">
                      <p>
                        <strong>Followers</strong>
                      </p>
                      <p>{userProfile.user.followers.length}</p>
                    </div>
                  </div>
                </div>
                {showfollow ? (
                  <button
                    style={{
                      margin: "10px",
                    }}
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={() => followUser()}
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    style={{
                      margin: "10px",
                    }}
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={() => unfollowUser()}
                  >
                    UnFollow
                  </button>
                )}
                {/* <div className="flrsukno">
                <a href="#flrsuknos" className="open-popup-link">
                  <div className="tablearea">
                    <div className="cell">
                      <span className="pfl_pic"></span>
                      <span className="pfl_pic"></span>
                      <span className="pfl_pic"></span>
                    </div>
                    <div className="cell">
                      Followed by Amit Jaiswal, Susovon Jana, Aniruddha Das and 20
                      more...
                    </div>
                  </div>
                </a>
              </div> */}
              </div>
              <section className="colm blog_line">
                <div className="">
                  {userProfile.posts.map((item) => {
                    return (
                      <div className="blog_box" key={item._id}>
                        <section className="conts">
                          <div
                            className="imgs"
                            style={{
                              backgroundImage: "url(" + item.photo + ")",
                              // backgroundSize: "auto",
                            }}
                          ></div>

                          {/* <h5 style={{ padding: "5px" }}>
                          {item.postedBy._id == state._id && (
                            <i
                              className="material-icons"
                              style={{
                                float: "right",
                              }}
                              onClick={() => deletePost(item._id)}
                            >
                              delete
                            </i>
                          )}
                        </h5> */}

                          {/* <div className="card-content">
                          <i
                            className="material-icons"
                            style={{ color: "red" }}
                          >
                            favorite
                          </i>
                          {item.likes.includes(state._id) ? (
                            <i
                              className="material-icons"
                              onClick={() => {
                                unlikePost(item._id);
                              }}
                            >
                              thumb_down
                            </i>
                          ) : (
                            <i
                              className="material-icons"
                              onClick={() => {
                                likePost(item._id);
                              }}
                            >
                              thumb_up
                            </i>
                          )}

                          <h6>{item.likes.length} likes</h6>


                          
                          
                        </div> */}
                          <article className="cont_txt">
                            <div className="top_bar">
                              <div className="pstdtl">
                                <div className="">
                                  <span className="nms">
                                    <span className="pfl_pic"></span>
                                    <Link
                                      to={
                                        item.postedBy._id !== state._id
                                          ? "/profile/" + item.postedBy._id
                                          : "/profile"
                                      }
                                    >
                                      {item.postedBy.name}
                                    </Link>
                                  </span>
                                  <span className="tms">
                                    <i className="far fa-calendar-alt"></i>{" "}
                                    {item.updatedAt}
                                  </span>
                                  <span
                                    style={{
                                      alignItems: "flex-end",
                                    }}
                                  ></span>
                                </div>
                              </div>
                            </div>

                            <div className="mdl_bar">
                              <h4>{item.title}</h4>
                              <br />
                              <p>{item.body}</p>
                            </div>
                            <div className="btm_bar">
                              <section class="cmtlist">
                                {item.comments.map((record) => {
                                  console.log(record);
                                  return (
                                    <div class="tablearea vtop">
                                      <div class="cell pht">
                                        <span class="pfl_pic"></span>
                                      </div>
                                      <div class="cell cnt">
                                        <div class="pstdtl">
                                          <span class="nms">
                                            <Link
                                              to={
                                                item.postedBy._id !== state._id
                                                  ? "/profile/" +
                                                    item.postedBy._id
                                                  : "/profile"
                                              }
                                            >
                                              {record.postedBy.name}
                                            </Link>
                                          </span>
                                          <span class="tms">
                                            {record.createdAt}
                                          </span>
                                        </div>
                                        <p>{record.text}</p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </section>
                              <div class="cell cnt">
                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    makeComment(e.target[0].value, item._id);
                                    e.target[0].value = "";
                                  }}
                                >
                                  <input
                                    type="text"
                                    class="inputareaComment"
                                    placeholder="add a comment"
                                  />
                                  <button type="submit">
                                    <i class="far fa-paper-plane"></i>
                                  </button>
                                </form>
                              </div>
                            </div>
                          </article>
                        </section>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>
        </div>
      ) : (
        <h2>loading...!</h2>
      )}
    </>
  );
};

export default Profile;
