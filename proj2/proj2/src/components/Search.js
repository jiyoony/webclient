import React, { useEffect, useState } from "react";
import Movie from './Movie2';
import { MdAdd } from 'react-icons/md';
import "./Search.scss";
// import Info from './info';
import TodoTemplate from './TodoTemplate';
import axios from 'axios';

const ytsApi = {
  search: (params) =>axios.get('https://movie-app-20191313.herokuapp.com/yts/api/v2/list_movies.json',{
    params: Object.keys(params).reduce((prev,key)=>{
      let value=params[key];
      if(key==="sort_by"){
        switch (value) {
          case "like":
              value='like_count'
            break;
        }
      }
      return({...prev,[key]:value})
    },{})
  }),
  detail:(params)=>axios.get('http://movie-app-20191313.herokuapp.com/yts/api/v2/list_movies.json',{
    params
  })
}

const { detail } = ytsApi

const Info = (params) => {
  const { info } = params
   const { id, title, rating, year, runtime, slug, genres = [], description_full } = info;
   const img_url = `https://movie-app-20191313.herokuapp.com/img-yts/assets/images/movies/${slug?.replace(
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
              //  const { like_count } = movie
              //  setLikeCount(like_count)
            })
      } else {
         setLikeCount(0)
      }
   }, [id, slug])

   return (
      <div>
         <div style={{
            padding: 4,
            display: 'flex',
            flex: 1,
            height: 220,
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

class Search extends React.Component {
  state = {
    isLoading: false,
    movies: [],
    value: "",
    name: "영화 검색",
    info: undefined,
  };

  getSearchMovie = () => {
    console.log("search Movie");
    const search = this.state.value;

    try {
       if (search === "") {
          this.setState({ movies: [], isLoading: false });
       } else {
          /*
        초반에 movies를 초기화 하기보다는 loading 상태값만 둬서 처리해 렌더링 최소화
        기존과 같은 방식이면 렌더링 여러번 발생.
      */
          this.setState({ isLoading: true });
          // naverMoviesApi.search(search).then(({ data }) => {
          //    const { items } = data;
          //    this.setState({ movies: items, isLoading: false });
          //    console.log(items);
          // });
          const [sort_by, count] = search.split(" ")
          ytsApi.search({
             sort_by: sort_by,
             order_by: 'desc',
             limit: count
          }).then(({ data }) => {
             const { movies } = data.data
             this.setState({ movies, isLoading: false });
          })
          //alert("(Loading 메시지 확인중...)");
       }
    } catch (error) {
       console.log(error);
    }
 };

  componentDidMount() {
    this.getSearchMovie();
  };

  handleChange = (e : any) => {
    this.setState({value: e.target.value});
  };

  handleSubmit = (e : any) => {
    e.preventDefault();
    this.getSearchMovie();
   
  };
  

  
  render() {
    const {movies, isLoading, name,info,value} = this.state;
    
    return (<section className="container">
      {
        isLoading
          ? (<div className="loader">
            <span className="loader__text">({this.state.name}) Loading... {this.state.value}</span>
          </div>)
          : (<form onSubmit={this.handleSubmit}>
            <TodoTemplate>
              <form className="input_div">
                <input className="input_search" type="text" value={this.state.value} onChange={this.handleChange} placeholder="입력포맷: <정렬기준> <검색개수> 예: like 5"/>
                <button type="submit"> <MdAdd /> </button>
              </form>
              <div className="imgg">
              {movies.map((movie,index)=> {
                  return <Movie key={index} movie={movie} handler={()=>this.setState({info: movie})}/>
                })}
                </div>
                {info && <div className="info">
                <Info info={info} />
                  </div>}
                  </TodoTemplate>
             </form>)
          
            }
      {/* {info && <div className="info">
        <Info info={info} />
      </div>} */}
      
    </section>);
    }
}

export default Search;