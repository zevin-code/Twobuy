// pages/detail/detail.js
const db = wx.cloud.database({
  env: 'testclould-ht364'
})
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsid:"",
    detailList:[],
    topbanner:[],
    userName:'',
    collectdataid:'',
    isCollected:false,
    isMe:true
  },
 
  onLoad: function (options){
    this.goodsid = options.id;
    console.log('id', this.goodsid)
    const ins = db.collection('timeline').doc(options.id)
    ins.update({
      data: {
        count: db.command.inc(1)
      }
    })
    ins.get({
      success:res=>{
        this.setData({
          detailList:res.data
        })
        console.log(res.data);
      }
    }) 
   
  },

  onShow(){
    this.isCollected();
    wx.getUserInfo({
      success: (data) => {
        this.setData({
          userName: data.userInfo.nickName
        })
      },
      fail: () => {
        console.log('获取用户信息失败')
      }

    })
  },

  isCollected(){ 
    db.collection('collectionlist').where({
      goodsid: this.goodsid,
      username: app.globalData.userInfo.nickName
    }).get().then(res => {
      console.log("搜索结果", res.data);
      if(res.data.length ===1 ){
        this.setData({
          isCollected: true
        })
         this.collectdataid = res.data[0]._id;
      }
    })
  },

  addCollectionList(e){
    this.handleCollection();
    let goodsdetail = this.data
    db.collection('collectionlist').add({
      data: {
        goodsid: goodsdetail.detailList._id,
        fileIDs: goodsdetail.detailList.fileIDs,
        date: app.getNowFormatDate(),
        createTime: db.serverDate(),
        goodsname: goodsdetail.detailList.goodsname,
        username: app.globalData.userInfo.nickName,
        useravatar: app.globalData.userInfo.avatarUrl,
        sellername: goodsdetail.detailList.username, 
        selleravatar: goodsdetail.detailList.useravatar,
        goodsprice: goodsdetail.detailList.goodsprice
      },
      success: res => {
        wx.hideLoading()
        this.isCollected();
      },
      fail: err => {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '网络不给力....'
        })
        console.error('发布失败', err)
      }
    })

  },
  
  deleteCollectionList( ) {
    this.isCollected();
    db.collection('collectionlist').doc(this.collectdataid).remove({
            success: res => {
              console.log('删除成功');
              this.setData({
                isCollected: false
              })
      },
      fail: err => {     
        console.error('删除失败', err);
      }
    })
  },

  handleCollection(){
    let isCollected = !this.data.isCollected;
    this.setData({
      isCollected
    });

    let title = isCollected?"收藏成功":"取消收藏";
    wx.showToast({
      title,
      icon:"success"
    }) 
  },

  go(e) {
    console.log(e);
    console.log('聊天室名称', e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/room/room?id=' + e.currentTarget.dataset.id,
    })
  },

  goodsEsc() {
    console.log('商品id', this.goodsid)
    wx.showModal({
      title: '确定要下架这个大宝贝嘛？',
      content: '',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          db.collection('timeline').doc(this.goodsid).remove({
            success: res => {
              wx.showToast({
                title: '下架成功',
                icon: "success"
              })
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 500)


            }
          })
        }
      }
    })
  }

})
