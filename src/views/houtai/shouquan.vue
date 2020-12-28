<template>
	<div id="app">
		<el-form label-width="100px">
			<el-form-item label="角色名:">
				<el-input v-model="queryrname" placeholder="请输入要查询的角色"></el-input>
			</el-form-item>
			<el-button type="info" plain>查询</el-button>
			<el-button type="primary" plain @click="shouquan">授权</el-button>
		</el-form>
    <el-col :span="11">
		<el-table max-height="600" :data="roletableData" ref="multipleTable"
              @selection-change="rolechange"
              border
              :row-class-name="tableRowClassName"
              @select="select"
              @select-all="selectAll"
              @row-click="xuanzhong">
			<el-table-column type="selection"  width="60px"></el-table-column>
			<el-table-column prop="rname" label="角色名"   width="150px">
			</el-table-column>
		</el-table>
    </el-col>



    <el-col :span="2" class="el-col-offset-2">
      <hr
        style="float: left;height: 510px;margin-top:10px;margin-bottom:10px;margin-right: 30px;border: 1px solid #aaa;">
    </el-col>
    <el-col :span="8">
      <el-tree
        ref="tree"
        :data="treeData"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[1]"
      >
      </el-tree>
    </el-col>
	</div>
</template>
<style>
</style>

<script>
	export default {
		name: 'app',
		data() {
			return {
				num: 1,
				roletableData: [],
				total: 1,
				page: 1,
				queryrname: "",
				checked: null, // 如果使用单选框,定义一个model值
				multipleSelection: [],
        treeData: [],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
        rid:""
				}
			},
			methods: {
					tableRowClassName({
						row,
						rowIndex
					}) {
						if(rowIndex % 2 == 1) {
							return 'info-row';
						} else {
							return 'success-row';
						}
						return '';
					},
					getData() { //获取数据方法
						var _this = this;
						var params = new URLSearchParams();
						params.append("rname", this.queryrname);
						params.append("page", this.page);
						params.append("rows", 1000);
						this.$axios.post("role/querylike.action", params).then(function(result) {
							_this.roletableData = result.data.rows;
							_this.total = result.data.total;
						}).catch(function(error) {
							alert(error)
						});


            let pamer = new URLSearchParams();
            pamer.append("username", sessionStorage.getItem("username"))
            this.$axios.post("menu/querycaishou.action",pamer).then(function (result) {
              _this.treeData = result.data;
            }).catch(function (erreo) {
              alert(erreo)
            })
					},
        xuanzhong(row){
					  //alert(111)
          //alert(row.rid)
          var _this = this;
          var params = new URLSearchParams();
          this.rid=row.rid;
          params.append("rid", row.rid);

          this.$axios.post("menu/queryallmenus3.action", params).then(function(result) {
            let list = [];
            result.data.forEach((item) => {
              //alert("fu"+item.id)
              item.children.forEach((citem) => {
                //alert("zi"+citem.id)
                list.push(citem.id);
              })
            })
            _this.$refs.tree.setCheckedKeys(list);
          }).catch(function(error) {
            alert(error)
          });
        },
        shouquan() {
					  var _this=this
          let fid = this.$refs.tree.getHalfCheckedKeys().sort(function (a, b) {
            return a - b
          })
          let zid = this.$refs.tree.getCheckedKeys().sort(function (a, b) {
            return a - b
          })
          let mid = "";
          let mids = "";
          for (var i = 0; i < fid.length; i++) {
            mids += fid[i] + ","
          }
          for (var i = 0; i < zid.length; i++) {
            mid += zid[i] + ","
          }
         // alert("rid"+this.rid)
         // alert(mid+"mid")
          //alert("mids"+mids)
          //alert(mids+mid)
          let pamer = new URLSearchParams();
          pamer.append("rid", this.rid);
          pamer.append("mids", mids + mid);
          this.$axios.post("menu/addmenujue.action", pamer).then(result => {
            if(result.data>0){
              this.$message({
                message: "授权成功",
                type: 'success'
              });
            }else{
                this.$message({
                  message: "授权失败",
                  type: 'success'
                });
            }
            _this.getData();
          }).catch(erreo => {
            alert(erreo);
          })
        },

					select(selection, row) {
						if(selection.length > 1) {
							let del_row = selection.shift()
							this.$refs.multipleTable.toggleRowSelection(del_row, false)
						}
					},
					selectAll(selection) {
						if(selection.length > 1) {
							selection.length = 1
						}
					},
					/*rolechange(val) {
						var object = this.$refs.multipleTable.selection[0];
						/!*右边菜单显示*!/
						var _this = this;
						var params = new URLSearchParams();
						params.append("rid", object.rid);
						this.$axios.post("menu/queryallmenus3.action", params).then(function(result) {
							_this.data = result.data;
						}).catch(function(error) {
							alert(error)
						});
						console.log(this.data)
						this.multipleSelection = val;
					},*/
					queryrole() {
						this.getData();
					}
				},
				components: { //子组件

				},
				created: function() {
					this.getData();
				}
		}
</script>
