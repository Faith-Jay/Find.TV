import s from "./style.module.css";
import { TVShowAPI } from "./api/tv-show";
import { useEffect, useState } from "react";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetails } from "./components/TVShowDetail/TVShowDetail";
import { Logo } from "./components/Logo/Logo";
import logoImg from "./assets/images/logo.png"
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";

export function App() {
    const [currentTVShow, setCurrentTVShow] = useState();
    const [recommendationList, setRecommendationList] = useState([]);

    async function fetchPopulars() {
        const popularTVShowList = await TVShowAPI.fecthPopulars();  
        if (popularTVShowList.length > 0) {
            setCurrentTVShow(popularTVShowList[0]);
        }
    }

    async function fetchRecommendations(tvShowId) {
      const recommendationListResp = await TVShowAPI.fecthRecommendations(tvShowId);  
      if (recommendationListResp.length > 0) {
        setRecommendationList(recommendationListResp.slice(0, 10));
      }
  }

    useEffect(() => {
       fetchPopulars();
    }, []);

    useEffect(() => { if (currentTVShow){
       fetchRecommendations(currentTVShow.id);
      }
    }, [currentTVShow]);
    
    function updateCurrentTVShow(tvShow) {
      setCurrentTVShow(tvShow)
    }

    async function fetchByTitle(title) {
      const searchResponse = await TVShowAPI.fecthByTitle(title);  
      if (searchResponse.length > 0) {
        setCurrentTVShow(searchResponse[0])
      }
  }

  return (
    <div className={s.main_container} style={{background: currentTVShow ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover` :"black", }}>
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo img={logoImg} title="Find.TV" subtitle="Find a TV show you will enjoy" />
          </div>
          <div className="col-md-12 col-lg-4">
            <SearchBar onSubmit={fetchByTitle}/>
          </div>
        </div>
      </div>
      <div className={s.tv_show_details}>{ currentTVShow && < TVShowDetails tvShow={currentTVShow}/>}</div>
      <div className={s.recommended_tv_shows}> { currentTVShow && <TVShowList onClickItem={updateCurrentTVShow} tvShowList={recommendationList} /> }</div>
    </div>
  );
}
