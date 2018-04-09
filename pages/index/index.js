let API = require('../../utils/api')
let Util = require('../../utils/util') 
let app = getApp()

Page({

  data: {
  },

  switchCity() {
    wx.navigateTo({
      url: '../../pages/switchcity/switchcity',
    })
  },

  onShow () {
    console.log('show666')
    
    
      API.getCityId()
      .then(API.getNowWeather)
      .then((weather) => {
        weather.format_last_update = Util.formatTime(weather.last_update)
        weather.bg = Util.getBackground(weather.now.code)
        this.setData({ weather })
        app.globalData.weather = weather
      }).catch(this.onError)
    console.log(app.globalData.weather)
  },
  onReady() {
    console.log('ready55')
  },
  onHide() {
    console.log('hide99')
  },
  onUnload() {
    console.log('Unload77')
  },
    
  onLoad (options){
    let _this = this
    console.log('load888')
    API.getCityId()
  .then((cityid) => {
    API.getNowWeather(cityid)
      .then((weather) => {
        weather.format_last_update = Util.formatTime(weather.last_update)
        weather.bg = Util.getBackground(weather.now.code)
        _this.setData({ weather })
        app.globalData.weather = weather
      }).catch(_this.onError)

    API.get24hWeather(cityid)
      .then((hourly) => {
        hourly.forEach((hour) => {
          hour.img = `../../images/weather/${hour.code}.png`
          hour.format_time = Util.formatHour(hour.time)
        })
        _this.setData({ hourly })
        app.globalData.hourly = hourly
      }).catch(_this.onError)
  }).catch(_this.onError)
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  onError(err){
    wx.showToast({
      title: err.msg,
      duration: 2000
    })
  }


})