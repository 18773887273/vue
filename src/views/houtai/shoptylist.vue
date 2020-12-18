<template>
  <el-row :gutter="20">
    <el-col :span="22" :offset="1">
      <div id="shoptylist">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="类型名">
            <el-input v-model="queryshoptyname" style="width: 400px;"></el-input>
            <el-button type="primary" plain @click="getData()" >查询</el-button>
            <el-button type="success" plain @click="addshopty()">添加</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" stripe style="width: 100%" border
                  :header-cell-style="headClass" :cell-style="rowClass" :row-class-name="tableRowClassName">
          <el-table-column prop="shoptyid" label="ID">
          </el-table-column>
          <el-table-column prop="shoptyname" label="商品类型名">
          </el-table-column>
          <el-table-column prop="shopremart" label="类型描述">
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="success" @click="editshopty(scope.row)" plain circle>编辑</el-button>
              <el-popconfirm title="确定删除这条记录吗？" @confirm="delshopty(scope.row)">
                <el-button type="danger" slot="reference" plain circle>删除</el-button>
              </el-popconfirm>

            </template>
          </el-table-column>
        </el-table>

        <!--分页显示  -->
        <el-pagination @current-change="pagechange"
                       :page-size="rows"
                       layout="total, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>



        <el-dialog title="添加类型" :visible.sync="addshoptydialogFormVisible">

          <addShopty ref="addshoptychild"></addShopty>
          <!--将编辑页面子组件加入到列表页面 -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="addshopquxiao()">取 消</el-button>
            <el-button type="primary" @click="shoptyadd()">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="编辑类型" :visible.sync="editshoptydialogFormVisible">

          <editShopty ref="editshoptychild"></editShopty>
          <!--将编辑页面子组件加入到列表页面 -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="editshopquxiao()">取 消</el-button>
            <el-button type="primary" @click="shopsave()">确 定</el-button>
          </div>
        </el-dialog>

      </div>
    </el-col>
  </el-row>
</template>

<script>

import AddShopty from '../../components/houtai/shopty/addshopty.vue'
import EditShopty from '../../components/houtai/shopty/editshopty.vue'

export default {
  name: 'shoptylist',
  data() {
    return {
      tableData: [],
      queryshoptyname: '',
      editshoptydialogFormVisible: false,
      addshoptydialogFormVisible: false,
      total: 1,
      page: 1,
      minprice: 0,
      maxprice: 1000000,
      rows:6
    }
  },
  methods: {
    tableRowClassName({
                        row,
                        rowIndex
                      }) {
      if (rowIndex % 2 == 1) {
        return 'info-row';
      } else {
        return 'success-row';
      }
      return '';
    },
    getData(func) { //获取数据方法

      var _this = this;

      var params = new URLSearchParams();
      params.append("page", this.page);
      params.append("shoptyname", this.queryshoptyname);
      params.append("rows", _this.rows);

      this.$axios.post("shoptype/querylike.action", params).then(function (result) {
        _this.tableData = result.data.rows;
        _this.total = result.data.total;
        func && func();
      }).catch(function (error) {
        alert(error)
      });

    },
    pagechange(pageindex) {  //页码变更时
      //console.log(pageindex)
      this.page = pageindex;
      //根据pageindex  获取数据
      this.getData();

    },
    delshopty(val) { //删除数据
      var _this = this;
      var params = new URLSearchParams();
      params.append("shoptyid", val.shoptyid);

      this.$axios.post("shoptype/delshoptype.action", params).then(function (result) {
        _this.getData(() => {
          _this.$message({
            message: result.data.msg,
            type: 'success'
          });
        });

      }).catch(function () {
        _this.$message({
          message: '删除失败',
          type: 'success'
        });
      });

    },
    editshopty(val) { //编辑按钮按下  打开编辑模态框
      //获取到要编辑的巨记录  通过val（id）
      setTimeout(() => {
        this.selectDate = {
          ...val
        }
        this.$refs.editshoptychild.editshopty = this.selectDate;
      })

      this.editshoptydialogFormVisible = true;

    },
    //修改保存操作
    shopsave() {
      var editrole = this.$refs.editshoptychild.editshopty;
      var _this = this;
      var shuptype = new URLSearchParams();
      shuptype.append("shoptyid", editrole.shoptyid);
      shuptype.append("shoptyname", editrole.shoptyname);
      shuptype.append("shopremart", editrole.shopremart);
      this.$axios.post("shoptype/editshoptype.action", shuptype).then(function (result) {
        _this.getData(() => {
          _this.$message({
            message: result.data.msg,
            type: 'success'
          });
        });
        _this.editshoptydialogFormVisible = false;

      })
        .catch(function (error) {
          _this.$message({
            message: '修改失败',
            type: 'success'
          });
        });

    },
    addshopty() {
      //index 索引  row对象 修改该条记录对象
      this.addshoptydialogFormVisible = true;
    },
    addshopquxiao() {
      this.addshoptydialogFormVisible = false;
      this.$refs.addshoptychild.addshoptype = {};
    },
    editshopquxiao() {
      this.editshoptydialogFormVisible = false;
    },
    shoptyadd() {
      var addshopty = this.$refs.addshoptychild.addshoptype;
      var _this = this;
      var shoptype = new URLSearchParams();
      shoptype.append("shoptyname", addshopty.shoptyname)
      shoptype.append("shopremart", addshopty.shoptymiaoshu)
      this.$axios.post("shoptype/editshoptype.action", shoptype).then(function (result) {
        if (result.data.msg == "添加成功") {
          _this.getData(() => {
            _this.$message({
              message: result.data.msg,
              type: 'success'
            });
          });

        }
      }).catch(function (error) {
        _this.$message({
          message: error,
          type: 'error'
        });
      });
      _this.$refs.addshoptychild.addshoptype = {};
      _this.addshoptydialogFormVisible = false;

    },
    headClass() { //表头居中显示
      return "text-align:center"
    },
    rowClass() { //表格数据居中显示
      return "text-align:center"
    },
  },
  created() { //钩子函数  vue对象初始化完成后  执行
    this.getData();
  },
  components: { //子组件
    addShopty: AddShopty,
    editShopty: EditShopty,
  }
}
</script>

<style>

.el-table .warning-row {
  background: oldlace;
}



#shoptylist {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

</style>
