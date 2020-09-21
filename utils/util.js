const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function post({ url, data = {}, success, fail, revertBack } = {}) {
  console.log(url)
	wx.request({
		url: url,
		data: data,
		header: { 'content-type': 'application/json'},
		method: 'POST',
		success: (res) => {
      console.log(res)
			if (res.data.code == '200') {
				success && success(res.data.data);
			}
			else if (res.data.code == '401') {
				// wx.navigateTo({
				//   url: '/page/login/login/index',
				// })
				let appInstance = getApp();
				appInstance.wxLogin(revertBack);
			}
			else {
				fail && fail(res.data);
			}
		},
		fail: function (res) { // 请求失败，错误处理 
			// errorHander(res);
		}
	})
}
function get({ url, dataForm = {}, success, fail, revertBack } = {}) {
	let str = '';
	for (var item in dataForm) {
		str = str + '&' + item + '=' + dataForm[item]
	}
	var url = str ? api + str : api;
	wx.request({
		url: url,
		header: { 'content-type': 'application/json' },
		method: 'GET',
		success: (res) => {
			if (res.data.status == '200') {
				success && success(res.data);
			}
			else if (res.data.status == '401') {
				// wx.navigateTo({
				//   url: '/page/login/login/index',
				// })
				let appInstance = getApp();
				appInstance.wxLogin(revertBack);
			}
			else {
				fail && fail(res.data);
			}
		},
		fail: function (res) { // 请求失败，错误处理 
			// errorHander(res);
		}
	})
}
module.exports = {
  formatTime: formatTime,
  post: post,
  get: get,
}
