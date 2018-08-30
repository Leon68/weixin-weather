let API = require('../../utils/api')
let Util = require('../../utils/util') 
let app = getApp()

Page({

  data: {
  },
  onShow () {
    var _this = this
 
    if (app.globalData.weather) {
      console.log('就该选我',app.globalData.weather)
      _this.setData({ weather: app.globalData.weather })
      return
    }
    API.getWeather(app.globalData.cityId)
      .then((weather) => {
              
          weather.bg = weather.forecast[2].day.bgPic
          weather.forecast.forEach((item) => {
            item.imgDay = `../../images/weather/${item.day.type}.png`
            item.imgNight = `../../images/weather/${item.night.type}.png`
            item.timeDate = item.date.slice(4,9)
          })
          
          _this.setData({ weather })
          app.globalData.weather = weather
         
      }).catch(_this.onError)
  },
  onLoad (){
    
  },

  onError(err){
    wx.showToast({
      title: err.msg,
      duration: 2000
    })
  }


})