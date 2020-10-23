var app = getApp();
Page({

  data: {
    userInfo: {},
    rewardList: [],
    userName: '',
    useravatar: '',
    scrollTop: null,
    multiArray: ['最新', '我发布的', '我举手的'],
    loadMore: false, //"上拉加载"的变量，默认false，隐藏  
    loadAll: false, //“没有数据”的变量，默认false，隐藏 
    currentTab: 0,
    navScrollLeft: 0
  },

  goToReleaseReward() {
    //点击跳转悬赏发布页
    wx.navigateTo({
      url: '../../pages/release-reward/release-reward',
    })
  },
 
  
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                          
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },

  scroll: function (e) {
    this.setData({
      scrollTop: e.detail.scrollTop
    })
  },


  onShow: function () {
    let that = this;
    wx.cloud.database().collection('rewardlist')
      .orderBy('createTime', 'desc') //按发布时间倒序渲染
      .get({
        success(res) {
          console.log("请求成功", res)
          that.setData({
            rewardList: res.data
          })

          console.log("配图数量", res.data.fileIDs)
        },
        fail(res) {
          console.log("请求失败", res)
        }
      });
    wx.getUserInfo({
      success: (data) => {
        this.setData({
          userName: data.userInfo.nickName,
          useravatar: data.userInfo.avatarUrl
        })
      },
      fail: () => {
        console.log('获取用户信息失败')
      }

    })
  }

})