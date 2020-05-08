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

//商品代码
export var reg_gid = (rule, value, callback) => {
  const reg = /^\d{13}$/;
  if (!value) {
    callback(new Error('商品代码为空'));
  } else {
    let check = reg.test(value);
    if (!check) {
      callback(new Error('商品代码格式错误 (13位纯数字)'))
    }else{
      return true,
        callback()
    }
  }
}

//商品名称校验
export var reg_gname = (rule, value, callback) => {
  const reg = /^.{0,50}$/;
  if (!value) {
    callback(new Error('商品名称为空'));
  } else {
    let check = reg.test(value);
    if (!check) {
      callback(new Error('商品名称过长 (>50位字符)'))
    }else{
      return true,
        callback()
    }
  }
}
//商品类别校验
export var reg_gcategories = (rule, value, callback) => {
  const reg = /^\d{5}|\d{6}$/;
  if (!value) {
    callback(new Error('商品类别为空'));
  } else {
    let check = reg.test(value);
    if (!check) {
      callback(new Error('商品类别代码格式错误 (5或6位纯数字)'))
    }else{
      return true,
        callback()
    }
  }
}

//计价单位
export var reg_gchange_unit = (rule, value, callback) => {
  const reg = /^.{0,10}$/;
  if (!value) {
    callback(new Error('计价单位为空'));
  } else {
    let check = reg.test(value);
    if (!check) {
      callback(new Error('计价单位格式错误 (1-10位)'))
    }else{
      return true,
        callback()
    }
  }
}
//入库单号
export var reg_inumber = (rule, value, callback) => {
  const reg = /^I\d{8}$/;
  if(!value){
    callback(new Error('入库单单号为空'));
  }else{
    let check = reg.test(value);
    if (!check) {
      callback(new Error('入库单单号格式错误 (例：I20200401)'))
    }else{
      callback()
    }
  }
}

//出库单号
export var reg_onumber = (rule, value, callback) => {
  const reg = /^O\d{8}$/;
  if(!value){
    callback(new Error('出库单单号为空'));
  }else{
    let check = reg.test(value);
    if (!check) {
      callback(new Error('出库单单号格式错误 (例：O20200401)'))
    }else{
      callback()
    }
  }
}

//供应商名称
export var reg_vname = (rule, value, callback) => {
  const reg = /^.{1,50}$/;
  if(!value){
    callback(new Error('供应商名字为空'));
  }else{
    let check = reg.test(value);
    if (!check) {
      callback(new Error('供应商名称过长(>50个字符)'))
    }else{
      callback()
    }
  }
}

//欠款单单号格式
export var reg_dnumber = (rule, value, callback) => {
  const reg = /^\d{4}$/;
  if(!value){
    callback(new Error('欠款单号为空'));
  }else{
    let check = reg.test(value);
    if (!check) {
      callback(new Error('欠款单号格式错误(为四位纯数字)'))
    }else{
      callback()
    }
  }
}
//日期格式
export var reg_date = (rule, value, callback) => {
  const reg = /^(?<!\d)(?:(?:20\d{2})(?:(?:(?:0[13578]|1[02])31)|(?:(?:0[1,3-9]|1[0-2])(?:29|30)))|(?:(?:20(?:0[48]|[2468][048]|[13579][26]))0229)|(?:20\d{2})(?:(?:0?[1-9])|(?:1[0-2]))(?:0?[1-9]|1\d|2[0-8]))(?!\d)$/;
  if(!value){
    callback(new Error('日期为空'));
  }else{
    let check = reg.test(value);
    if (!check) {
      callback(new Error('日期格式不对(例：20200501)'))
    }else{
      callback()
    }
  }
}
//钱的数目格式
export var reg_money = (rule, value, callback) => {
  const reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
  if(!value){
    callback(new Error('金额为空'));
  }else{
    let check = reg.test(value);
    if (!check) {
      callback(new Error('金额格式不对(例：20.12)'))
    }else{
      callback()
    }
  }
}

//某种数量
export var reg_count = (rule, value, callback) => {
  const reg = /^\d{1,4}$|^10000$/;
  if(!value){
    callback(new Error('数量为空'));
  }else{
    let check = reg.test(value);
    if (!check) {
      callback(new Error('数量为整数且小于10000'))
    }else{
      callback()
    }
  }
}

