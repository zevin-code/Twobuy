// pages/collectionlist/collectionlist.js
const db = wx.cloud.database({
  env: 'testclould-ht364'
})
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionList:{}

  },
  
  goToSearch() {
    //点击跳转搜索页
    wx.navigateTo({
      url: '../../pages/search/search',
    })
  },

  onShow(){
    this.getCollect();
  },

  getCollect: function () {
    let that = this;
    wx.cloud.database().collection('collectionlist')
      .orderBy('createTime', 'desc') //按发布时间倒序渲染
      .get({
        success(res) {
          console.log("请求成功", res)
          that.setData({
            collectionList: res.data
          })
        },
        fail(res) {
          console.log("请求失败", res)
        }
      });
  },

  goToDetail(e) {
    //点击跳转商品详情页
    const id = e.currentTarget.id
    console.log(e)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },

  deleteCollect(e) {
    console.log('e', e)
    wx.showModal({
      title: '确定要删除这个藏品？',
      content: '',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          db.collection('collectionlist').doc(e.currentTarget.id).remove({
            success:res=>{
              this.getCollect();
            }
          })
        }
      }
    })
  } 
})