import 'swiper/swiper-bundle.css';
import "../pages/project.css";
import Swiper, { Navigation, Pagination } from 'swiper';
import {CommitCard} from "./modules/CommitCard";
import {CommitCardList} from "./modules/CommitCardList";
import {getCardDate} from "./utils/dateFunctions";
import {GithubApi} from "./modules/GithubApi";
import {GITHUB_REPO,GITHUB_URL,GITHUB_USER,COMMIT_CARD_SELECTOR} from "./constans/constans";


const githubConfig = {
  user: GITHUB_USER,
  repo: GITHUB_REPO,
  url: GITHUB_URL
}

Swiper.use([Navigation, Pagination]);

const swiperInit =() => {
  new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    slidesPerView: 'auto',
    centeredSlides: true,
    grabCursor: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.github__button-next',
      prevEl: '.github__button-prev',
    },
  });
}


const renderCommits = () => {
  githubApi.fetchData()
    .then(res => {
      const avatar = res[0].author.avatar_url
      commitList.addCommits(
        res.map(elem => {
          return ({
            name: elem.commit.author.name,
            date: elem.commit.author.date.slice(0,elem.commit.author.date.indexOf('T')),
            text: elem.commit.message,
            mail: elem.commit.committer.email,
            imgUrl: avatar,
          })
        }))
    })
    .catch(res=> {
      console.error(res)
    })
    .finally(res=>{
        swiperInit()
      }
    )
}

const githubApi = new GithubApi(githubConfig)
const createCommitCard = (...args) => new CommitCard(COMMIT_CARD_SELECTOR,getCardDate, ...args).create()
const commitList = new CommitCardList(createCommitCard)
commitList.init('.swiper-wrapper')

renderCommits()
