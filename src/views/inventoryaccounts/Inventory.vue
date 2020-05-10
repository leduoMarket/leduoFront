<template>
  <div class="inventory">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>库存账</span>
    </div>
    <!--<div class="text item">
      <div class="text item">
        <el-input style="width: 300px"
                  placeholder="请输入商品编号"
                  v-model="searchInput"
                  clearable>
        </el-input>
        <el-button round @click="beginSearch">查询</el-button>
      </div>
    </div>-->
    <div class="form">
      <el-select v-model="selectTags" clearable size="medium"  placeholder="请选择" value="" >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="searchInput" placeholder="请输入信息"  size="medium" style="width:240px; margin-right:23% ;margin-bottom: 1.5%"></el-input>

      <el-button type="primary" icon="el-icon-search" @click="doFilter"  size="medium" round  plain>搜索</el-button>
      <el-button type="primary" icon="el-icon-refresh" @click="doReset" size="medium"  round  plain >重置</el-button>
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%">
        <el-table-column
          prop="gid"
          label="商品代码"
          width="180"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="gname"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="counts"
          label="库存量">
        </el-table-column>
        <el-table-column
          prop="stockAlert"
          label="库存提醒">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3,5, 10, 20]"
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
        name: "Inventory",
        data() {
            return {
                options: [],
                tableData: [],
                pagesize:5,  //分页数量
                currentPage:1, //初始页
                searchInput:'',

                // 控制员工新增页面的form表单可见性
                dialogTableVisible: false,
                dialogFormVisible: false,


                //初始数据的长度
                totalItems:0,
                //最后在页面中显示的数据
                tableDataEnd:[],
                //搜索框内的数据
                searchInput:"",
                filterTableDataEnd:[],
                flag:false,
                selectTags:"",

                //选择框的选项
                options: [{
                    value: 'gid',
                    label: '商品代码'
                }, {
                    value: 'gname',
                    label: '商品名称'
                }, {
                    value: 'counts',
                    label: '库存量'
                }
                ],
                value: ''

            }
        },
        // 创建的时候发送请求获取显示数据库列表数据
        created() {
            this.totalItems = this.tableData.length;
            this.tableDataEnd = this.tableData;
            this.$axios.get("/home/inventory").then(res => {
                if (res.data) {
                    console.log(res);
                    this.tableData = res.data;
                    this.totalItems = this.tableData.length;
                    this.tableDataEnd = this.tableData;
                    console.log(this.tableData.length);
                }
            }).catch(failResponse => {

            })
        },
        methods: {
            doFilter(){
                var selectTag = this.selectTags;
                if(this.searchInput == ""){
                    this.$message.warning("查询信息不能为空！！！");
                    return;
                }
                this.tableDataEnd=[];
                this.filterTableDataEnd=[];
                this.tableData.forEach((value,index)=>{
                    if(selectTag=="gid"){
                        if(value.gid){
                            if(value.gid.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag=="gname"){
                        if(value.gname){
                            if(value.gname.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag=="counts"){
                        if(value.counts){
                            if(value.counts.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }

                    console.log(index);
                });
                this.tableDataEnd=this.filterTableDataEnd;
                this.filterTableDataEnd=[];
            },
            doReset(){
                this.searchInput="";
                this.tableDataEnd = this.tableData;
            },

            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
                console.log(this.currentPage)
            },
            //查询
            beginSearch(){
                this.$axios.get('/home/queryInventory',{
                    params:{
                        gid:this.searchInput,
                    }
                }).then(successfulResponse=>{
                    console.log('this.tableData'+successfulResponse.data);
                    this.tableData=[];
                    this.tableData.push(successfulResponse.data);
                    this.$message({
                        message: '成功找到记录',
                        type: 'success'
                    });
                }).catch(failedResponse=>{
                    this.$message('没有找到记录哦');
                })
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
    width: 75%;
  }
  .form {
    height: 100%;
  }
</style>