//供应商id校验
export var reg_vid = (rule, value, callback) => {
  const reg = /^\d{7}$/;
  if(!value){
    callback(new Error('供应商id为空'));
  }else{
    let check = reg.test(value);
    if (!check) {
      callback(new Error('供应商id为7位纯数字'))
    }else{
      callback()
    }
  }
}

//地址校验
export var reg_address = (rule, value, callback) => {
  const reg = /^.{1,50}$/;
  if(!value){
    callback(new Error('地址为空'));
  }else{
    let check = reg.test(value);
    if (!check) {
      callback(new Error('地址过长<50位'))
    }else{
      callback()
    }
  }
}

//电话号码校验
export var reg_phone = (rule, value, callback) => {
  const reg = /^1[3456789]\d{9}$/;
  if(!value){
    callback(new Error('电话号码为空'));
  }else{
    let check = reg.test(value);
    if (!check) {
      callback(new Error('电话号码格式不正确'))
    }else{
      callback()
    }
  }
}

//邮箱校验
export var reg_email = (rule, value, callback) => {
  const reg = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/;
  if(!value){
    callback(new Error('邮箱为空'));
  }else{
    let check = reg.test(value);
    if (!check) {
      callback(new Error('邮箱格式不正确'))
    }else{
      callback()
    }
  }
}

//传真格式校验
export var reg_fax = (rule, value, callback) => {
  const reg = /^.{1,50}$/;
  if(!value){
    callback(new Error('传真为空'));
  }else{
    let check = reg.test(value);
    if (!check) {
      callback(new Error('传真名字过长(>50个字符)'))
    }else{
      callback()
    }
  }
}

//信誉等级测试
export var reg_credit = (rule, value, callback) => {
  const reg = /^\d$/;
  if(!value){
    callback(new Error('信誉等级'));
  }else{
    let check = reg.test(value);
    if (!check) {
      callback(new Error('信誉等级格式不正确，为一位纯数字'))
    }else{
      callback()
    }
  }
}

//员工名校验
export var reg_ename = (rule, value, callback) => {
  const reg = /^.{1,50}$/;
  if(!value){
    callback(new Error('人名为空'));
  }else{
    let check = reg.test(value);
    if (!check) {
      callback(new Error('人名过长（>50)'))
    }else{
      callback()
    }
  }
}

//原因信息校验
export var reg_reason = (rule, value, callback) => {
  const reg = /^.{1,100}$/;
  if(!value){
    callback(new Error('原因为空'));
  }else{
    let check = reg.test(value);
    if (!check) {
      callback(new Error('原因过长<100位'))
    }else{
      callback()
    }
  }
}

//支付流水单单号校验
export var reg_pnumber = (rule, value, callback) => {
  const reg = /^.{5,15}$/;
  if(!value){
    callback(new Error('支付流水单号为空'));
  }else{
    let check = reg.test(value);
    if (!check) {
      callback(new Error('支付流水单号格式错误(5-15位字符)'))
    }else{
      callback()
    }
  }
}
//支付流水单类别校验校验
export var reg_pcategory = (rule, value, callback) => {
  const reg = /^.{1,2}$/;
  if(!value){
    callback(new Error('支付流水单类别为空'));
  }else{
    let check = reg.test(value);
    if (!check) {
      callback(new Error('支付流水单类别为2位以内的字符'))
    }else{
      callback()
    }
  }
}
//支付流水来源店铺
export var reg_source_shop = (rule, value, callback) => {
  const reg = /^.{1,50}$/;
  if(!value){
    callback(new Error('支付流水单来源店铺为空'));
  }else{
    let check = reg.test(value);
    if (!check) {
      callback(new Error('支付流水单来源店铺过长（长度>50)'))
    }else{
      callback()
    }
  }
}

//用户id校验
export var reg_eid = (rule, value, callback) => {
  const reg = /^\d{10}$/;
  if(!value){
    callback(new Error('员工id为空'));
  }else{
    let check = reg.test(value);
    if (!check) {
      callback(new Error('员工id格式不正确(10位纯数字)'))
    }else{
      callback()
    }
  }
}
//用户角色校验
export var reg_erole = (rule, value, callback) => {
  const reg = /^.{1,10}$/;
  if(!value){
    callback(new Error('员工角色为空'));
  }else{
    let check = reg.test(value);
    if (!check) {
      callback(new Error('员工角色格式不正确(<10位字符)'))
    }else{
      callback()
    }
  }
}
