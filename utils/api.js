let app = getApp()


function getWeather(location){
  let city = location
  console.log(city)
  return new Promise((resolve, reject)=>{
    wx.request({
      url: 'http://zhwnlapi.etouch.cn/Ecalender/api/v2/weather?',
      data: {
       "citykey": city
      },
      success (res) {

        console.log('hourly',res.data)
        if(res.data&& res.data.hourfc.length >0){
          resolve(res.data)
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


function getCityId(location) {
 
  let city = location ? location : 'auto_ip'
  console.log(city)
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/now?key=54d607c6ea0349be837025b750a778ee',
      data: {
        "location": city
      },
      success(res) {
        console.log(res.data)
        if (res.data && res.data.HeWeather6[0] && res.data.HeWeather6.length > 0 ) {
          console.log('11')
          resolve(res.data.HeWeather6[0])
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
  getCityId,
  getWeather,
 
}