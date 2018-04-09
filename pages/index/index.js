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
        // console.log('load888')
       
    },
    onShow() {
        console.log('show666')
        let _this = this
        console.log(app.globalData.inputCity)
        API.getWeather(app.globalData.inputCity)
            .then((weather) => {
                console.log('我是二次请求天气')
                console.log(weather)
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
        console.log('请求结束' + app.globalData + app.globalData.inputCity)
    },
    onReady() {
        console.log('ready55')
    }
    ,
    onHide() {
        console.log('hide99')
    }
    ,
    onUnload() {
        console.log('Unload77')
    }
    ,
    onShareAppMessage: function () {
        // 用户点击右上角分享
        return {
            title: 'title', // 分享标题
            desc: 'desc', // 分享描述
            path: 'path' // 分享路径
        }
    }
    ,

    onError(err) {
        wx.showToast({
            title: err.msg,
            duration: 2000
        })
    }


})