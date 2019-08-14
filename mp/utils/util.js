const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const ajax = options => {
  return wx.request(options);
};

const getLevel = aqi => {
  return aqi > 200 ? 'level_5' : aqi > 150 ? 'level_4' : aqi > 100 ? 'level_3' : aqi > 50 ? 'level_2' : 'level_1';
};

const getWeek = day => {
  return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][day];
};

const urlArgs = () => {
  const args = new Map();
  const pairs = location.search.substring(1).split("&");
  for (const entry of pairs) {
    const params = entry.split('=');
    if (params.length === 2 && params[0] && params[1]) {
      const [key, value] = params;
      args.set(decodeURIComponent(key), decodeURIComponent(value));
    }
  }
  return args;
};

const getUrlArg = (name) => {
  return urlArgs().get(name);
};

const normalizeLocation = (state, city) => {
  if (!state) return city;
  if (state === city) return state;
  return state + city;
};

const normalizeDailyDate = (date) => {
  if (isNaN(date.weekday)) return date.weekday;
  return `${getWeek(date.weekday)} ${date.month}-${date.day > 9 ? date.day : "0" + date.day}`;
};

const getCurrentPage = () => {
  var pages = getCurrentPages();
  var currentPage = pages[pages.length - 1];
  return currentPage;
};

export {
  ajax,
  formatTime,
  getCurrentPage,
  getLevel,
  getUrlArg,
  getWeek,
  normalizeDailyDate,
  normalizeLocation,
  urlArgs
};
