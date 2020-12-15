<template>
	<div id="app">
		<el-form label-width="100px">
			<el-form-item label="角色名:">
				<el-input v-model="queryrname"></el-input>
			</el-form-item>
			<el-button type="info" plain @click="queryrole()">查询</el-button>
			<el-button type="primary" plain @click="addrole()">添加</el-button>
		</el-form>
		<el-table :data="roletableData" style="width: 100%"  :row-class-name="tableRowClassName">
			<el-table-column prop="rid" label="编号">
			</el-table-column>
			<el-table-column prop="rname" label="角色名">
			</el-table-column>
			<el-table-column prop="rremart" label="角色备注">
			</el-table-column>
			<el-table-column prop="count" label="人数">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="success" @click="editrole(scope.row)" plain circle>编辑</el-button>
					<el-popconfirm title="确定删除这条记录吗？" @confirm="delrole(scope.row)">
						<el-button type="danger" slot="reference" plain circle>删除</el-button>
					</el-popconfirm>
					<el-button type="info" plain circle @click="roleemploy(scope.row)">员工</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination @current-change="pagechange" layout="prev, pager, next" :total="total" :page-size="5">
		</el-pagination>

		<el-dialog :visible.sync="editroledialogFormVisible" :before-close="editrolehandleClose">
			<div slot="title" class="dialog-title">
				<i class="el-icon-edit-outline"></i>
				<span class="title-text">角色编辑</span>
				<div class="button-right">
					<span class="title-close"></span>
				</div>
			</div>
			<editrole ref="editrolechild"></editrole>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editroledialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="rolesave()">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="角色添加" :visible.sync="addroledialogFormVisible" :before-close="addrolehandleClose">
			<div slot="title" class="dialog-title">
				<i class="el-icon-circle-plus-outline"></i>
				<span class="title-text">角色添加</span>
				<div class="button-right">
					<span class="title-close"></span>
				</div>
			</div>
			<addrole ref="addrolechild"></addrole>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addrolequxiao()">取 消</el-button>
				<el-button type="primary" @click="roleadd()">添加</el-button>
			</div>
		</el-dialog>
		<el-dialog title="角色员工" :visible.sync="roledialogTableVisible">
			<div slot="title" class="dialog-title">
				<i class="el-icon-chat-line-square"></i>
				<span class="title-text">{{rolexiangqing}}</span>
				<div class="button-right">
					<span class="title-close"></span>
				</div>
			</div>
			<el-table :data="employroleDate" max-height="300">
				<el-table-column property="empname" label="姓名" width="150"></el-table-column>
				<el-table-column property="empnumber" label="手机号" width="200"></el-table-column>
				<el-table-column property="username" label="用户名"></el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>
<style>
	.el-table .warning-row {
		background: oldlace;
	}

	.el-table .success-row {
		background: #f0f9eb;
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}

	h1,
	h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}
</style>

<script>
  import Editrole from "../../components/houtai/role/editrole.vue"
  import Addrole from "../../components/houtai/role/addrole.vue"
	export default {
		name: 'app',
		data() {
			return {
				num: 1,
				editroledialogFormVisible: false,
				addroledialogFormVisible: false,
				roledialogTableVisible: false,
				roletableData: [],
				employroleDate: [],
				total: 1,
				page: 1,
				selectDate: {},
				queryrname: "",
				rolexiangqing:""

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
				params.append("rows", 5);
				this.$axios.post("role/querylike.action", params).then(function(result) {
					_this.roletableData = result.data.rows;
					_this.total = result.data.total;
				}).catch(function(error) {
					alert(error)
				});
			},
			roleemploy(row) {
				this.employroleDate = row.employList;
				this.rolexiangqing=row.rname+"----员工列表";
				this.roledialogTableVisible = true;
			},
			addrolehandleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						this.$refs.addrolechild.addrole = {};
						done();
					})
					.catch(_ => {});
			},
			editrolehandleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			queryrole() {
				this.getData();
			},
			//选中行进行修改
			editrole(row) {
				setTimeout(() => {
					this.selectDate = { ...row
					}
					this.$refs.editrolechild.editrole = this.selectDate;
				})
				//index 索引  row对象 修改该条记录对象
				this.editroledialogFormVisible = true;
			},
			addrole() {
				//index 索引  row对象 修改该条记录对象
				this.addroledialogFormVisible = true;
			},
			addrolequxiao() {
				this.addroledialogFormVisible = false;
				this.$refs.addrolechild.addrole = {};
			},
			roleadd() {
				var addrole = this.$refs.addrolechild.addrole;
				var _this = this;
				var roles = new URLSearchParams();
				roles.append("rname", addrole.rname);
				roles.append("rremart", addrole.rremart);
				this.$axios.post("role/editrole.action", roles).then(function(result) {
						_this.$message({
							message: result.data.msg,
							type: 'success'
						});
						_this.getData();
					})
					.catch(function(error) {
						_this.$message({
							message: '添加失败',
							type: 'error'
						});
					});
				this.$refs.addrolechild.addrole = {};
				this.addroledialogFormVisible = false;
			},
			//修改保存操作
			rolesave() {
				var editrole = this.$refs.editrolechild.editrole;
				var _this = this;
				var roles = new URLSearchParams();
				roles.append("rid", editrole.rid);
				roles.append("rname", editrole.rname);
				roles.append("rremart", editrole.rremart);
				this.$axios.post("role/editrole.action", roles).then(function(result) {
						_this.$message({
							message: result.data.msg,
							type: 'success'
						});
						_this.getData();
					})
					.catch(function(error) {
						_this.$message({
							message: '修改失败',
							type: 'success'
						});
					});
				this.editroledialogFormVisible = false;
			},
			//删除选中行
			delrole(row) {
				var _this = this;
				//异步获取数据
				var params = new URLSearchParams();
				if(row.count != 0) {
					_this.$message({
						message: '该角色还存在员工,不能删除该角色',
						type: 'error'
					});
					return;
				}
				params.append("rid", row.rid);
				this.$axios.post("role/delrole.action", params).then(function(result) {
						_this.$message({
							message: result.data.msg,
							type: 'success'
						});
						_this.getData();
					})
					.catch(function(error) {
						_this.$message({
							message: '删除失败',
							type: 'error'
						});
					});
			},
			pagechange(pageindex) { //页码变更时
				//console.log(pageindex)
				this.page = pageindex;
				//根据pageindex  获取数据
				this.getData();
			}
		},
		components: { //子组件
			editrole: Editrole,
			addrole: Addrole
		},
		created: function() {
			this.getData();
		}
	}
</script>
