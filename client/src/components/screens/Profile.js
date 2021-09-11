import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");
  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPics(result.mypost);
      });
  }, []);
  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "blog_post");
      data.append("cloud_name", "saikatcloud");
      fetch("https://api.cloudinary.com/v1_1/saikatcloud/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
              //window.location.reload()
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);
  const updatePhoto = (file) => {
    setImage(file);
  };
  return (
    <div className="mainbody">
      <div className="wrapper">
        <div className="inlinearea prfl">
          <div className="colm prflsdtl">
            <div className="pfl-pnl">
              <h1>
                {state ? state.name : "loading"}
                <span>({state ? state.email : "loading"})</span>
              </h1>
              <section className="img-box">
                <h5>Photo:</h5>
                <div className="row prfl_picrow">
                  <label>
                    <img
                      className="prfl_pic"
                      src={state ? state.pic : "loading"}
                    ></img>
                    <input
                      type="file"
                      onChange={(e) => updatePhoto(e.target.files[0])}
                    />
                    <samp>
                      <i className="fas fa-camera"></i> Change Photo
                    </samp>
                  </label>
                </div>
              </section>
              <section className="dtl-box">
                <h5>
                  Email ID:
                  <a href="javascript:void(0)">
                    <i className="fas fa-pen"></i>
                  </a>
                </h5>
                <div className="row">{state ? state.email : "loading"}</div>
                <div className="inpt">
                  <input
                    type="text"
                    className="inputarea"
                    placeholder="email"
                    value="`{state ? state.email : 'loading'}`"
                  />
                  <button type="submit">
                    <i className="far fa-save"></i>
                  </button>
                </div>
              </section>
              <section className="dtl-box">
                <h5>
                  About myself:{" "}
                  <a href="javascript:void(0)">
                    <i className="fas fa-pen"></i>
                  </a>
                </h5>
                <div className="row">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </div>
                <div className="inpt">
                  <textarea className="inputarea" placeholder="Description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </textarea>
                  <button type="submit">
                    <i className="far fa-save"></i>
                  </button>
                </div>
              </section>
            </div>
          </div>
          <div className="colm rgtcont">
            <div className="box chgpass">
              <h5>Change Password:</h5>
              <form>
                <div className="row">
                  <input
                    type="password"
                    className="inputarea"
                    placeholder="Old Password"
                  />
                </div>
                <div className="row">
                  <input
                    type="password"
                    className="inputarea"
                    placeholder="New Password"
                  />
                </div>
                <div className="row">
                  <input
                    type="password"
                    className="inputarea"
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="row">
                  <button type="submit" className="btns full roundshape">
                    Change Password
                  </button>
                </div>
              </form>
            </div>

            <div className="flows">
              <div className="tablearea">
                <div className="cell">
                  <p>
                    <a href="#following" className="open-popup-link">
                      <strong>Following</strong>
                    </a>
                  </p>
                  <p>{state ? state.following.length : "0"}</p>
                </div>
                <div className="cell">
                  <p>
                    <a href="#follower" className="open-popup-link">
                      <strong>Followers</strong>
                    </a>
                  </p>
                  <p>{state ? state.followers.length : "0"}</p>
                </div>
              </div>
            </div>
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
        </div>
      </div>
    </div>
    // <div style={{ maxWidth: "550px", margin: "0px auto" }}>
    //   <div
    //     style={{
    //       margin: "18px 0px",
    //       borderBottom: "1px solid grey",
    //     }}
    //   >
    //     <div
    //       style={{
    //         display: "flex",
    //         justifyContent: "space-around",
    //       }}
    //     >
    //       <div>
    //         <img
    //           style={{ width: "160px", height: "160px", borderRadius: "80px" }}
    //           src={state ? state.pic : "loading"}
    //         />
    //       </div>
    //       <div>
    //
    //         <div
    //           style={{
    //             display: "flex",
    //             justifyContent: "space-between",
    //             width: "108%",
    //           }}
    //         >
    //           <h6>{mypics.length} posts</h6>
    //           <h6>{state ? state.followers.length : "0"} followers</h6>
    //           <h6>{state ? state.following.length : "0"} following</h6>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="file-field input-field" style={{ margin: "10px" }}>
    //       <div className="btn #64b5f6 blue darken-1">
    //         <span>Update pic</span>
    //         <input
    //           type="file"
    //           onChange={(e) => updatePhoto(e.target.files[0])}
    //         />
    //       </div>
    //       <div className="file-path-wrapper">
    //         <input className="file-path validate" type="text" />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="gallery">
    //     {mypics.map((item) => {
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
  );
};

export default Profile;
