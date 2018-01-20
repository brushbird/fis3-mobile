module.exports = function(req, res, next) {

  var oData = {code: 0, message: '', data: ''};

  // 动态生成测试数据
  oData.data = {};
  oData.data.id = Math.floor(Math.random() * 10000);

  res.write(JSON.stringify(oData));
  res.end();
};