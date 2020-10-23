var app = getApp();
const db = wx.cloud.database({
  env: 'testclould-ht364'
})
 let currentPage = 0 // 当前第几页,0代表第一页 
let pageSize = 14 //每页显示多少数据

Page({
  data: {
    dataList: [],
    moreDataList:[],
    tabbar: {},
    userInfo: {},
    scrollTop: null,
    multiArray: ['新品推荐', '二手图书', '男女服装', '配饰', '鞋袜', '运动户外', '美妆个护', '手机数码', '日常用品', '学习办公', '箱包', '零食水果'], 
    loadMore: false, //"上拉加载"的变量，默认false，隐藏  
    loadAll: false, //“没有数据”的变量，默认false，隐藏 
    currentTab: 0,
    navScrollLeft: 0,
    cur:0
  },
 
 
  onLoad: function (options) {
    console.log("userInfo", app.globalData.userInfo)
    app.editTabbar();
    this.getData();
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
    if(cur > 0 || cur){
      this.getMoreData(cur)
      console.log("yes")
    }else{
      this.__data__.dataList = []
      this.__data__.currentPage = 0
      this.getData()
      console.log("no",cur)
      console.log("no", this)
    };
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

  goToDetail(e) {
    //点击跳转商品详情页
    const id = e.currentTarget.id
    console.log(e)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },

  goToSearch() {
    //点击跳转搜索页
    wx.navigateTo({
      url: '../../pages/search/search',
    })
  },

  goToReward() {
    //点击跳转悬赏大厅页
    wx.navigateTo({
      url: '../../pages/reward/reward',
    })
  },

  goToAllItem() {
    wx.navigateTo({
      url: '../../pages/allitem/allitem',
    })
  },

  onShow: function () {
    // let that = this;
    // wx.cloud.database().collection('timeline')
    //   .orderBy('createTime', 'desc') //按发布时间倒序渲染
    //   .get({
    //     success(res) {
    //       console.log("请求成功", res)
    //       that.setData({
    //         dataList: res.data
    //       })
    //     },
    //     fail(res) {
    //       console.log("请求失败", res)
    //     }
    //   });


      if (!app.globalData.userInfo) {
        wx.showToast({
          title: '您还未登录,请先登录~',
          icon: 'none'
        })

        setTimeout(() => {
          wx.switchTab({
            url: '../../pages/mine/mine',
          })
        }, 1500)
      }  
  },

  onPullDownRefresh(){
    this.onShow()
  },

  //页面上拉触底事件的处理函数
  pullUpLoad: function () {
    
      console.log("上拉触底事件")
      let that = this
      if (!that.data.loadMore) {
        that.setData({
          loadMore: true, //加载中  
          loadAll: false //是否加载完所有数据
        });
        //加载更多，这里做下延时加载
        setTimeout(function () {
          that.getData()
        }, 2000)
      }
   
  },

  getMoreData(cur) {
    this.tagsone = cur;
    console.log("cur", this.tagsone)
    db.collection('timeline')
    .orderBy('createTime', 'desc') //按发布时间倒序渲染
    .where({
      tagsone: this.tagsone-1
    }).get().then(res => {
        this.setData({
          dataList: res.data
        })
      console.log("分类结果", res.data);
    })
  },

  getData() {
    let that = this;
    //第一次加载数据
    if (currentPage == 1) {
      this.setData({
        loadMore: true, //把"上拉加载"的变量设为true，显示  
        loadAll: false //把“没有数据”设为false，隐藏  
      })
    }
    //云数据的请求
    db.collection("timeline")
      .orderBy('createTime', 'desc') //按发布时间倒序渲染
      .skip(currentPage * pageSize) //从第几个数据开始
      .limit(pageSize)
      .get({
        success(res) {
          if (res.data && res.data.length > 0) {
            console.log("请求成功", res.data)
            currentPage++
            //把新请求到的数据添加到dataList里  
            let list = that.data.dataList.concat(res.data)
            that.setData({
              dataList: list, //获取数据数组    
              loadMore: false //把"上拉加载"的变量设为false，显示  
            });
            if (res.data.length < pageSize) {
              that.setData({
                loadMore: false, //隐藏加载中。。
                loadAll: true //所有数据都加载完了
              });
            }
          } else {
            that.setData({
              loadAll: true, //把“没有数据”设为true，显示  
              loadMore: false //把"上拉加载"的变量设为false，隐藏  
            });
          }
        },
        fail(res) {
          console.log("请求失败", res)
          that.setData({
            loadAll: false,
            loadMore: false
          });
        }
      })
  }


})