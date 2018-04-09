let app = getApp()

function getNowWeather(cityid){
  return new Promise((resolve, reject)=>{
    wx.request({
      url: 'https://weixin.jirengu.com/weather?key=study_javascript_in_jirengu.com',
      data: {
        cityid
      },
      success (res) {
        console.log('now')
        console.log(res)
        if(res.data && res.data.status && res.data.status === 'OK' && res.data.weather[0]){
          resolve(res.data.weather[0])
        }else {
          reject({status: 'error', msg: '获取天气失败'})
        }
      },
      fail (){
        reject({status: 'error', msg: '获取天气失败'})
      }
    })
  })
}

function get24hWeather(cityid){
  console.log('now'+ cityid)
  return new Promise((resolve, reject)=>{
    wx.request({
      url: 'https://weixin.jirengu.com/weather/future24h?key=study_javascript_in_jirengu.com',
      data: {
        cityid
      },
      success (res) {
        console.log('24h')
        console.log(res)
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
  console.log(city)
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://weixin.jirengu.com/weather?key=study_javascript_in_jirengu.com',
      data: {
        "location": city
      },
      success(res) {
        console.log('woshicity')
        console.log(res)
        if (res.data && res.data.weather && res.data.weather.length > 0) {
          resolve(app.globalData.weather = res.data.weather[0])
        } else {
          reject({ status: 'error', msg: '获取城市 id 失败' })
        }
      },
      fail() {
        console.log('cityid2')
        reject({ status: 'error', msg: '获取城市 id 失败' })
      }
    })
  })
}
function getCityId(location){
  let city = location ? location: ''
  console.log(city)
  return new Promise((resolve, reject)=>{
    wx.request({
      url: 'https://weixin.jirengu.com/weather?key=study_javascript_in_jirengu.com',
      data: {
       "location": city
      },
      success (res) {
        console.log(res)
        if(res.data && res.data.weather && res.data.weather.length > 0){
          resolve(res.data.weather[0]['city_id'])
        }else{
          reject({status: 'error', msg: '获取城市 id 失败'})
        }
        
      },
      fail (){
        console.log('cityid2')
        reject({status: 'error', msg: '获取城市 id 失败'})
      }
    })
  }) 
}

function getLocation(){
  return new Promise((resolve, reject)=>{
     wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        console.log('location')
        console.log(res)
        resolve(res.latitude + ':' + res.longitude)
      },
      fail (){
        resolve('')
      }
    }) 
  })
}

module.exports = {
  getNowWeather,
  get24hWeather,
  getCityId,
  getLocation,
  getWeather
}