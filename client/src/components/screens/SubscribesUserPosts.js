import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/getsubpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      });
  }, []);

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
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
  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
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

  const deletePost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };
  return (
    <div className="mainbody">
      <div className="wrapper">
        <div className="inlinearea blgs">
          <section className="colm blog_line">
            <div className="">
              {data.map((item) => {
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
                <Link
                  to={
                    item.postedBy._id !== state._id
                      ? "/profile/" + item.postedBy._id
                      : "/profile"
                  }
                >
                  {item.postedBy.name}
                </Link>{" "}
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
              </h5>
 */}
                      <article className="cont_txt">
                        <div className="top_bar">
                          <div className="pstdtl">
                            {/* <div> */}
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
                              >
                                {item.postedBy._id == state._id && (
                                  <i
                                    className="material-icons"
                                    style={{
                                      float: "right",
                                    }}
                                    onClick={() => deletePost(item._id)}
                                  >
                                    Delete
                                  </i>
                                )}
                              </span>
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
                                            record.postedBy._id !== state._id
                                              ? "/profile/" +
                                                record.postedBy._id
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

                      {/* <div className="card-content">
                <i className="material-icons" style={{ color: "red" }}>
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
                <h6>{item.title}</h6>
                <p>{item.body}</p>
                {item.comments.map((record) => {
                  return (
                    <h6 key={record._id}>
                      <span style={{ fontWeight: "500" }}>
                        {record.postedBy.name}
                      </span>{" "}
                      {record.text}
                    </h6>
                  );
                })}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    makeComment(e.target[0].value, item._id);
                  }}
                >
                  <input type="text" placeholder="add a comment" />
                </form>
              </div>
             */}
                    </section>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
