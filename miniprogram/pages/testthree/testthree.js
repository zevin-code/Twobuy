//获取应用实例
const app = getApp()

Page({
  data: {

    navData: [
      {
        text: '首页'
      },
      {
        text: '健康'
      },
      {
        text: '情感'
      },
      {
        text: '职场'
      },
      {
        text: '育儿'
      },
      {
        text: '纠纷'
      },
      {
        text: '青葱'
      },
      {
        text: '上课'
      },
      {
        text: '下课'
      }
    ],
    currentTab: 0,
    navScrollLeft: 0
  },
  //事件处理函数
  onLoad: function () {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
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
    console.log("嘻嘻",event);
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  }
})
