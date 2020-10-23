const db = wx.cloud.database({
  env: 'testclould-ht364'
})

const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: null,
    logged: false,
    detailList: [],
    takeSession: false,
    requestResult: '',
    chatRoomCollection: 'chatroom',
    chatRoomGroupId: '',
    chatRoomGroupName: '聊天室',
    onGetUserInfo: null,
    getOpenID: null,
  },

  onLoad: function (opentions) {
    let chatRoomGroupId= opentions.id;
    this.setData({
      chatRoomGroupId: opentions.id
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })

    // this.setData({
    //   id: options.id
    // })
    
    const ins = db.collection('timeline').doc(chatRoomGroupId)
    ins.update({
      data: {
        count: db.command.inc(1)
      }
    })
    ins.get({
      success: res => {
        this.setData({
          detailList: res.data
        })
        console.log(res)
      }
    })   

    this.setData({
      onGetUserInfo: this.onGetUserInfo,
      getOpenID: this.getOpenID,
    })

    wx.getSystemInfo({
      success: res => {
        console.log('system info', res)
        if (res.safeArea) {
          const { top, bottom } = res.safeArea
          this.setData({
            containerStyle: `padding-top: ${(/ios/i.test(res.system) ? 10 : 20) + top}px; padding-bottom: ${20 + res.windowHeight - bottom}px`,
          })
        }
      },
    })
  },

  getOpenID: async function() {
    if (this.openid) {
      return this.openid
    }

    const { result } = await wx.cloud.callFunction({
      name: 'login',
    })

    return result.openid
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  }

  // onShareAppMessage() {
  //   return {
  //     title: '即时通信 Demo',
  //     path: '/pages/im/room/room',
  //   }
  // },

  
})
