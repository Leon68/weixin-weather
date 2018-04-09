let app = getApp()


function get24hWeather(location){

  return new Promise((resolve, reject)=>{
    wx.request({
      url: 'https://weixin.jirengu.com/weather/future24h?key=study_javascript_in_jirengu.com',
      data: {
        location
      },
      success (res) {

       
        if(res.data&& res.data.status && res.data.status==='OK'&& res.data.hourly){
          resolve(res.data.hourly)
        }else{
          reject({status: 'error', msg: '获取当天24小时天气失败'})
        }
        
      },
      fail (){
        reject({status: 'error', msg: '获取当天24小时天气失败'})
      }
    })
  })
}
function getWeather(location) {
  let city = location ? location : ''

  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://weixin.jirengu.com/weather?key=study_javascript_in_jirengu.com',
      data: {
        "location": city
      },
      success(res) {
   
        if (res.data && res.data.weather && res.data.weather.length > 0) {
          resolve(app.globalData.weather = res.data.weather[0])
        } else {
          reject({ status: 'error', msg: '获取城市 id 失败' })
        }
      },
      fail() {

        reject({ status: 'error', msg: '获取城市 id 失败' })
      }
    })
  })
}

module.exports = {
  get24hWeather,
  getWeather
}