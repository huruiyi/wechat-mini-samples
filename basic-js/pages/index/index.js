// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()
Page({
  data: {
    motto: 'Hello World，入门了！！！！！',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
  scanProductCodeV1() {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        debugger
        wx.showModal({
          title: '扫描结果',
          content: res.result,
          complete: (res) => {
            if (res.cancel) {

            }
            if (res.confirm) {
              wx.exitMiniProgram()
            }
          }
        })
        console.log("扫码成功：" + JSON.stringify(res))
      }
    })
  },
  scanProductCodeV2() {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log("扫码成功：" + JSON.stringify(res))
      }
    })
  },
  getPhoneNumberV1: function (e) {
    console.log(e)
    console.log("iv:" + e.detail.iv);
    console.log("encryptedData:" + e.detail.encryptedData);
    app.globalData.iv = e.detail.iv
    app.globalData.encryptedData = e.detail.encryptedData
    debugger
    wx.login({
      success: res => {
        console.log(res)
        console.log("code:" + res.code);
        app.globalData.code = res.code
      }
    })
  },
  getPhoneNumberV2(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    wx.login({
      success: (res) => {
        console.log("login success ,code :" + res.code)
      },
    })
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) {
          debugger
          console.log("getphonenumber fail ,code :" + res.errMsg)
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '同意授权',
        success: function (res) {
          debugger
          console.log("getphonenumber success ,code :" + res.JSON)
        }
      })
    }
  },
  handleContact(e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
})
