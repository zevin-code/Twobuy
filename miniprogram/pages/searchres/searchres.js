const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false
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
    wx.redirectTo({
      url: '../../pages/search/search',
    })
  },

  onLoad: function (options) {
    this.setData({
      searchvalue: options.item
    })
    console.log("搜索传值", options.item);
    db.collection('timeline').where({
         goodsname: db.RegExp({
           regexp: options.item,
           options: 'i',
         })
      }).get().then(res => {
        console.log("搜索结果", res.data);
        this.setData({
          searchlist: res.data
        })
    })
  }
})