<template>
  <div class="log">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>日志查询</span>
    <!--  <el-button style="float: right; padding-right: 3px;" type="text">新建</el-button>-->
    </div>

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
        :data="tableDataEnd.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="序号"
          width="180"

        >
        </el-table-column>
        <el-table-column
          prop="message"
          label="日志信息"
          width="300"
        >
        </el-table-column>
        <el-table-column
          prop="levelString"
          label="级别">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="handler"
          label="操作人">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3,5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableDataEnd.length">
      </el-pagination>

      <el-button type="text"  @click="getMore"  size="medium" style="margin-left: 95%">更多</el-button>


    </div>
  </el-card>
  </div>
</template>
<script>

    export default {
        name: "Log",
        data() {
            return {
                options: [{
                    value:'id',
                    label:'序号',
                },{
                    value:'message',
                    label:'日志信息',
                },{
                    value:'levelString',
                    label:'级别',
                },{
                    value:'createdTime',
                    label:'创建时间',
                }],
                value: '',
                tableData: [],
                tableDataEnd:[],
                pageSize:5,  //分页数量
                currentPage:1, //初始页

                //搜索框内的数据
                searchInput:"",
                filterTableDataEnd:[],
                flag:false,
                selectTags:"",
            }
        },
        // 创建的时候发送请求获取显示数据库所有的列表数据
        created() {
            this.$axios.get("/someLog").then(res => {
                if (res.data.code===200) {
                    console.log(res);
                    this.tableData = res.data.data;
                    this.totalItems = this.tableData.length;
                    this.tableDataEnd=[];
                    this.tableData.forEach((value)=>{
                        this.tableDataEnd.push(value);
                    });
                    console.log(this.tableData.length);
                }
            }).catch(failResponse => {
                this.$message.warning(failResponse.data.message);

            })
        },
        methods: {

            //数据重置
            doReset(){
                this.searchInput="";
                this.tableDataEnd=[];
                this.tableData.forEach((value)=>{
                    this.tableDataEnd.push(value);
                });
            },
            //数据搜索
            doFilter(){
                let selectTag = this.selectTags;
                if(this.searchInput === ""){
                    this.$message.warning("查询信息不能为空！！！");
                    return;
                }
                if(selectTag === ""){
                    this.$message.warning("查询条件不能为空！！！");
                    return;
                }
                this.searchInput=this.searchInput.trim();
                this.tableDataEnd=[];
                this.filterTableDataEnd=[];
                this.tableData.forEach((value,index)=>{
                    if(selectTag === "id"){
                        if(value.id){
                            let id = ""+value.id;
                            if(id.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="message"){
                        if(value.message){
                            let message = ""+value.message;
                            if(message.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="levelString"){
                        if(value.levelString){
                            let levelString= ""+value.levelString;
                            if(levelString.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    console.log(index);
                });
                this.tableDataEnd=this.filterTableDataEnd;
                this.filterTableDataEnd=[];
            },

            // 初始页currentPage、初始每页数据数pageSize和数据data
            handleSizeChange: function (size) {
                this.pageSize = size;
                console.log(this.pageSize)
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
                console.log(this.currentPage)
            },
            getMore(){
                this.$axios.get('/allLog')
                    .then(res => {
                    if (res.data.data.code==200) {
                        console.log(res);
                        res.data.data.forEach(value =>{
                            this.tableData.push(value);
                        });
                        this.totalItems = this.tableData.length;
                        this.tableDataEnd=[];
                        this.tableData.forEach((value)=>{
                            this.tableDataEnd.push(value);
                        });
                        console.log(this.tableData.length);
                    }
                }).catch(failResponse => {
                    this.$message.error(failResponse.data.message);

                })
            }

        }
    }
</script>
<style scoped>

  .box-card {
    width: 75%;
  }
  .form {
    height: 100%;
  }
</style>
