<template>
  <div class="GoodClass">
    <router-view></router-view>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品分类表</span>
        <el-button style="float: right; padding-right: 3px;" type="text">
          <router-link to="addemployee">新建</router-link>
        </el-button>
      </div>
      <div class="form">
        <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          border
          style="width: 100%">
            <el-table-column label="商品大类">
              <el-table-column
                prop="id1"
                label="代码"
                width="100">
              </el-table-column>
              <el-table-column
                prop="name1"
                label="名称"
                width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column label="商品中类">
              <el-table-column
                prop="id2"
                label="代码"
                width="100">
              </el-table-column>
              <el-table-column
                prop="name2"
                label="名称"
                width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column label=" 商品小类">
              <el-table-column
                prop="id3"
                label="代码"
                width="100">
              </el-table-column>
              <el-table-column
                prop="name3"
                label="名称"
                width="100">
              </el-table-column>
              <el-table-column
                prop="id4"
                label="代码"
                width="100">
              </el-table-column>
              <el-table-column
                prop="name4"
                label="名称"
                width="100">
              </el-table-column><el-table-column
              prop="id5"
              label="代码"
              width="100">
            </el-table-column>
              <el-table-column
                prop="name5"
                label="名称"
                width="100">
              </el-table-column>
            </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3,5, 10, 20, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length">
        </el-pagination>
      </div>
    </el-card>


  </div>


</template>

