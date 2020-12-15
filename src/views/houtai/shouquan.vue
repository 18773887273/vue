<template>
	<div id="app">
		<el-form label-width="100px">
			<el-form-item label="角色名:">
				<el-input v-model="queryrname" placeholder="请输入要查询的角色"></el-input>
			</el-form-item>
			<el-button type="info" plain @click="queryrole">查询</el-button>
			<el-button type="primary" plain>授权</el-button>
		</el-form>
		<el-table max-height="600" :data="roletableData" ref="multipleTable" style="width: 20%" @selection-change="rolechange" border :row-class-name="tableRowClassName" @select="select" @select-all="selectAll">
			<el-table-column type="selection"></el-table-column>
			<el-table-column prop="rname" label="角色名">
			</el-table-column>
		</el-table>
		<el-tree :data="data" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]">
		</el-tree>
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
				data: [],
				defaultProps: {
					children: 'children',
					label: 'label'
				}
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
					rolechange(val) {
						var object = this.$refs.multipleTable.selection[0];
						/*右边菜单显示*/
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
					},
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