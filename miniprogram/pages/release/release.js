let app = getApp();

Page({
  
  data: {
    imgList: [],
    fileIDs: [],
    desc: '',
    userInfo: {},
    goodsprice:"0.0",
    inputedprice:false,
    showModalStatus: false,
    hiddenmodalput: true,
    multiArray: [['二手图书', '男女服装', '配饰', '鞋袜', '运动户外', '美妆个护', '手机数码', '日常用品', '学习办公', '箱包', '零食水果'], ['教材教辅', '文学名著', '成功励志', '杂志读物', '漫画小说']], 
    multiIndex: [0, 0]
  },

  

  //获取输入内容
  getGoodsName(event) {
    console.log("宝贝名称", event.detail.value)
    this.setData({
      goodsname: event.detail.value
    })
  },

  getGoodsDetail(one) {
    console.log("宝贝描述", one.detail.value)
    this.setData({
      goodsdetail: one.detail.value
    })
  },


  //选择图片
  ChooseImage() {
    wx.chooseImage({
      count: 9 - this.data.imgList.length, //默认9,我们这里最多选择9张
      sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        console.log("选择图片成功", res)
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
        console.log("路径", this.data.imgList)
      }
    });
  },
  //删除图片
  DeleteImg(e) {
    wx.showModal({
      title: '要删除这张照片吗？',
      content: '',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },

  bindMultiPickerColumnChange: function (e) {
    console.log('e', e);
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 0) {
      if (e.detail.value == 0) {//二手图书
        this.setData({
          multiArray: [['二手图书', '男女服装', '配饰', '鞋袜', '运动户外', '美妆个护', '手机数码', '日常用品', '学习办公', '箱包', '零食水果'], ['教材教辅', '文学名著', '成功励志', '杂志读物', '漫画小说', '其他']]
        })
      };
      if (e.detail.value == 1) {//男女服装
        this.setData({
          multiArray: [['二手图书', '男女服装', '配饰', '鞋袜', '运动户外', '美妆个护', '手机数码', '日常用品', '学习办公', '箱包', '零食水果'], ['T恤', '卫衣','毛衣', '衬衫', '大衣外套', '正装演出服', '裙子', '裤子下装', '内衣', '其他']]
        })
      };
      if (e.detail.value == 2) {//配饰
        this.setData({
          multiArray: [['二手图书', '男女服装', '配饰', '鞋袜', '运动户外', '美妆个护', '手机数码', '日常用品', '学习办公', '箱包', '零食水果'], ['帽子', '围巾丝巾', '发饰', '眼镜', '项链', '耳环耳钉', '手套', '手链手镯', '腰带', '其他']]
        })
      };
      if (e.detail.value == 3) {//鞋袜
        this.setData({
          multiArray: [['二手图书', '男女服装', '配饰', '鞋袜', '运动户外', '美妆个护', '手机数码', '日常用品', '学习办公', '箱包', '零食水果'], ['休闲鞋', '靴子', '拖鞋', '凉鞋', '高跟鞋', '舞蹈鞋', '其他']]
        })
      };
      if (e.detail.value == 4) {//运动户外
        this.setData({
          multiArray: [['二手图书', '男女服装', '配饰', '鞋袜', '运动户外', '美妆个护', '手机数码', '日常用品', '学习办公', '箱包', '零食水果'], ['运动装', '跑鞋', '球鞋', '护腕护膝', '自行车', '球类', '球拍', '其他']]
        })
      };
      if (e.detail.value == 5) {//美妆个护
        this.setData({
          multiArray: [['二手图书', '男女服装', '配饰', '鞋袜', '运动户外', '美妆个护', '手机数码', '日常用品', '学习办公', '箱包', '零食水果'], ['香水', '口红唇釉', '洁面用品', '牙膏牙刷', '沐浴露', '面膜', '卸妆乳液', '护肤品', '粉底液', '隔离打底', '粉底粉饼', '眼影', '美甲', '其他']]
        })
      };
      if (e.detail.value == 6) {//手机数码
        this.setData({
          multiArray: [['二手图书', '男女服装', '配饰', '鞋袜', '运动户外', '美妆个护', '手机数码', '日常用品', '学习办公', '箱包', '零食水果'], ['手机', '笔记本', '平板', '耳机', 'PC显示屏', '数据线/头', '鼠键', '智能手环', '路由器', '充电宝', '保护膜', '手机壳', 'U盘', '摄影相机', '其他']]
        })
      };
      if (e.detail.value == 7) {//日常用品
        this.setData({
          multiArray: [['二手图书', '男女服装', '配饰', '鞋袜', '运动户外', '美妆个护', '手机数码', '日常用品', '学习办公', '箱包', '零食水果'], ['台灯', '抽纸', '水杯','健身器材','抱枕玩偶',  '闹钟','床上用品','桌椅坐垫', '创意摆件', '热水壶', '餐具', '遮阳/雨伞', '脸盆', '收纳盒/架', '衣架', '插座', '锁具', '台历海报', '钥匙链/扣', '其他']]
        })
      };
      if (e.detail.value == 8) {//学习办公
        this.setData({
          multiArray: [['二手图书', '男女服装', '配饰', '鞋袜', '运动户外', '美妆个护', '手机数码', '日常用品', '学习办公', '箱包', '零食水果'], ['笔/芯', '文具盒/袋', '纸类', '笔记本', '书法画材', '订书机', '其他']]
        })
      };
      if (e.detail.value == 9) {//箱包
        this.setData({
          multiArray: [['二手图书', '男女服装', '配饰', '鞋袜', '运动户外', '美妆个护', '手机数码', '日常用品', '学习办公', '箱包', '零食水果'], ['双肩包', '斜挎包','旅行箱',  '手提袋', '钱/卡包', '其他']]
        })
      };
      if (e.detail.value == 10) {//零食水果
        this.setData({
          multiArray: [['二手图书', '男女服装', '配饰', '鞋袜', '运动户外', '美妆个护', '手机数码', '日常用品', '学习办公', '箱包', '零食水果'], ['水果', '方便面', '熟食', '膨化食品', '乳制品', '肉制品', '糕点', '糖果甜食', '其他']]
        })
      }


    };

  },

  //上传数据
  publish() {
    let goodsname = this.data.goodsname
    let goodsdetail = this.data.goodsdetail
    let imgList = this.data.imgList
    if (!goodsname || goodsname.length < 6) {
      wx.showToast({
        icon: "none",
        title: '宝贝名称不得少于6个字'
      })
      return
    }
    if (!goodsdetail || goodsdetail.length < 10) {
      wx.showToast({
        icon: "none",
        title: '宝贝描述建议10个字以上'
      })
      return
    }
    if (!imgList || imgList.length < 1) {
      wx.showToast({
        icon: "none",
        title: '请选择图片'
      })
      return
    }
    wx.showLoading({
      title: '发布中...',
    })

    const promiseArr = []
    //只能一张张上传 遍历临时的图片数组
    for (let i = 0; i < this.data.imgList.length; i++) {
      let filePath = this.data.imgList[i]
      let suffix = /\.[^\.]+$/.exec(filePath)[0]; // 正则表达式，获取文件扩展名
      //在每次上传的时候，就往promiseArr里存一个promise，只有当所有的都返回结果时，才可以继续往下执行
      promiseArr.push(new Promise((reslove, reject) => {
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix,
          filePath: filePath, // 文件路径
        }).then(res => {
          // get resource ID
          console.log("上传结果", res.fileID)
          this.setData({
            fileIDs: this.data.fileIDs.concat(res.fileID)
          })
          reslove()
        }).catch(error => {
          console.log("上传失败", error)
        })
      }))
    }
    //保证所有图片都上传成功
    let db = wx.cloud.database()
    Promise.all(promiseArr).then(res => {
      console.log('这个this有点东西',this)
      db.collection('timeline').add({
        data: {
          fileIDs: this.data.fileIDs,
          date: app.getNowFormatDate(),
          createTime: db.serverDate(),
          goodsname: this.data.goodsname,
          goodsdetail: this.data.goodsdetail,
          images: this.data.imgList,
          username:app.globalData.userInfo.nickName,
          useravatar:app.globalData.userInfo.avatarUrl,
          goodsnow:0,
          goodsprice: this.data.goodsprice,
          tagsnumber: this.data.multiIndex,
          tags: [this.data.multiArray[0][this.data.multiIndex[0]], this.data.multiArray[1][this.data.multiIndex[1]]],
          tagsone:this.data.multiIndex[0] 
        }, 
        success: res => {
          wx.hideLoading()
          wx.showToast({
            title: '发布成功',
          })
          console.log('发布成功', res)
          setTimeout(() => {
            wx.switchTab({
              url: '../../pages/index/index',
            })
          }, 1000)
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
    })
  },  

  deployed: function () {
    wx.navigateTo({
      url: '../deploy/deploy'
      //  url: '../logs/logs'
    })
  },

  powerDrawer: function (e) {

    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200, //动画时长  
      timingFunction: "linear", //线性  
      delay: 0 //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })
      //关闭  
      if (currentStatu == "close") {

        this.setData({
          showModalStatus: false
        });
        mask: true
      }
    }.bind(this), 200)
    // 显示  
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },

  //取消按钮  
  cancel: function (three) {
    var currentStatu = three.currentTarget.dataset.statu;
    this.util(currentStatu);
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function (two) {
    var currentStatu = two.currentTarget.dataset.statu;
    this.util(currentStatu);
  },

  getGoodsPrice: function (pri) {
    this.setData({
      goodsprice: pri.detail.value,
    });
    console.log("价格", pri.detail.value);
  }

 
})