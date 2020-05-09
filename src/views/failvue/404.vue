<!--<template>-->
<!--  <div class="error-page">-->
<!--    <div class="error-code">404</div>-->
<!--    <div class="error-desc">你访问的页面不在</div>-->
<!--    <div class="error-handle">-->
<!--      <router-link to="/">-->
<!--        <el-button type="primary" size="large">返回登录页面</el-button>-->
<!--      </router-link>-->
<!--      <el-button class="error-btn" type="primary" size="large" @click="goBack">返回上一级</el-button>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "404.vue",-->
<!--        data () {-->
<!--            return {-->
<!--            }-->
<!--        },-->
<!--        methods:{-->
<!--            goBack() {-->
<!--                this.$router.go(-1)-->
<!--            }-->
<!--        }-->

<!--    }-->
<!--</script>-->
<template>
  <div>
    <el-input v-model="tableDataName" placeholder="请输入姓名" style="width:240px"></el-input>
    <el-button type="primary" @click="doFilter">搜索</el-button>
    <el-table
      :data="tableDataEnd"
      border
      style="width: 100%">.
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalItems">
    </el-pagination>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                tableDataBegin: [
                    {
                        date: "2016-05-01",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄"
                    },
                    {
                        date: "2016-05-02",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1517 弄"
                    },
                    {
                        date: "2016-05-03",
                        name: "王二虎",
                        address: "上海市普陀区金沙江路 1519 弄"
                    },
                    {
                        date: "2016-05-04",
                        name: "王二虎",
                        address: "上海市普陀区金沙江路 1516 弄"
                    },
                    {
                        date: "2016-05-05",
                        name: "王三虎",
                        address: "上海市普陀区金沙江路 1518 弄"
                    },
                    {
                        date: "2016-05-06",
                        name: "王三虎",
                        address: "上海市普陀区金沙江路 1517 弄"
                    },
                    {
                        date: "2016-05-07",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1519 弄"
                    },
                    {
                        date: "2016-05-08",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1516 弄"
                    }
                ],
                tableDataName: "",
                tableDataEnd: [],
                currentPage: 4,
                pageSize: 2,
                totalItems: 0,
                filterTableDataEnd:[],
                flag:false
            };
        },
        created() {
            this.totalItems = this.tableDataBegin.length;
            if (this.totalItems > this.pageSize) {
                for (let index = 0; index < this.pageSize; index++) {
                    this.tableDataEnd.push(this.tableDataBegin[index]);
                }
            } else {
                this.tableDataEnd = this.tableDataBegin;
            }
        },
        methods: {
            //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
            //用两个变量接收currentChangePage函数的参数
            doFilter() {
                if (this.tableDataName == "") {
                    this.$message.warning("查询条件不能为空！");
                    return;
                }
                this.tableDataEnd = []
                //每次手动将数据置空,因为会出现多次点击搜索情况
                this.filterTableDataEnd=[]
                this.tableDataBegin.forEach((value, index) => {
                    if(value.name){
                        if(value.name.indexOf(this.tableDataName)>=0){
                            this.filterTableDataEnd.push(value)
                        }
                    }
                });
                //页面数据改变重新统计数据数量和当前页
                this.currentPage=1
                this.totalItems=this.filterTableDataEnd.length
                //渲染表格,根据值
                this.currentChangePage(this.filterTableDataEnd)
                //页面初始化数据需要判断是否检索过
                this.flag=true
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.handleCurrentChange(this.currentPage);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                //需要判断是否检索
                if(!this.flag){
                    //tableDataBegin不能写成tableDataEnd，不然在没有进行搜索功能的时候，不能进行分页操作，数据丢失
                    this.currentChangePage(this.tableDataBegin)
                }else{
                    this.currentChangePage(this.filterTableDataEnd)
                }
            }, //组件自带监控当前页码
            currentChangePage(list) {
                let from = (this.currentPage - 1) * this.pageSize;
                let to = this.currentPage * this.pageSize;
                this.tableDataEnd = [];
                for (; from < to; from++) {
                    if (list[from]) {
                        this.tableDataEnd.push(list[from]);
                    }
                }
            }
        }
    };
</script>

<style scoped>
  .error-page{
    display: flex;
    padding-top: 100px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #f3f3f3;
    box-sizing: border-box;
  }
  .error-code{
    line-height: 1;
    font-size: 150px;
    font-weight: bold;
    color: #2d8cf0;
  }
  .error-code span {
    color: #00a854;
  }
  .error-desc {
    font-size: 30px;
    color: #777;
  }
  .error-handle{
    margin-top: 30px;
    padding-bottom: 200px;
  }
  .error-btn{
    margin-left: 100px;
  }
</style>
