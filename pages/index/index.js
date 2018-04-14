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

    onLoad(options) {

       
    },
    
    onShow() {

        let _this = this
    
        API.getWeather(app.globalData.inputCity)
            .then((weather) => {
                weather.format_last_update = Util.formatTime(weather.last_update)
                weather.bg = Util.getBackground(weather.now.code)
                _this.setData({weather})
                app.globalData.weather = weather
            }).catch(_this.onError)

        API.get24hWeather(app.globalData.inputCity)
            .then((hourly) => {
                hourly.forEach((hour) => {
                    hour.img = `../../images/weather/${hour.code}.png`
                    hour.format_time = Util.formatHour(hour.time)
                })
                _this.setData({hourly})
                app.globalData.hourly = hourly
            }).catch(_this.onError)
        
    },
    onReady() {
  
    },
    onHide() {

    },
    onUnload() {

    } ,
    onPullDownRefresh: function() {
      console.log('pulldown')
      let _this = this
      app.globalData.inputCity = ''
      API.getWeather(app.globalData.inputCity)
        .then((weather) => {
          weather.format_last_update = Util.formatTime(weather.last_update)
          weather.bg = Util.getBackground(weather.now.code)
          _this.setData({ weather })
          app.globalData.weather = weather
        }).catch(_this.onError)

      API.get24hWeather(app.globalData.inputCity)
        .then((hourly) => {
          hourly.forEach((hour) => {
            hour.img = `../../images/weather/${hour.code}.png`
            hour.format_time = Util.formatHour(hour.time)
          })
          _this.setData({ hourly })
          app.globalData.hourly = hourly
          wx.stopPullDownRefresh()
        }).catch(_this.onError)
    },
    onShareAppMessage: function () {
        // 用户点击右上角分享
        return {
            title: '天气', // 分享标题
            desc: '要送伞么', // 分享描述
            path: '/page/index' // 分享路径
        }
    },

    onError(err) {
        wx.showToast({
            title: err.msg,
            duration: 2000
        })
    }
})