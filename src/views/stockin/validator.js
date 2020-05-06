//商品代码
export var reg_gid = (rule, value, callback) => {
  const reg = /^\d{13}$/;
  if (!value) {
    callback(new Error('请输入商品代码'));
  } else {
    let check = reg.test(value);
    if (!check) {
      callback(new Error('商品格式错误'))
    }else{
      return true,
        callback()
    }
  }
}
//入库单号
export var reg_inumber = (rule, value, callback) => {
  const reg = /^O\d{10}$/;
  if(!value){
    callback(new Error('请输入入库单号'));
  }else{
    let check = reg.test(value);
    if (!check) {
      callback(new Error('入库单号格式错误'))
    }else{
      callback()
    }
  }
}
