import "../pages/analytics.css";

import {getToday,getDaysAgo,getStatsDate} from "./utils/dateFunctions";
import {Analytics} from "./modules/Analytics";
import {StatsRow} from "./modules/StatsRow";
import {DAYS_AGO} from "./constans/constans";


const createStat = (...args) => new StatsRow(STATS_R0W_SELECTOR,getStatsDate, ...args).create()

const stats = new Analytics(createStat, getToday, getDaysAgo, DAYS_AGO)
const storage = new DataStorage()

document.addEventListener('DOMContentLoaded', () => {
  const news = storage.getStorage().news
  const query = storage.getStorage().query
  stats.init(STATS_SELECTORS,{query,news})
  stats.addStats();
})
