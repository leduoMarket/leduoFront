<template>
  <div class="v">
  <el-card class="box-card"  >
    <div slot="header" class="clearFix">
      <span>供应商表</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">新建</el-button>
      <el-dialog title="供应商表" :visible.sync="dialogFormVisible">
        <el-form :model="addForm"  :rules="venderRules" ref="addForm">
          <el-form-item label="供应商代码" :label-width="formLabelWidth" prop="vid">
            <el-input v-model="addForm.vid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" :label-width="formLabelWidth" prop="vName">
            <el-input v-model="addForm.vName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth" prop="vAddress">
            <el-input v-model="addForm.vAddress" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" prop="vPhone">
            <el-input v-model="addForm.vPhone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop="vEmail">
          <el-input v-model="addForm.vEmail" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="传真" :label-width="formLabelWidth" prop="vFax">
            <el-input v-model="addForm.vFax" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="信誉" :label-width="formLabelWidth" prop="vCredit">
            <el-input v-model="addForm.vCredit" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="贷款结算" :label-width="formLabelWidth" prop="vSettleAccount">
            <el-input v-model="addForm.vSettleAccount" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addVender">确 定</el-button>
        </div>
      </el-dialog>
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
        style="width: 100%"  ref="filterTable" size="medium"  stripe  @sort-change="changeTableSort">
        <el-table-column
          prop="vid"
          label="供应商代码"
          width="120"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          prop="vName"
          label="供应商名称"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="vAddress"
          label="地址"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="vPhone"
          width="130"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="vEmail"
          label="E-mail"
          width="180">
        </el-table-column>
        <el-table-column
          prop="vFax"
          width="120"
          label="传真">
        </el-table-column>
        <el-table-column
          prop="vCredit"
          label="信誉"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          prop="vSettleAccount"
          label="贷款结算">
        </el-table-column>
        <el-table-column
          fixed="right"
          prop="eSalary"
          label="操作">

          <template slot-scope="scope">
            <el-button style="float: left; padding-right: 3px;" type="text"><span style="color: red" @click="del(scope.row,scope.$index)">删除</span></el-button>
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
  import {
      reg_vid,
      reg_vname,
      reg_address,
      reg_phone,
      reg_email,
      reg_fax,
      reg_credit,
      reg_count
  } from "../login/validator";
  export default {
        name: "V",
        data() {
            return {
                scope:null,
                //添加表单成功吗
                addSuccessful:false,
                // 从后台传来的初始数据
                tableData: [
                    {
                        vid: 1234567,
                        vName: 'weqwe',
                        vAddress: 'wewew',
                        vPhone: 13112122323,
                        vEmail:'123@qq.com',
                        vFax: '12321312',
                        vCredit: 12,
                        vSettleAccount: 898
                    },
                    {
                        vid: 20200401,
                        vName: '王二虎',
                        vAddress: '北极西南',
                        vPhone: 13677273048,
                        vEmail:'2409981311@qq.com',
                        vFax: 123,
                        vCredit: 1,
                        vSettleAccount: 10000
                    },{
                        vid: 20200403,
                        vName: '王二虎',
                        vAddress: '北极西南',
                        vPhone: 13677273048,
                        vEmail:'2409981311@qq.com',
                        vFax: 123,
                        vCredit: 1,
                        vSettleAccount: 10000
                    },
                    {
                        vid: 20200404,
                        vName: '王二虎',
                        vAddress: '北极西南',
                        vPhone: 13677273048,
                        vEmail:'2409981311@qq.com',
                        vFax: 123,
                        vCredit: 1,
                        vSettleAccount: 10000
                    },
                    {
                        vid: 20200405,
                        vName: '王二虎',
                        vAddress: '北极西南',
                        vPhone: 13677273048,
                        vEmail:'2409981311@qq.com',
                        vFax: 123,
                        vCredit: 1,
                        vSettleAccount: 10000
                    },
                ],
                //删除的元素是谁
                delItem: [
                ],

                // 控制员工新增页面的form表单可见性
                dialogTableVisible: false,
                dialogFormVisible: false,
                addForm: {
                    vid: '',
                    vName: '',
                    vAddress: '',
                    vPhone: '',
                    vEmail:'',
                    vFax: '',
                    vCredit: '',
                    vSettleAccount: ''
                },
                formLabelWidth: '120px',
                pageSize:5,
                currentPage:1, //初始页

                //搜索功能的数据

                //初始数据的长度
                totalItems:0,
                //最后在页面中显示的数据
                tableDataEnd:[],
                //搜索框内的数据
                searchInput:"",
                filterTableDataEnd:[],
                flag:false,
                selectTags:"",
                //正则规则加载
                venderRules:{
                    vid:[
                        { required:true ,validator: reg_vid,  trigger: 'blur'}
                    ],
                    vName:[
                        { required:true ,validator: reg_vname, trigger:'blur'}
                    ],
                    vAddress:[
                        { required:true ,validator: reg_address, trigger:'blur' }
                    ],
                    vPhone :[
                        {required:true ,validator: reg_phone, trigger:'blur'}
                    ],
                    vEmail: [
                        {required:true ,validator: reg_email, trigger:'blur'}
                    ],
                    vFax:[
                        {required:true ,validator: reg_fax, trigger:'blur'}
                    ],
                    vCredit:[
                        {required:true ,validator: reg_credit, trigger:'blur'}
                    ],
                    vSettleAccount:[
                        {required:true ,validator: reg_count, trigger:'blur'}
                    ]
                },
                //选择框的选项
                options: [{
                    value: 'vid',
                    label: '供应商代码'
                }, {
                    value: 'vName',
                    label: '供应商名称'
                }, {
                    value: 'vAddress',
                    label: '供应商地址'
                }, {
                    value: 'vPhone',
                    label: '供应商电话'
                }, {
                    value: 'vEmail',
                    label: '供应商E-mail'
                },{
                    value: 'vFax',
                    label: '供应商传真'
                },{
                    value: 'vCredit',
                    label: '供应商信誉'
                },{
                    value: 'vSettleAccount',
                    label: '供应商贷款'
                }
                ],
                value: ''
            }
        },
      // 创建的时候发送请求获取显示数据库所有员工的列表数据
      created() {
          // this.tableDataEnd=[];
          // this.tableData.forEach((value)=>{
          //     this.tableDataEnd.push(value);
          // });
          this.tableData = [];
          this.$axios.get("/staff/getAllVenders").then(res=>{
              if(res.data.code===200){
                  let item = {
                      vid: '',
                      vName: '',
                      vAddress: '',
                      vPhone: '',
                      vEmail:'',
                      vFax: '',
                      vCredit: '',
                      vSettleAccount: ''
                  };
                  res.data.data.forEach(value=>{
                      item.vid=value.vid;
                      item.vName =value.vname;
                      item.vAddress=value.vaddress;
                      item.vPhone=value.vphone;
                      item.vEmail=value.vemail;
                      item.vFax = value.vfax;
                      item.vCredit= value.vcredit;
                      item.vSettleAccount=value.vsettleAccount;
                      this.tableData.push(item);
                      item = {
                          vid: '',
                          vName: '',
                          vAddress: '',
                          vPhone: '',
                          vEmail:'',
                          vFax: '',
                          vCredit: '',
                          vSettleAccount: ''
                      };
                  });
                  this.totalItems = this.tableData.length;
                  this.tableDataEnd=[];
                  this.tableData.forEach((value)=>{
                      this.tableDataEnd.push(value);
                  });
                  console.log(this.tableData.length);
              }
          }).catch(()=>{

              this.$message.error('不能加载该页面的数据');

          })
      },
        methods: {
            //分页排序整体表格数据
            changeTableSort(column){
                console.log(column);
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
                this.searchInput =this.searchInput.trim();
                this.tableDataEnd=[];
                this.filterTableDataEnd=[];
                this.tableData.forEach((value,index)=>{
                    if(selectTag==="vid"){
                        if(value.vid){
                            //int 与  string
                            let vid = ""+value.vid;
                            if(vid.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="vName"){
                        if(value.vName){
                            let vName =""+ value.vName;
                            if(vName.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="vAddress"){
                        if(value.vAddress){
                            let vAddress = value.vAddress;
                            if(vAddress.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="vPhone"){
                        if(value.vPhone){
                            let vPhone ="" + value.vPhone;
                            if(vPhone.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }if(selectTag==="vEmail"){
                        if(value.vEmail){
                            let vEmail ="" + value.vEmail;
                            if(vEmail.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }if(selectTag==="vFax"){
                        if(value.vFax){
                            let vFax = ""+value.vFax;
                            if(vFax.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }if(selectTag==="vCredit"){
                        if(value.vCredit){
                            let vCredit = ""+value.vCredit;
                            if(vCredit.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }if(selectTag==="vSettleAccount"){
                        if(value.vSettleAccount){
                            let vSettleAccount = ""+value.vSettleAccount;
                            if(vSettleAccount.search(this.searchInput)!==-1){
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
                this.tableDataEnd=[];
                this.tableData.forEach((value)=>{
                    this.tableDataEnd.push(value);
                });
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
            addVender(){
                //前端测试部分
                // this.tableData.unshift(this.addForm);
                // this.tableDataEnd.unshift(this.addForm);
                // //清空填写单的信息放到请求体中，避免请求延迟已经被清空才刷新在信息到表格中
                // this.addForm = {
                //     vid: '',
                //     vName: '',
                //     vAddress: '',
                //     vPhone: '',
                //     vEmail:'',
                //     vFax: '',
                //     vCredit: '',
                //     vSettleAccount: ''
                // };
                // this.dialogFormVisible = false;
                this.$refs.addForm.validate()
                    .then(() =>{
                        this.$axios.post('/staff/addVender', {
                            vid: this.addForm.vid,
                            vname: this.addForm.vName,
                            vaddress: this.addForm.vAddress,
                            vphone: this.addForm.vPhone,
                            vemail: this.addForm.vEmail,
                            vfax: this.addForm.vFax,
                            vcredit: this.addForm.vCredit,
                            vsettleAccount: this.addForm.vSettleAccount,

                        }).then(successResponse => {
                            if (successResponse.data.code === 200) {
                                this.addSuccessful = true;
                                this.$message({
                                    message: '成功添加一条记录',
                                    type: 'success',
                                });
                                //将信息刷新到表格中
                                this.tableData.unshift(this.addForm);
                                this.tableDataEnd.unshift(this.addForm);
                                //清空填写单的信息放到请求体中，避免请求延迟已经被清空才刷新在信息到表格中
                                this.addForm = {
                                    vid: '',
                                    vName: '',
                                    vAddress: '',
                                    vPhone: '',
                                    vEmail:'',
                                    vFax: '',
                                    vCredit: '',
                                    vSettleAccount: ''
                                };
                                this.dialogFormVisible = false;
                            }
                        }).catch(failedResponse => {
                            this.$message.error(failedResponse.data.message);
                        });
                    }).catch(()=>{
                        console.log("提交失败");
                        this.$message({
                        message: '无法提交，表单中数据有错误',
                        type: 'error'
                    });
                });
            },
            del(delItem, index) {
                //前端测试部分
                //数据库删除成功在table表里进行删除,
                // this.filterTableDataEnd=[];
                // //删除在表格中tableDataEnd显示的哪个数据
                // this.tableDataEnd.forEach((value,i)=>{
                //     if(i !==index){
                //         this.filterTableDataEnd.push(value);
                //     }
                // });
                // this.tableDataEnd=this.filterTableDataEnd;
                // this.filterTableDataEnd=[];
                // //删除从数据源中tableData获得的数据
                // this.tableData.forEach((value,i)=>{
                //     //通过主码快速过滤
                //     if(value.vid!==delItem.vid){
                //         this.filterTableDataEnd.push(value);
                //     }
                // });
                // this.tableData = this.filterTableDataEnd;
                // this.filterTableDataEnd=[];
                // this.$message({
                //     type: 'success',
                //     message: '删除成功!'
                // });
                this.$confirm('你确定要删除这条记录吗？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() =>{
                    //如果用户确实要删除，则用delete方式删除，并且传递要删除的记录的eid
                    this.$axios.delete('/staff/delVender?venderId='+delItem.vid
                    ).then(successResponse =>{
                        if(successResponse.data.code === 200){
                            //数据库删除成功在table表里进行删除,
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
                                if(value.vid!==delItem.vid){
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
                            this.$message.error("删除失败");
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
            }

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
