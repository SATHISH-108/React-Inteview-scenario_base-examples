// //1. by using useMemo + only seachInput not added search Button
// import React, { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// const FetchDataSearch = () => {
//   const [posts, setPosts] = useState([]);
//   const [searchItem, setSearchItem] = useState("");
//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const response = await axios.get(
//           "https://jsonplaceholder.typicode.com/posts",
//         );
//         // console.log("response", response.data);
//         setPosts(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getData();
//   }, []);
//   const filteredPosts = useMemo(() => {
//     return posts.filter(
//       (item) =>
//         item.title.toLowerCase().includes(searchItem.toLowerCase()) ||
//         item.body.toLowerCase().includes(searchItem.toLowerCase()),
//     );
//   }, [posts, searchItem]);

//   return (
//     <center>
// {/* SearchInput Without Search Burron}
//       <input
//         type="text"
//         placeholder="Search by title, body"
//         onChange={(e) => setSearchItem(e.target.value)}
//       />
//       <br />
//       <br />
//       <hr />
//       <hr />
//       <br />
//       <table border={1} cellPadding={10}>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Title</th>
//             <th>Body</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredPosts.map((eachPost, index) => {
//             const { id, body, title } = eachPost;
//             return (
//               <tr key={id}>
//                 <td>{index + 1}</td>
//                 <td>{title}</td>
//                 <td>{body}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </center>
//   );
// };

// export default FetchDataSearch;

//2. without useMemo searchInput+ search button.

import axios from "axios";
import React, { useEffect, useState } from "react";
const FetchDataSearch = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  useEffect(() => {
    const getData = async () => {
      try {
        let response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
        );
        setPosts(response.data); // store original data
        setFilteredPosts(response.data); //  initially show all
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const searchHandler = () => {
    const filtered = posts.filter(
      (item) =>
        item.title.toLowerCase().includes(searchItem.toLowerCase()) ||
        item.body.toLowerCase().includes(searchItem.toLowerCase()),
    );
    setFilteredPosts(filtered);
  };
  return (
    <center>
      {/* SearchInput + search Button */}
      <input
        type="text"
        placeholder="Search by title, body"
        onChange={(e) => setSearchItem(e.target.value)}
      />
      <input type="button" value="Search" onClick={searchHandler} />
      <hr />
      <hr />
      <br />
      <br />
      {filteredPosts.length === 0 ? (
        <div>
          <h3>There no posts..</h3>
        </div>
      ) : (
        <table border={1} cellPadding={10}>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((eachPost, index) => {
              const { id, title, body } = eachPost;
              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{title}</td>
                  <td>{body}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </center>
  );
};

export default FetchDataSearch;
