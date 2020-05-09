<template>
  <div class="goods">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>商品表</span>
           <!-- 新建页面-->
      <a href="http://localhost:8080/goodClass">
        <el-button style="float: right; padding: 3px 0" type="text">分类规则</el-button>
      </a>
      <el-button style="float: right; padding: 3px 10px" type="text" @click="dialogFormVisible = true">新建</el-button>
      <el-dialog title="商品表" :visible.sync="dialogFormVisible">
        <el-form :model="dataInfo" :rules="goodsRules" ref="dataInfo">
          <el-form-item label="商品代码" :label-width="formLabelWidth" prop="gid">
            <el-input v-model="dataInfo.gid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" :label-width="formLabelWidth" prop="gname">
            <el-input v-model="dataInfo.gname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品类别" :label-width="formLabelWidth" prop="categories">
          <el-input v-model="dataInfo.categories" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="生产地址" :label-width="formLabelWidth" prop="address">
            <el-input v-model="dataInfo.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="计价单位" :label-width="formLabelWidth" prop="charge_unit">
            <el-input v-model="dataInfo.charge_unit" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="生产日期" :label-width="formLabelWidth" prop="gdate">
            <el-input v-model="dataInfo.gdate" autocomplete="off"></el-input>
          </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addGoods">确 定</el-button>
        </div>
      </el-dialog>

    </div>
    <!--    查询模块-->
    <div class="text item">
      <el-input style="width: 300px"
                placeholder="请输入商品编号"
                v-model="searchInput"
                clearable>
      </el-input>
      <el-button round @click="beginSearch">查询</el-button>
    </div>
    <div class="form">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%">
        <el-table-column
          prop="gid"
          label="商品代码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="gname"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
        prop="categories"
        label="商品类别">
      </el-table-column>
        <el-table-column
          prop="address"
          label="生产地址">
        </el-table-column>
        <el-table-column
          prop="charge_unit"
          label="计价单位">
        </el-table-column>
        <el-table-column
          prop="gdate"
          label="生产日期">
        </el-table-column>
        <el-table-column
          prop="esalary"
          label="操作">
          <!--          默认为每一行增加删除操作，只需要在methods里面定义就好-->
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
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
    </div>
  </el-card>
  </div>
</template>

<script>
    import {
        reg_gid,
        reg_gname,
        reg_gcategories,
        reg_address,
        reg_gchange_unit,
        reg_date,
    } from "../login/validator";

    export default {
        name: "Goods",
        data() {
            return {
                // 标记删除或者添加是否成功
                addSuccessful: false,
                //显示页面的表单数据
                tableData: [

                ],
                //删除的元素是谁
                delItem: [
                ],
                // 控制新增页面的form表单可见性
                dialogTableVisible: false,
                dialogFormVisible: false,
                // 用于新增表单数据时的绑定
                dataInfo: {
                    gid:'',
                    gname:'',
                    categories:'',
                    address:'',
                    charge_unit:'',
                    gdate:''
                },
                formLabelWidth: '120px',
                pagesize:5,
                currentPage:1, //初始页
                searchInput:'',
                goodsRules:{
                    gid:[
                        {required:true ,validator: reg_gid,  trigger: 'blur'}
                    ],
                    gname:[
                        {required:true ,validator: reg_gname,  trigger: 'blur'}
                    ],
                    categories:[
                        {required:true ,validator: reg_gcategories,  trigger: 'blur'}
                    ],
                    address:[
                        {required:true ,validator: reg_address,  trigger: 'blur'}
                    ],
                    charge_unit:[
                        {required:true ,validator: reg_gchange_unit,  trigger: 'blur'}
                    ],
                    gdate:[
                        {required:true ,validator: reg_date,  trigger: 'blur'}
                    ]
                }
            }
        },
        // 创建的时候发送请求获取显示数据库所有员工的列表数据
        created() {
            console.log("vue被创建");
            this.$axios.get("/home/goods").then(res => {
                if (res.data) {
                    console.log(res);
                    this.tableData = res.data;
                }
            }).catch(failResponse => {

            })
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
            //查询
            beginSearch(){
                this.$axios.get('/home/queryGoods',{
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
            // 删除选中下标的一行数据，index由click处的scope.$index传过来的小标，delItem由scope.$row传过来的元素
            del(delItem, index){
                this.$confirm('你确定要删除这条记录吗？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() =>{
                    //如果用户确实要删除，则用delete方式删除，并且传递要删除的记录的eid
                    this.$axios.delete('/home/delGoods',{
                        params:{
                            GoodsId: delItem.gid
                        }
                    }).then(successResponse =>{
                        //数据库删除成功在table表里进行删除,
                        this.tableData.splice(index, 1);
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
            //新增表单操作
            addGoods(){
                this.$refs.dataInfo.validate()
                    .then(res =>{
                        this.$axios.post('/home/Goods',{
                            gid:this.dataInfo.gid,
                            gname:this.dataInfo.gname,
                            categories:this.dataInfo.categories,
                            address:this.dataInfo.address,
                            charge_unit:this.dataInfo.charge_unit,
                            gdate:this.dataInfo.gdate
                        }).then(successResponse =>{
                            if(successResponse.data.code == 200){
                                this.addSuccessful = true;
                                this.$message({
                                    message: '成功添加一条记录',
                                    type: 'success',
                                });
                                //将信息刷新到表格中
                                this.tableData.push(this.addform);
                                //清空填写单的信息放到请求体中，避免请求延迟已经被清空才刷新在信息到表格中
                                this.addform = {
                                    gid : '',
                                    gname : '',
                                    categories: '',
                                    address : '',
                                    charge_unit : '',
                                    gdate: '',
                                };
                            }
                        }).catch(failedResponse =>{

                        } );
                        // 让表格消失
                        this.addform = {
                            gid : '',
                            gname : '',
                            categories:'',
                            address : '',
                            charge_unit : '',
                            gdate: '',
                        };
                        this.dialogFormVisible = false;
                    }).catch(error =>{
                    this.$message({
                        message: '无法提交，表单中数据有错误',
                        type: 'error'
                    });
                });


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
