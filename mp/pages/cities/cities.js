// pages/cities/cities.js
import { getTopCities, getCitiesByKeyword } from '../../utils/heweather';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultCities: [],
    searchCities: [],
    lastKeyword: ''
  },

  bindConfirmSearch: function(e) {
    //debugger;
    var keyword = e.detail.value;
    if (!keyword) return;
    this.setData({
      lastKeyword: keyword,
      searchCities: []
    });
    getCitiesByKeyword(keyword, function(data) {
      this.setData({
        searchCities: data
      });
    }.bind(this));
  },

  bindViewCity: function(e) {
    var cityId = e.target.dataset.cid;
    if (cityId) {
      wx.navigateTo({
        url: `../index/index?cid=${cityId}`
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getTopCities(function(data) {
      this.setData({
        defaultCities: data
      });
    }.bind(this));
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})