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
        :data="tableDataEnd.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        border
        style="width: 100%"  @sort-change="changeTableSort">
        <el-table-column
          prop="gid"
          label="商品代码"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="gName"
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
          <template scope="scope">
            <span v-if="scope.row.stockAlert!==msg" style="color:red">{{ scope.row.stockAlert }}</span>
            <span v-else style="color: #37B328">{{ scope.row.stockAlert }}</span>
          </template>
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
    </div>
  </el-card>
  </div>
</template>

<script>
    export default {
        name: "Inventory",
        data() {
            return {
                scope:null,
                msg:"库存不足",
                tableData: [],
                pageSize:5,  //分页数量
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
                    value: 'gName',
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

            this.tableData=[];
            this.$axios.get("/staff/incentoryAccounts").then(res => {
                if (res.data.code===200) {
                    let item = {
                        gid:"",
                        gName:"",
                        counts:"",
                        stockAlert:""
                    };
                    res.data.data.forEach(value=>{
                        item.gid = value.gid;
                        item.gName = value.gname;
                        item.counts = value.counts;
                        item.stockAlert = value.stockAlert;
                        this.tableData.push(item);
                        item = {
                            gid:"",
                            gName:"",
                            counts:"",
                            stockAlert:""
                        };
                    });
                    this.totalItems = this.tableData.length;
                    this.tableDataEnd=[];
                    this.tableData.forEach((value)=>{
                        this.tableDataEnd.push(value);
                    });
                }
            }).catch(() => {


            })
        },
        methods: {
            //分页排序整体表格数据
            changeTableSort(column){
                //获取字段名称和排序类型
                let fieldName = column.prop;
                let sortingType = column.order;
                //按照降序排序
                if(sortingType === "descending"){
                    this.tableDataEnd = this.tableData.sort((a, b) => b[fieldName] - a[fieldName]);
                }
                //按照升序排序
                else{
                    this.tableDataEnd = this.tableData.sort((a, b) => a[fieldName] - b[fieldName]);
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
                this.tableData.forEach((value,)=>{
                    if(selectTag==="gid"){
                        if(value.gid){
                            let gid = ""+value.gid;
                            if(gid.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="gName"){
                        if(value.gName){
                            let gName = ""+value.gName;
                            if(gName.search(this.searchInput)!==-1){
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
                });
                this.tableDataEnd=[];
                this.tableDataEnd=this.filterTableDataEnd;
                this.filterTableDataEnd=[];
            },
            doReset(){
                this.searchInput="";
                this.tableDataEnd=[];
                this.tableData.forEach((value)=>{
                    this.tableDataEnd.push(value);
                });
            },

            // 初始页currentPage、初始每页数据数pageSize和数据data
            handleSizeChange: function (size) {
                this.pageSize = size;
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
            },
        },
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
