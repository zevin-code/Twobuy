// pages/allitem/allitem.js
Page({

  data: {
    cateItems: [
      {
        cate_id: 1,
        cate_name: "推荐分类",
        ishaveChild: true,
        children:
          [
            {
              child_id: 1,
              name: '洁面皂',
              image: "/images/goods/ali.png"
            },
            {
              child_id: 2,
              name: '卸妆',
              image: "/images/goods/ali.png"
            },
            {
              child_id: 3,
              name: '洁面乳',
              image: "/images/goods/ali.png"
            },
            {
              child_id: 4,
              name: '面部祛角质',
              image: "/images/goods/ali.png"
            }
          ]
      },
      {
        cate_id: 2,
        cate_name: "二手书籍",
        ishaveChild: true,
        children:
          [
            {
              child_id: 1,
              name: '气垫bb',
              image: "/images/goods/giant.png"
            },
            {
              child_id: 2,
              name: '修容/高光',
              image: "/images/goods/giant.png"
            },
            {
              child_id: 3,
              name: '遮瑕',
              image: "/images/goods/giant.png"
            },
            {
              child_id: 4,
              name: '腮红',
              image: "/images/goods/giant.png"
            },
            {
              child_id: 5,
              name: '粉饼',
              image: "/images/goods/giant.png"
            },
            {
              child_id: 6,
              name: '粉底',
              image: "/images/goods/giant.png"
            },
            {
              child_id: 7,
              name: '蜜粉/散粉',
              image: "/images/goods/giant.png"
            },
            {
              child_id: 8,
              name: '隔离霜',
              image: "/images/goods/giant.png"
            }
          ]
      },
      {
        cate_id: 3,
        cate_name: "男女服饰",
        ishaveChild: true,
        children:
          [
            {
              child_id: 1,
              name: '淡香水EDT',
              image: "/images/goods/cunshangchunshu.png"
            },
            {
              child_id: 2,
              name: '浓香水EDP',
              image: "/images/goods/cunshangchunshu.png"
            },
            {
              child_id: 3,
              name: '香体走珠',
              image: "/images/goods/cunshangchunshu.png"
            },
            {
              child_id: 4,
              name: '古龙香水男士的最爱',
              image: "/images/goods/cunshangchunshu.png"
            }
          ]
      },
      {
        cate_id: 4,
        cate_name: "鞋帽配饰",
        ishaveChild: false,
        children: []
      }
    ],
    curNav: 1,
    curIndex: 0
  },

  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  }
})