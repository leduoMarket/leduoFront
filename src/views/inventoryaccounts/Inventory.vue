<template>
  <div class="inventory">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>库存账</span>
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
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%"  @sort-change="changeTableSort">
        <el-table-column
          prop="gid"
          label="商品代码"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="gname"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="counts"
          label="库存量"
          sortable="custom"
        >
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
    import moment from 'moment'
    export default {
        name: "Inventory",
        data() {
            return {
                tableData: [{
                    gid:'24518',
                    gname:'苹果',
                    counts:14,
                },{
                    gid:'201',
                    gname:'饮料',
                    counts:51,
                },{
                    gid:'134',
                    gname:'面包',
                    counts:14,
                },{
                    gid:'309',
                    gname:'薯片',
                    counts:14,
                }],
                pagesize:5,  //分页数量
                currentPage:1, //初始页


                // 控制员工新增页面的form表单可见性
                dialogTableVisible: false,
                dialogFormVisible: false,


                //初始数据的长度
                totalItems:0,
                //最后在页面中显示的数据
                tableDataEnd:[],
                //搜索框内的数据
                searchInput:'',
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
            this.tableData.forEach((value,index)=>{
                this.tableDataEnd.push(value);
            });
            this.$axios.get("/home/inventory").then(res => {
                if (res.data.code===200) {
                    console.log(res);
                    this.tableData = res.data;
                    this.totalItems = this.tableData.length;
                    this.tableDataEnd=[];
                    this.tableData.forEach((value,index)=>{
                        this.tableDataEnd.push(value);
                    });
                    console.log(this.tableData.length);
                }
            }).catch(failResponse => {

            })
        },
        methods: {
            //分页排序整体表格数据
            changeTableSort(column){
                console.log(column);
                //获取字段名称和排序类型
                var fieldName = column.prop;
                var sortingType = column.order;
                //按照降序排序
                if(sortingType == "descending"){
                    this.tableDataEnd = this.tableData.sort((a, b) => b[fieldName] - a[fieldName]);
                }
                //按照升序排序
                else{
                    this.tableDataEnd = this.tableData.sort((a, b) => a[fieldName] - b[fieldName]);
                    console.log(this.tableDataEnd)
                }
            },

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
                    if(selectTag==="gid"){
                        if(value.gid){
                            let gid = ""+value.gid;
                            if(gid.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="gname"){
                        if(value.gname){
                            let gname = ""+value.gname;
                            if(gname.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="counts"){
                        if(value.counts){
                            let counts = ""+value.counts;
                            if(counts.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }

                    console.log(index);
                });
                this.tableDataEnd=[];
                this.tableDataEnd=this.filterTableDataEnd;
                this.filterTableDataEnd=[];
            },
            doReset(){
                /*this.searchInput="";
                this.tableDataEnd = this.tableData;*/
                this.searchInput="";
                this.tableDataEnd=[];
                this.tableData.forEach((value)=>{
                    this.tableDataEnd.push(value);
                });
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
