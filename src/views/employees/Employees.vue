<template>
  <div class="employees">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>员工基本信息</span>
      </div>
      <el-dialog title="员工信息" :visible.sync="dialogFormVisible">
        <el-form :model="dataInfo" :rules="empRules" ref="dataInfo">
          <el-form-item label="员工编号" :label-width="formLabelWidth" prop="uid">
            <el-input v-model="dataInfo.uid" readonly autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="user_name">
            <el-input v-model="dataInfo.user_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
            <el-input v-model="dataInfo.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="职位" :label-width="formLabelWidth" prop="role">
            <el-input v-model="dataInfo.role" readonly autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="upd"  >确 定</el-button>
        </div>
      </el-dialog>
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
            label="职位">
          </el-table-column>
          <el-table-column
            prop="status"
            label="帐号状态">
          </el-table-column>
          <el-table-column
            prop="eHandle"
            label="操作">
            <template slot-scope="scope">
              <el-button style="float: left; padding-right: 3px;" type="text"><span style="color: blue" @click="edit(scope.row,scope.$index)">编辑</span></el-button>
              <el-button style="float: left; padding-right: 3px;" type="text"><span style="color: red" @click="delEmployee(scope.row,scope.$index)">删除</span>
              </el-button>
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
<!--javaScript代码-->
<script>
    import {
        reg_phone,
        reg_ename,
    } from "../login/validator";
  export default {
        name: "Employees",
        data() {
            return {
                scope:null,
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
                pageSize:5,
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
                value: '',
                dataInfo:'',
                index:'',
                empRules:{
                    user_name:[{
                        required:true,
                        validator:reg_ename,
                        trigger:'blur',
                    }],
                    phone:[{
                        required:true,
                        validator: reg_phone,
                        trigger: 'blur'
                    }],
                }
            }
        },
        // 创建的时候发送请求获取显示数据库所有员工的列表数据
        created() {

            this.tableData=[];
            this.$axios.get("/admin/getAllemployees").then(res => {
                if (res.data.code === 200) {
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
                        if(value.status===0){
                            item.status ="锁定";
                        }else{
                            item.status = "正常";
                        }
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
                this.tableData.forEach((value)=>{
                    this.tableDataEnd.push(value);
                });
            },
            //数据搜索
            doFilter(){
                let selectTag = this.selectTags;
                if(selectTag === ""){
                    this.$message.warning("查询条件不能为空！！！");
                    return;
                }
                if(this.searchInput === ""){
                    this.$message.warning("查询信息不能为空！！！");
                    return;
                }
                this.tableDataEnd=[];
                this.filterTableDataEnd=[];
                this.tableData.forEach((value)=>{
                    if(selectTag === "uid"){
                        if(value.uid){
                            if(value.uid.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="user_name"){
                        if(value.user_name){
                            if(value.user_name.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="role"){
                        if(value.role){
                            if(value.role.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                });
                this.tableDataEnd=this.filterTableDataEnd;
                this.filterTableDataEnd=[];
            },

            // 初始页currentPage、初始每页数据数pageSize和数据data
            handleSizeChange: function (size) {
                this.pageSize = size;
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
            },
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
            //更新数据
            upd(){
                this.$axios.put('/admin/updatePhoneOrName',{
                    uid:this.dataInfo.uid,
                    userName:this.dataInfo.user_name,
                    phone:this.dataInfo.phone,
                }).then(successResponse =>{
                    if(successResponse.data.code === 200){
                        this.tableDataEnd[this.index]=this.dataInfo;
                        this.tableData.forEach(value => {
                            if(value.uid === this.dataInfo.uid){
                                value=this.dataInfo;
                            }
                        });
                        this.dialogFormVisible=false;
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                    }
                }).catch(() =>{
                    this.$message({
                        type: 'error',
                        message: '修改失败'
                    });
                } );
            },
            //编辑数据框的可以显示
            edit(item,index){
                this.dialogFormVisible = true;
                this.dataInfo=item;
                this.index=index;

            }, // 删除选中下标的一行数据，index由click处的scope.$index传过来的小标，delItem由scope.$row传过来的元素
            delEmployee(delItem, index){
                //前端测试部分
                this.$confirm('你确定要删除这条记录吗？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() =>{
                    //如果用户确实要删除，则用delete方式删除，并且传递要删除的记录的eid
                    this.$axios.delete('/admin/delemp?empId='+delItem.uid)
                        .then(successResponse =>{
                            if(successResponse.data.code===200){
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
                                this.tableData.forEach((value)=>{
                                    //通过主码快速过滤
                                    if(value.uid!==delItem.uid){
                                        this.filterTableDataEnd.push(value);
                                    }
                                });
                                this.tableData = this.filterTableDataEnd;
                                this.filterTableDataEnd=[];

                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            }else {
                                this.$message({
                                    type: 'info',
                                    message: '删除失败'
                                });
                            }

                    }).catch(() =>{
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
