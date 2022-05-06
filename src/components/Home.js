import { React, useState } from "react";
import styled from "styled-components";
import Imgslider from "./ImgSlider";
import NewDisney from "./NewDisney";
import Recommends from "./Recommends";
import Viewers from "./Viewers";
import Trending from "./Trending";
import Originals from "./Originals";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../features/Movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";
import {
  doc,
  onSnapshot,
  getFirestore,
  collection,getDocs,setDoc
} from "firebase/firestore";
import Json from './disneyPlusMoviesData.json'

import app from "./firebase";

const Home = (Props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  let recommends = [];
  let newDisneys = [];
  let originals = [];
  let trendings = [];

  useEffect(() => {
    
    const db = getFirestore(app);
    
    getDocs(collection(db, 'movies')).then(snap => {
    
      snap.forEach(doc => {
        switch (doc.data().type) {
          case "recommend":
            recommends = [...recommends, { id: doc.id, ...doc.data() }];
            break;

          case "new":
            newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
            break;

          case "original":
            originals = [...originals, { id: doc.id, ...doc.data() }];
            break;

          case "trending":
            trendings = [...trendings, { id: doc.id, ...doc.data() }];
            break;
        }
        
      });

      dispatch(
        setMovies({
          recommend: recommends,
          newDisney: newDisneys,
          original: originals,
          trending: trendings,
        })
        );  
  });

  }, [userName]);

  // data.forEach((movie)=>{
  // switch(movie.type){
  //   case 'recommend':
  //     recommends = [...recommends, {...movie}];
  //     break;

  //   case 'new':
  //     newDisneys = [...newDisneys, {...movie}];
  //     break;

  //   case 'original':
  //     originals = [...originals, { ...movie}];
  //     break;

  //   case 'trending':
  //     trendings = [...trendings, {...movie}];
  //     break;

  // }})

  // dispatch(setMovies({
  //   recommend:recommends,
  //   newDisney:newDisneys,
  //   original:originals,
  //   trending:trendings
  // }))

  return (
    <Container>
      <Imgslider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh -250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
