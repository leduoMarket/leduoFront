//验证用户名
export var reg_userName = (rule, value, callback) => {
  const reg = /^\d{7}$/;
  if (!value) {
    callback(new Error('    用户名为空'));
  } else {
    let check = reg.test(value);
    if (!check) {
      callback(new Error('    用户名错误 (为7位纯数字)'))
    }else{
      return true,
        callback()
    }
  }
}
//验证密码
export var reg_password = (rule, value, callback) => {
  const reg = /^(?![a-zA-Z]+$)(?![0-9]+$)[A-Za-z0-9]{8,18}$/;
  if(!value){
    callback(new Error('    密码为空'));
  }else{
    let check = reg.test(value);
    if (!check) {
      callback(new Error('    密码格式错误 (8-18位数字加字母)'))
    }else{
      callback()
    }
  }
}
