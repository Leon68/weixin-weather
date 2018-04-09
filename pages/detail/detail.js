let API = require('../../utils/api')
let Util = require('../../utils/util') 
let app = getApp()

Page({

  data: {
  },

  onUpper(e){
    console.log('upper')
  },


  onShow () {
    var _this = this
    console.log('load')
    if (app.globalData.weather) {
      _this.setData({ weather: app.globalData.weather })
      return
    }


    API.getWeather(app.globalData.inputCity)
      .then((weather) => {
        weather.format_last_update = Util.formatTime(weather.last_update)
        weather.bg = Util.getBackground(weather.now.code)
        _this.setData({ weather })
        app.globalData.weather = weather
      }).catch(_this.onError)
  },

  onLoad (options){
    
  },

  onError(err){
    wx.showToast({
      title: err.msg,
      duration: 2000
    })
  }


})