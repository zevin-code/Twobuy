const app = getApp();
Page({
  data: {
    tabbar: {},
    userInfo: {},
    expiredTime: 0,
    collectionList:{},
    hasUserInfo: false
  },

  onLoad: function () {
    if (app.globalData.userInfo){  
      this.setData({
        userInfo: wx.getStorageSync('userInfo'),
        hasUserInfo: true
      })
      this.data.collectionList = wx.getStorageSync('collectionList')
    } 
    // if (now - expiredTime <= 1 * 24 * 60 * 60 * 1000) {
    //   this.globalData.expiredTime = expiredTime
    // }
      app.editTabbar();
      // this.getUserInfo();
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // };
    

  
  },

  getUserInfo(){
    wx.getSetting({
      success: (data) => {
        console.log(data);
        if (data.authSetting['scope.userInfo']) {
          this.setData({
            hasUserInfo: true
          })
          this.getCollectionList();
        } else {
          this.setData({
            hasUserInfo: false
          })

        }
      }
    });

    wx.getUserInfo({
      success: (data) => {
        console.log(data);
        this.setData({
          userInfo: data.userInfo
        });
        wx.setStorageSync('userInfo', data.userInfo)
      },
      fail: () => {
        console.log('获取用户信息失败')
      }

    });
  },

  handUserInfo(data){
    if(data.detail.rawData){
      this.getUserInfo();
      app.globalData.userInfo = data.detail.userInfo;
    }
  },

  onShow(){
    if (this.data.hasUserInfo){
      this.getCollectionList();
    }
  },

  getCollectionList: function () {
    let that = this;
    wx.cloud.database().collection('collectionlist')
      .orderBy('createTime', 'desc') //按发布时间倒序渲染
      .get({
        success(res) {
          console.log("请求成功", res)
          that.setData({
            collectionList: res.data
          })
          wx.setStorageSync('collectionList', res.data)
        },
        fail(res) {
          console.log("请求失败", res)
        }
      });
  },



  goToInstall() {
    wx.navigateTo({
      url: '../../pages/install/install',
    })
  },

  goToCollectionList() {
    wx.navigateTo({
      url: '../../pages/collectionlist/collectionlist',
    })
  },

  goToDetail(e) {
    //点击跳转商品详情页
    const id = e.currentTarget.id
    console.log(e)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  }
})