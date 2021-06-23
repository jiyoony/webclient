import React, { useEffect, useState } from "react";
import { ytsApi } from "../api"

const { detail } = ytsApi

const Info = (params) => {
  const { info } = params
   const { id, title, rating, year, runtime, slug, genres = [], description_full } = info;
   const img_url = `http://127.0.0.1:4000/img-yts/assets/images/movies/${slug?.replace(
      /-/gi,
      "_"
   )}/large-cover.jpg`;
   const [likeCount, setLikeCount] = useState(0)

   useEffect(() => {
      if (id !== undefined) {
         setLikeCount(undefined)
         detail({ movie_id: id })
            .then(({ data }) => {
               console.log('data', data)
               const { movie } = data?.data
               const { like_count } = movie
               setLikeCount(like_count)
            })
      } else {
         setLikeCount(0)
      }
   }, [id, slug])

   return (
      <div>
         <div style={{
            display: 'flex',
            flex: 1,
            height: 400,
            flexFlow: 'column',
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${img_url})`
         }}>
            <div style={{ marginTop: 'auto', padding: 4 }}>
               <span style={{ backgroundColor: 'red', borderRadius: '4px', color: 'white', fontWeight: 'bold', padding: 4 }}>{year}년 개봉</span>
            </div>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white', padding: 8, marginTop: 4  }}>
               <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
                  {title}
               </div>
               <div>
                  {genres.join(", ")}
               </div>
            </div>
         </div>
         <div style={{ background: "black", color: 'white', padding: '16px'}}>
            <div>
               <div style={{ fontWeight: 'bold', fontSize: '18px' }}>영화 정보</div>
               <div style={{ display: 'flex' }}>
                  <span style={{ flex: 1 }}>{runtime}분</span>
                  <span style={{ flex: 1 }}>평점: {rating}</span>
                  {likeCount !== undefined && <span style={{ flex: 1 }}>좋아요: {likeCount}</span>}
               </div>
            </div>
            <div style={{ marginTop: '25px' }}>
               <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
                  줄거리
               </div>
               <div>
                  {description_full}
               </div>
            </div>
         </div>
         
      </div>
   );
};

export default Info;