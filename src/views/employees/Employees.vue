<template>
  <div class="employees">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>员工基本信息</span>
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
          :data="tableDataEnd.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          border
          style="width: 100%"  @sort-change="changeTableSort">
          <el-table-column
            prop="uid"
            label="员工编号"
            width="180"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="用户名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="role"
            label="部门">
          </el-table-column>
          <el-table-column
            prop="status"
            label="帐号状态">
          </el-table-column>
          <el-table-column
            prop="ehandle"
            label="操作">
            <template slot-scope="scope">
              <el-button style="float: left; padding-right: 3px;" type="text"><span style="color: blue" @click="upd">编辑</span></el-button>
              <el-button style="float: left; padding-right: 3px;" type="text"><span style="color: red" @click="del(scope.row,scope.$index)">删除</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3,5, 10, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableDataEnd.length">
        </el-pagination>
      </div>

  </el-card>
  </div>
</template>
<!--javaScript代码-->
<script>
  import {
      reg_eid,
      reg_ename,
      reg_erole,
      reg_money,
      reg_phone
  } from "../login/validator";
  export default {
        name: "Employees",
        data() {
            return {
                addSuccessful:false,
                // delSuccessful: false,
                // 在基础表格中展示的数据
                tableData: [],
                // 控制员工新增页面的form表单可见性
                dialogFormVisible: false,
                //删除的元素是谁
                delItem: [],
                updItem:[],
                //
                formLabelWidth: '120px',
                pagesize:5,
                currentPage:1, //初始页

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
                    value: 'uid',
                    label: '员工编号'
                }, {
                    value: 'user_name',
                    label: '员工姓名'
                },{
                    value: 'role',
                    label: '角色'
                }
                ],
                value: ''
                }
        },
        // 创建的时候发送请求获取显示数据库所有员工的列表数据
        created() {
            this.$axios.get("/admin/getAllemployees").then(res => {
                if (res.code === 200) {
                    let item = {
                        uid:"",
                        user_name:"",
                        phone:"",
                        role:"",
                        status: "",
                    };
                    res.data.data.forEach(value=>{
                        item.uid=value.uid;
                        item.user_name=value.userName;
                        item.phone=value.phone;
                        item.role=value.role;
                        item.status=value.status;
                        this.tableData.push(item);
                        item = {
                            uid:"",
                            user_name:"",
                            phone:"",
                            role:"",
                            status: "",
                        };
                    });
                    this.totalItems = this.tableData.length;
                    this.tableDataEnd=[];
                    this.tableData.forEach((value)=>{
                        this.tableDataEnd.push(value);
                    });
                }
            }).catch(failResponse => {
                this.$message.error(failResponse.message);
            })
        },
        methods: {
            //数据重置
            doReset(){
                this.searchInput="";
                this.tableDataEnd=[];
                this.tableData.forEach((value,index)=>{
                    this.tableDataEnd.push(value);
                });
            },
            //数据搜索
            doFilter(){
                var selectTag = this.selectTags;
                if(this.searchInput == ""){
                    this.$message.warning("查询信息不能为空！！！");
                    return;
                }
                this.tableDataEnd=[];
                this.filterTableDataEnd=[];
                this.tableData.forEach((value,index)=>{
                    if(selectTag === "uid"){
                        if(value.uid){
                            if(value.uid.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag=="user_name"){
                        if(value.user_name){
                            if(value.user_name.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag=="role"){
                        if(value.role){
                            if(value.role.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    console.log(index);
                });
                this.tableDataEnd=this.filterTableDataEnd;
                this.filterTableDataEnd=[];
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
            //分页排序整体表格数据
            changeTableSort(column){
                console.log(column);
                //获取字段名称和排序类型
                var fieldName = column.prop;
                var sortingType = column.order;
                //如果字段名称为“创建时间”，将“创建时间”转换为时间戳，才能进行大小比较
                if(fieldName=="idate"){
                    this.tableDataEnd.map(item => {
                        item.idate = this.$moment(item.idate).valueOf();
                    });
                }
                //按照降序排序
                if(sortingType == "descending"){
                    this.tableDataEnd = this.tableData.sort((a, b) => b[fieldName] - a[fieldName]);
                }
                //按照升序排序
                else{
                    this.tableDataEnd = this.tableData.sort((a, b) => a[fieldName] - b[fieldName]);
                    console.log(this.tableDataEnd)
                }
                if(fieldName=="idate"){
                    this.tableDataEnd.map(item => {
                        item.idate = this.$moment(item.idate).format(
                            "YYYY-MM-DD HH:mm:ss"
                        );
                    });
                }

            },
            //更新数据
            upd(updItem,index){
                this.$axios.put('/update',{
                    uid:this.form.eid,
                    usr_name:this.form.user_naem,
                    password:this.form.password,
                    phone:this.form.phone,
                    role:this.form.role,
                    status:this.form.status,
                }).then(successResponse =>{
                    if(successResponse.data.code == 200){
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                    }
                }).catch(failedResponse =>{
                    this.$message({
                        type: 'success',
                        message: '修改失败，您的密码可能错误!'
                    });


                } );

            }
            },

            // 删除选中下标的一行数据，index由click处的scope.$index传过来的小标，delItem由scope.$row传过来的元素
            del(delItem, index){
                console.log(delItem);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });

                this.$confirm('你确定要删除这条记录吗？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() =>{
                    //如果用户确实要删除，则用delete方式删除，并且传递要删除的记录的eid
                    this.$axios.delete('/home/emp',{
                        params:{
                            empId: delItem.eid
                        }
                    }).then(successResponse =>{

                        this.filterTableDataEnd=[];
                        //删除在表格中tableDataEnd显示的哪个数据
                        this.tableDataEnd.forEach((value,i)=>{
                            if(i !==index){
                                this.filterTableDataEnd.push(value);
                            }
                        });
                        this.tableDataEnd=this.filterTableDataEnd;
                        this.filterTableDataEnd=[];

                        //删除从数据源中tableData获得的数据
                        this.tableData.forEach((value,i)=>{
                            //通过主码快速过滤
                            if(value.eid!==delItem.eid){
                                this.filterTableDataEnd.push(value);
                            }
                        });
                        this.tableData = this.filterTableDataEnd;
                        this.filterTableDataEnd=[];

                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch(failResponse =>{
                        //用户同意删除情况下数据库删除失败
                        this.$message({
                            type: 'info',
                            message: '删除失败'
                        });
                    })
                }).catch(() =>{
                    //用户取消了删除
                    this.$message({
                        type: 'info',
                        message: '已删除取消'
                    });

                });
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
