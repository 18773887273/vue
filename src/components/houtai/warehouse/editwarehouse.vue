<template>
	<div id="app" style="margin-top: -15px;">
		<el-form :model="editwarehouse" label-width="100px">
			<el-form-item label="编号">
				<el-input v-model="editwarehouse.wareid" readonly="readonly" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="仓库名称">
				<el-input v-model="editwarehouse.warename" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="负责人">
				<el-select style="width: 495px;" v-model="editwarehouse.empid.empid" filterable placeholder="请选择">
					<el-option v-for="item in editemploys" :key="item.empid" :label="item.empname" :value="item.empid">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="最大容量">
				<el-input v-model="editwarehouse.warecount" readonly="readonly" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="仓库地址">
				<el-input v-model="editwarehouse.wareaddress" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="仓库备注">
				<el-input v-model="editwarehouse.wareremark" autocomplete="off" placeholder="备注"></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	export default {
		name: 'app',
		data() {
			return {
				editwarehouse: {
					wareid: '',
					warename: '',
					wareremark: '',
					warecount: '',
					empid: {},
					wareaddress: ''
				},
				editemploys: []
			}
		},
		methods: {

		}
	}
</script>

<style scoped>

</style>