<script>
    export default {
        data() {
            return {
                pagesize:5,  //分页数量
                currentPage:1,//初始页
                listSearch:"", //搜索框的内容存储
                options: [],
                itemCount:[],
                tableData: [{
                    id1: "1",
                    name1: "包装食品",
                    id2: "101",
                    name2: "休闲食品",
                    id3: "10101",
                    name3: "膨化食品",
                    id4: "10102",
                    name4: "干果炒货",
                    id5: "10103",
                    name5: "果脯蜜饯"
                },{
                    id1: " ",
                    name1: " ",
                    id2: " ",
                    name2: " ",
                    id3: "10104",
                    name3: "肉脯食品",
                    id4: "10105",
                    name4: "鱼片",
                    id5: "",
                    name5: ""
                },{
                    id1: " ",
                    name1: " ",
                    id2: "102",
                    name2: "饼干糕点",
                    id3: "10201",
                    name3: "饼干",
                    id4: "10202",
                    name4: "派类",
                    id5: "10203",
                    name5: "糕点"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "10204",
                    name3: "曲奇",
                    id4: "",
                    name4: "",
                    id5: "",
                    name5: ""
                },{
                    id1: "",
                    name1: "",
                    id2: "103",
                    name2: "糖果",
                    id3: "10301",
                    name3: "香口腔",
                    id4: "10302",
                    name4: "巧克力",
                    id5: "10303",
                    name5: "硬糖"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "10304",
                    name3: "软糖",
                    id4: "10305",
                    name4: "果冻",
                    id5: "",
                    name5: ""
                },{
                    id1: "",
                    name1: "",
                    id2: "104",
                    name2: "冲调食品",
                    id3: "10401",
                    name3: "奶，豆粉",
                    id4: "10402",
                    name4: "麦片/餐粉",
                    id5: "10403",
                    name5: "茶叶"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "10404",
                    name3: "夏凉饮品",
                    id4: "10405",
                    name4: "功能糖",
                    id5: "10406",
                    name5: "固体咖啡"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "10407",
                    name3: "藕粉、羹",
                    id4: "",
                    name4: "",
                    id5: "",
                    name5: ""
                },{
                    id1: "",
                    name1: "",
                    id2: "105",
                    name2: "营养保健品",
                    id3: "10501",
                    name3: "参茸滋补",
                    id4: "10502",
                    name4: "浓缩保健",
                    id5: "10503",
                    name5: "减肥食品"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "10504",
                    name3: "药酒",
                    id4: "10505",
                    name4: "蜂产品",
                    id5: "",
                    name5: ""
                },{
                    id1: "2",
                    name1: "饮料烟酒",
                    id2: "201",
                    name2: "饮料",
                    id3: "20101",
                    name3: "碳酸饮料",
                    id4: "20102",
                    name4: "饮用水",
                    id5: "20103",
                    name5: "茶饮咖啡"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "20104",
                    name3: "果汁",
                    id4: "20105",
                    name4: "功能饮料",
                    id5: "20106",
                    name5: "常温奶品"
                },{
                    id1: "",
                    name1: "",
                    id2: "202",
                    name2: "酒类",
                    id3: "20201",
                    name3: "国产白酒",
                    id4: "20202",
                    name4: "葡萄/色酒",
                    id5: "20203",
                    name5: "啤酒"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "20204",
                    name3: "功能酒",
                    id4: "20205",
                    name4: "进口酒",
                    id5: "20206",
                    name5: "其他"
                },{
                    id1: "3",
                    name1: "副食",
                    id2: "301",
                    name2: "罐头",
                    id3: "30101",
                    name3: "水果罐头",
                    id4: "30102",
                    name4: "农产罐头",
                    id5: "30103",
                    name5: "畜产罐头"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "30104",
                    name3: "水产罐头",
                    id4: "30105",
                    name4: "果酱",
                    id5: "30106",
                    name5: "沙拉酱"
                },{
                    id1: "",
                    name1: "",
                    id2: "302",
                    name2: "调味制品",
                    id3: "30201",
                    name3: "调味料",
                    id4: "30202",
                    name4: "调味汁",
                    id5: "30303",
                    name5: "调味酱"
                },{
                    id1: "",
                    name1: "",
                    id2: "303",
                    name2: "土产干货",
                    id3: "30301",
                    name3: "农产干货",
                    id4: "30302",
                    name4: "水产干货",
                    id5: "30303",
                    name5: "畜产干货"
                },{
                    id1: "",
                    name1: "",
                    id2: "304",
                    name2: "酱菜",
                    id3: "30401",
                    name3: "酱菜",
                    id4: "30402",
                    name4: "腐乳",
                    id5: "",
                    name5: ""
                },{
                    id1: "4",
                    name1: "粮油",
                    id2: "401",
                    name2: "速食品",
                    id3: "40101",
                    name3: "方便面",
                    id4: "40102",
                    name4: "方便粥/饭",
                    id5: "40103",
                    name5: "速食调理"
                },{
                    id1: "",
                    name1: "",
                    id2: "402",
                    name2: "粮食类",
                    id3: "40201",
                    name3: "米面类",
                    id4: "40202",
                    name4: "杂粮类",
                    id5: "40203",
                    name5: "粮食制品"
                },{
                    id1: "",
                    name1: "",
                    id2: "403",
                    name2: "粮食油",
                    id3: "40301",
                    name3: "花生油",
                    id4: "40302",
                    name4: "调和油",
                    id5: "40303",
                    name5: "色拉油"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "40304",
                    name3: "栗米油",
                    id4: "40305",
                    name4: "菜籽油",
                    id5: "",
                    name5: ""
                },{
                    id1: "5",
                    name1: "生鲜类",
                    id2: "501",
                    name2: "畜禽类",
                    id3: "50101",
                    name3: "猪肉及分割",
                    id4: "50102",
                    name4: "猪肉加工品",
                    id5: "50103",
                    name5: "牛肉及分割"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "50104",
                    name3: "牛肉加工品",
                    id4: "50105",
                    name4: "羊肉及分割",
                    id5: "50106",
                    name5: "羊肉加工品"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "50107",
                    name3: "禽类及分割",
                    id4: "50108",
                    name4: "禽类加工品",
                    id5: "",
                    name5: ""
                },{
                    id1: "",
                    name1: "",
                    id2: "502",
                    name2: "水产类",
                    id3: "50201",
                    name3: "淡水鱼类",
                    id4: "50202",
                    name4: "海水鱼类",
                    id5: "50303",
                    name5: "虾蟹贝鱼"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "50204",
                    name3: "水制产品",
                    id4: "50205",
                    name4: "水发制品",
                    id5: "",
                    name5: ""
                },{
                    id1: "",
                    name1: "",
                    id2: "503",
                    name2: "蔬果类",
                    id3: "50301",
                    name3: "蔬菜",
                    id4: "50302",
                    name4: "水果",
                    id5: "50303",
                    name5: "干菜"
                },{
                    id1: "",
                    name1: "",
                    id2: "504",
                    name2: "熟食速食",
                    id3: "50401",
                    name3: "熟食制品",
                    id4: "50402",
                    name4: "速食制品",
                    id5: "",
                    name5: ""
                },{
                    id1: "6",
                    name1: "日配类",
                    id2: "601",
                    name2: "面包主食",
                    id3: "60101",
                    name3: "面包西点",
                    id4: "60102",
                    name4: "主食面点",
                    id5: "",
                    name5: ""
                },{
                    id1: "",
                    name1: "",
                    id2: "602",
                    name2: "熟食素食",
                    id3: "60201",
                    name3: "熟食制品",
                    id4: "60202",
                    name4: "豆制小菜",
                    id5: "60203",
                    name5: "半成品"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "60204",
                    name3: "素食制品",
                    id4: "",
                    name4: "",
                    id5: "",
                    name5: ""
                },{
                    id1: "",
                    name1: "",
                    id2: "603",
                    name2: "奶蛋类",
                    id3: "60301",
                    name3: "鲜奶",
                    id4: "60302",
                    name4: "发酵奶",
                    id5: "60303",
                    name5: "调味奶"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "60304",
                    name3: "奶油乳酪",
                    id4: "60305",
                    name4: "蛋品类",
                    id5: "",
                    name5: ""
                },{
                    id1: "",
                    name1: "",
                    id2: "604",
                    name2: "冻品类",
                    id3: "60401",
                    name3: "速冻面点",
                    id4: "60402",
                    name4: "微波食品",
                    id5: "60403",
                    name5: "肉类制品"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "60404",
                    name3: "水产制品",
                    id4: "60405",
                    name4: "蔬菜制品",
                    id5: "60406",
                    name5: "冰棒雪糕"
                },{
                    id1: "",
                    name1: "",
                    id2: "605",
                    name2: "保鲜果汁",
                    id3: "60501",
                    name3: "鲜果汁",
                    id4: "60502",
                    name4: "鲜菜汁",
                    id5: "",
                    name5: ""
                },{
                    id1: "7",
                    name1: "散装加工",
                    id2: "701",
                    name2: "散货食品",
                    id3: "70101",
                    name3: "散装蜜饯",
                    id4: "70102",
                    name4: "散装干果",
                    id5: "70103",
                    name5: "散装糖果"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "70104",
                    name3: "散装干货",
                    id4: "70105",
                    name4: "散装茶叶",
                    id5: "70106",
                    name5: "散装糕点"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "70107",
                    name3: "散装粮",
                    id4: "70108",
                    name4: "散装油",
                    id5: "",
                    name5: ""
                },{
                    id1: "8",
                    name1: "文体办公",
                    id2: "801",
                    name2: "文化办公",
                    id3: "80101",
                    name3: "文具",
                    id4: "80102",
                    name4: "纸张本册",
                    id5: "80103",
                    name5: "档案用品"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "80104",
                    name3: "办公器材",
                    id4: "80105",
                    name4: "通讯器材",
                    id5: "80106",
                    name5: "工艺/礼品"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "80107",
                    name3: "相册相架",
                    id4: "",
                    name4: "",
                    id5: "",
                    name5: ""
                },{
                    id1: "",
                    name1: "",
                    id2: "802",
                    name2: "体育娱乐",
                    id3: "80201",
                    name3: "娱乐用品",
                    id4: "80202",
                    name4: "球类玩具",
                    id5: "80203",
                    name5: "运动器材"
                },{
                    id1: "",
                    name1: "",
                    id2: "803",
                    name2: "玩具类",
                    id3: "80301",
                    name3: "塑料玩具",
                    id4: "80302",
                    name4: "布绒玩具",
                    id5: "80303",
                    name5: "拼装玩具"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "80304",
                    name3: "电动玩具",
                    id4: "80305",
                    name4: "仿真玩具",
                    id5: "80306",
                    name5: "童车玩具"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "80207",
                    name3: "益智玩具",
                    id4: "",
                    name4: "",
                    id5: "",
                    name5: ""
                },{
                    id1: "9",
                    name1: "五金家电",
                    id2: "901",
                    name2: "五金交电",
                    id3: "90101",
                    name3: "灯具照明",
                    id4: "90102",
                    name4: "电工电料",
                    id5: "90103",
                    name5: "家用五金"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "90104",
                    name3: "汽摩用品",
                    id4: "90105",
                    name4: "维修工具",
                    id5: "90106",
                    name5: "随声听",
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "90107",
                    name3: "游戏机",
                    id4: "90108",
                    name4: "精品小家电",
                    id5: "90109",
                    name5: "热水器"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "90110",
                    name3: "灶具",
                    id4: "90111",
                    name4: "其他家电",
                    id5: "",
                    name5: ""
                },{
                    id1: "10",
                    name1: "家具百货",
                    id2: "1001",
                    name2: "家具用品",
                    id3: "100101",
                    name3: "家用厨具",
                    id4: "100102",
                    name4: "餐具茶具",
                    id5: "100103",
                    name5: "不锈钢制品"
                },{
                    id3: "100104",
                    name3: "搪铝制品",
                    id2: "",
                    name2: "",
                    id1: "",
                    name1: "",
                    id4: "100105",
                    name4: "玻璃制品",
                    id5: "100106",
                    name5: "塑料制品"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "100107",
                    name3: "家用耗品",
                    id4: "100108",
                    name4: "家用杂品",
                    id5: "",
                    name5: ""
                },{
                    id1: "",
                    name1: "",
                    id2: "1002",
                    name2: "休闲用品",
                    id3: "100201",
                    name3: "拼装家具",
                    id4: "100202",
                    name4: "竹木藤具",
                    id5: "100203",
                    name5: "室内装饰"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "100204",
                    name3: "雨具伞具",
                    id4: "100205",
                    name4: "工艺盆栽",
                    id5: "",
                    name5: ""
                },{
                    id1: "",
                    name1: "",
                    id2: "1003",
                    name2: "箱包皮具",
                    id3: "100301",
                    name3: "成人箱包",
                    id4: "100302",
                    name4: "学生包",
                    id5: "100303",
                    name5: "旅行箱包"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "100304",
                    name3: "休闲包",
                    id4: "100305",
                    name4: "钥匙/钱包",
                    id5: "",
                    name5: ""
                },{
                    id1: "11",
                    name1: "洗涤日化",
                    id2: "1101",
                    name2: "个人护理",
                    id3: "110101",
                    name3: "洗浴用品",
                    id4: "110102",
                    name4: "洗发用品",
                    id5: "110103",
                    name5: "美发护发"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "110104",
                    name3: "美容化妆",
                    id4: "110105",
                    name4: "润护品",
                    id5: "110106",
                    name5: "个人洁护"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "110107",
                    name3: "功能液/皂",
                    id4: "110108",
                    name4: "婴幼用品",
                    id5: "",
                    name5: ""
                },{
                    id1: "",
                    name1: "",
                    id2: "1102",
                    name2: "家用清洁",
                    id3: "110201",
                    name3: "洗衣液/粉",
                    id4: "110202",
                    name4: "衣物护理",
                    id5: "110203",
                    name5: "居室清洁剂"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "110204",
                    name3: "厨房清洁剂",
                    id4: "110205",
                    name4: "浴厕清洁剂",
                    id5: "110206",
                    name5: "皮革养护剂"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "110207",
                    name3: "洗衣皂",
                    id4: "",
                    name4:"",
                    id5: "",
                    name5: ""
                },{
                    id1: "",
                    name1: "",
                    id2: "1103",
                    name2: "家用纸品类",
                    id3: "110301",
                    name3: "餐/面/湿巾",
                    id4: "110302",
                    name4: "卫生巾",
                    id5: "110303",
                    name5: "护垫"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "110304",
                    name3: "家用卷纸",
                    id4: "110305",
                    name4: "成人保健",
                    id5: "110306",
                    name5: "一次性用品"
                },{
                    id1: "",
                    name1: "",
                    id2: "1104",
                    name2: "杀虫芳香类",
                    id3: "110401",
                    name3: "杀虫剂/片",
                    id4: "110402",
                    name4: "杀虫器。具",
                    id5: "110403",
                    name5: "防虫用品"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "110404",
                    name3: "芳香剂",
                    id4: "110405",
                    name4: "除湿用品",
                    id5: "",
                    name5: ""
                },{
                    id1: "12",
                    name1: "针纺服饰",
                    id2: "1201",
                    name2: "床上用品",
                    id3: "120101",
                    name3: "寝具套件",
                    id4: "120102",
                    name4: "床单被罩",
                    id5: "120103",
                    name5: "床垫枕头"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "120104",
                    name3: "夏凉用具",
                    id4: "120105",
                    name4: "被/褥/枕/垫",
                    id5: "12106",
                    name5: "家装布衣"
                },{
                    id1: "",
                    name1: "",
                    id2: "1202",
                    name2: "针棉织品",
                    id3: "120201",
                    name3: "男内衣/裤",
                    id4: "120202",
                    name4: "女内衣/裤",
                    id5: "120203",
                    name5: "男/女睡衣"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "120204",
                    name3: "男袜",
                    id4: "120205",
                    name4: "女袜",
                    id5: "120206",
                    name5: "毛巾浴巾"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "120207",
                    name3: "儿童内衣",
                    id4: "120208",
                    name4: "童袜",
                    id5: "",
                    name5: ""
                },{
                    id1: "",
                    name1: "",
                    id2: "1203",
                    name2: "服饰服装",
                    id3: "120301",
                    name3: "男士服装",
                    id4: "120302",
                    name4: "女士服装",
                    id5: "120303",
                    name5: "儿童服装"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "120304",
                    name3: "衬衫",
                    id4: "120305",
                    name4: "御寒外套",
                    id5: "120306",
                    name5: "应急时装"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "120207",
                    name3: "毛衣毛裤",
                    id4: "120208",
                    name4: "皮带",
                    id5: "120209",
                    name5: "领带"
                },{
                    id1: "",
                    name1: "",
                    id2: "1204",
                    name2: "鞋帽类",
                    id3: "120401",
                    name3: "男式皮鞋",
                    id4: "120402",
                    name4: "女式皮鞋",
                    id5: "120403",
                    name5: "童鞋"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "120404",
                    name3: "拖鞋",
                    id4: "120405",
                    name4: "旅游鞋",
                    id5: "120406",
                    name5: "便鞋"
                },{
                    id1: "",
                    name1: "",
                    id2: "",
                    name2: "",
                    id3: "120407",
                    name3: "休闲鞋",
                    id4: "120408",
                    name4: "功能鞋具",
                    id5: "",
                    name5: ""
                },

                ]
            }
        },
        methods: {
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
                console.log(this.currentPage)
            },
        },
    }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 50px;
  }
  .box-card {
    width: 78%;
  }
  .form {
    height: 100%;
  }

</style>
