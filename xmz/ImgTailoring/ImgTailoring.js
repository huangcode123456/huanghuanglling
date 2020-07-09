const globalData = getApp().globalData;
Page({
  data: {
    src: '',
    width: 250,//宽度
    height: 250,//高度
  },
  onLoad: function (options) {
    //获取到image-cropper实例
    this.cropper = this.selectComponent("#image-cropper");
    //开始裁剪
    this.setData({
      src: wx.getStorageSync('imgUrl')[0].path,
    });
    wx.showLoading({
      title: '加载中'
    })
  },
  cropperload(e) {
    console.log("cropper初始化完成");
  },
  loadimage(e) {
    console.log("图片加载完成", e.detail);
    wx.hideLoading();
    //重置图片角度、缩放、位置
    this.cropper.imgReset();
  },
  clickcut(e) {
    console.log(e.detail);
    //点击裁剪框阅览图片
    wx.previewImage({
      current: e.detail.url, // 当前显示图片的http链接
      urls: [e.detail.url] // 需要预览的图片http链接列表
    })
  },
  btn(){
    this.cropper.getImg(res=>{
      console.log(res)
      let that=this;
      that.setData({
        imgUrl:res.url
      })
      wx.uploadFile({
        url: globalData.apiUrl + 'user/upload?', // 仅为示例，非真实的接口地址
        filePath: res.url,
        name: 'uploadfile_ant',
        header: {
          "Content-Type": "multipart/form-data"
        },
        success(res) {
          console.log(res);
          
          if (res.statusCode == 200) {
            // 上传完成需要更新 fileList
            // const { fileList = [] } = that.data;
            // let file = {path:that.data.imgUrl}
            // fileList.push({ ...file, url: res.data });
            let fileList = { path: that.data.imgUrl, url: res.data }
            // that.setData({ fileList });
            wx.setStorage({
              key: 'fileList',
              data: fileList,
            })
            console.log(fileList)
            wx.navigateBack({
              delta: 1
            })
            
          } else {
            wx.showToast({
              icon: 'none',
              title: '上传失败，请重试！',
            })
          }

        }
      });
    })
  }
})