<template>
    <div>
    <h1>负组件：{{ordersid}}</h1>
      <el-table :data="tableData" :row-class-name="tableRowClassName" border max-height="437px"
                :header-cell-style="headClass" :cell-style="rowClass" width="100%">
        <el-table-column prop="orderbianhao" label="编号" fixed="left" width="140px">
        </el-table-column>
        <!--<el-table-column label="姓名">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>身份证号码: {{ scope.row.empcard }}</p>
              <p>住址: {{ scope.row.empaddress }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.empname }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column prop="ordertime" label="创建时间" width="300px">
        </el-table-column>
        <el-table-column prop="ordercount" label="总数量" width="140px">
        </el-table-column>
        <el-table-column prop="ordermoney" label="总金额" width="140px">
        </el-table-column>
        <el-table-column prop="orderstate" label="订单状态" width="140px">
          <template slot-scope="scope">
            <span v-if="scope.row.orderstate==1">待付款</span>
            <span v-if="scope.row.orderstate==2">发货中</span>
            <span v-if="scope.row.orderstate==3">已取消</span>
            <span v-if="scope.row.orderstate==4">发货中</span>
            <span v-if="scope.row.orderstate==5">待提货</span>
            <span v-if="scope.row.orderstate==6">已提货</span>
          </template>
        </el-table-column>
        <!--<el-table-column
          prop="img"
          label="图片">
          <template slot-scope="scope">
            <img  :src="scope.row.img" style="width: 30px"/>
          </template>
        </el-table-column>-->
      </el-table>
      <br>
      <!--分页显示  -->
      <el-pagination @current-change="pagechange"
                     :page-size="rows"
                     layout="total, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>

    </div>
</template>

<script>
    export default {
        name: "dingdanxiangqing",
      props:["order"],
      data(){
          return{
          ordersid:this.order,
          }
      },
      watch:{
        order:function(curVal,oldVal){
          if(curVal){
            alert(curVal)
            this.ordersid=curVal;
          }
        }
      },
      created() {

      }
    }
</script>

<style scoped>

</style>
