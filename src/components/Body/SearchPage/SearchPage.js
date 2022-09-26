import React, { useContext } from "react";
import styles from "./SearchPage.module.css";
import BrowseCard from "../../UI/BrowseCard";
import AppContext from "../../../store";
import { useParams } from 'react-router-dom';
import SearchNavigation from "./SearchNavigation";

const SearchPage = () => {
    const appCtx = useContext(AppContext);
    const { searchTerm } = useParams();
    return (
        <React.Fragment>
            {appCtx.isSearching &&
                <div className="padding-0-32">
                    <SearchNavigation />
                    <div>Content will come to here: {searchTerm}</div>
                </div>
            }
            {!appCtx.isSearching &&
                <div className={styles['wrapper-genres']}>
                    <div className={styles['text-browse']}>Browse all</div>
                    <div className={styles['cards-container']}>
                        <BrowseCard name="Podcasts" color="rgb(39, 133, 106)" image={'podcasts.jfif'} />
                        <BrowseCard name="Made For You" color="rgb(30, 50, 100)" image={'pop-mix.png'} />
                        <BrowseCard name="Charts" color="rgb(141, 103, 171)" image={'charts.jpg'} />
                        <BrowseCard name="New Releases" color="rgb(232, 17, 91)" image={'new-releases.jfif'} />
                        <BrowseCard name="Discover" color="rgb(141, 103, 171)" image={'discover.jpeg'} />
                        <BrowseCard name="Live Events" color="rgb(30, 50, 100)" image={'live-events.jfif'} />
                        <BrowseCard name="Pop" color="rgb(141, 103, 171)" image={'pop.jfif'} />
                        <BrowseCard name="Hip-Hop" color="rgb(186, 93, 7)" image={'hip-hop.jfif'} />
                        <BrowseCard name="Summer" color="rgb(255, 200, 100)" image={'summer.jpeg'} />
                        <BrowseCard name="Trending" color="rgb(180, 155, 200)" image={'trending.jpg'} />
                        <BrowseCard name="Mood" color="rgb(141, 103, 171)" image={'mood.jfif'} />
                        <BrowseCard name="EQUAL" color="rgb(20, 138, 8)" image={'equal.jfif'} />
                        <BrowseCard name="Decades" color="rgb(186, 93, 7)" image={'decades.jfif'} />
                        <BrowseCard name="Student" color="rgb(240, 55, 165)" image={'student.jpeg'} />
                        <BrowseCard name="Dance / Electronic" color="rgb(220, 20, 140)" image={'dance-electronic.jfif'} />
                        <BrowseCard name="Rock" color="rgb(230, 30, 50)" image={'rock.jfif'} />
                        <BrowseCard name="Podcasts" color="rgb(39, 133, 106)" image={'podcasts.jfif'} />
                        <BrowseCard name="Made For You" color="rgb(30, 50, 100)" image={'pop-mix.png'} />
                        <BrowseCard name="Charts" color="rgb(141, 103, 171)" image={'charts.jpg'} />
                        <BrowseCard name="New Releases" color="rgb(232, 17, 91)" image={'new-releases.jfif'} />
                        <BrowseCard name="Discover" color="rgb(141, 103, 171)" image={'discover.jpeg'} />
                        <BrowseCard name="Live Events" color="rgb(30, 50, 100)" image={'live-events.jfif'} />
                        <BrowseCard name="Pop" color="rgb(141, 103, 171)" image={'pop.jfif'} />
                        <BrowseCard name="Hip-Hop" color="rgb(186, 93, 7)" image={'hip-hop.jfif'} />
                        <BrowseCard name="Summer" color="rgb(255, 200, 100)" image={'summer.jpeg'} />
                        <BrowseCard name="Trending" color="rgb(180, 155, 200)" image={'trending.jpg'} />
                        <BrowseCard name="Mood" color="rgb(141, 103, 171)" image={'mood.jfif'} />
                        <BrowseCard name="EQUAL" color="rgb(20, 138, 8)" image={'equal.jfif'} />
                        <BrowseCard name="Decades" color="rgb(186, 93, 7)" image={'decades.jfif'} />
                        <BrowseCard name="Student" color="rgb(240, 55, 165)" image={'student.jpeg'} />
                        <BrowseCard name="Dance / Electronic" color="rgb(220, 20, 140)" image={'dance-electronic.jfif'} />
                        <BrowseCard name="Rock" color="rgb(230, 30, 50)" image={'rock.jfif'} />
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default SearchPage;