let API = require('../../utils/api')
let Util = require('../../utils/util')
let app = getApp()

Page({

    data: {},

    switchCity() {
        wx.navigateTo({
            url: '../../pages/switchcity/switchcity',
        })
    },

    getWeatherAll(city) {
      let _this = this
      API.getCityId(city)
        .then((cityId) => {
          console.log(cityId)
          app.globalData.cityId = cityId.basic.cid.slice(2)
          app.globalData.inputCity = cityId.basic.parent_city
          
          API.getWeather(app.globalData.cityId)
            .then((weather) => {
              weather.format_last_update = weather.observe.up_time
              // weather.bg = Util.getBackground(weather.now.code)
              weather.bg = weather.observe.day.bgPic

              weather.hourfc.forEach((hour) => {
                hour.img = `../../images/weather/${hour.type}.png`
                hour.format_time = hour.time.slice(8, 10)
              })
              weather.forecast.forEach((item) => {
                item.imgDay = `../../images/weather/${item.day.type}.png`
                item.imgNight = `../../images/weather/${item.night.type}.png`
                item.timeDate = item.date.slice(4, 9)
              })
              _this.setData({ weather })
              app.globalData.weather = weather
            }).catch(_this.onError)
        }).catch(_this.onError)
    },
    getWeatherFirst(){
      var _this = this
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          console.log('location',location)
          let location = res.longitude + ',' + res.latitude
          _this.getWeatherAll(location)
        }
      })
    },
    onLoad(options) {
      this.getWeatherFirst()

       
    },
    
    onShow() {
      
     this.getWeatherAll(app.globalData.inputCity)
            
    },
    onReady() {
  
    },
    onHide() {

    },
    onUnload() {

    } ,
    onPullDownRefresh: function() {
      this.getWeatherFirst()
      wx.stopPullDownRefresh()
    },
    onShareAppMessage: function () {
        // 用户点击右上角分享
        return {
            title: '天气', // 分享标题
            desc: '要伞么', // 分享描述
            path: '/pages/index/index' // 分享路径
        }
    },

    onError(err) {
        wx.showToast({
            title: err.msg,
            duration: 2000
        })
    }
})