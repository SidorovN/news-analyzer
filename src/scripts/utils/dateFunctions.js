const month = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

const days = [
  'пн',
  'вт',
  'ср',
  'чт',
  'пт',
  'сб',
  'вс',
]

const dateToFormat = date => `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${1 + date.getMonth()}` :date.getMonth() + 1}-${date.getDate() < 10 ? `0${1 + date.getDate()}` : date.getDate()}`

export const getToday = () => {
  return dateToFormat(new Date)
}

export const getDaysAgo = (day = 7) => {
  const date = new Date()
  date.setDate(date.getDate()-day)
  return dateToFormat(date)
}

export const getCardDate = (date) => {
  const array = date.split('-');
  return `${array[2]} ${month[array[1]-1]}, ${array[0]}`
}

export const getStatsDate = date => {
  const array = date.split('-');
  const newDate = new Date(+array[0],+array[1] - 1,+array[2])
  return `${array[2]}, ${days[newDate.getDay()]}`
}

