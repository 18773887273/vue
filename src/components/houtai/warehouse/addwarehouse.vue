<template>
	<div id="app" style="margin-top: -15px;">
		<el-form :model="addwarehouse" label-width="100px">
			<el-form-item label="仓库名称">
				<el-input v-model="addwarehouse.empname" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="最大容量">
				<el-input v-model="addwarehouse.warecount"  autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="负责人">
				<el-select style="width: 495px;" v-model="addwarehouse.empid.empid" filterable placeholder="请选择">
					<el-option v-for="item in addemploys" :key="item.empid" :label="item.empname" :value="item.empid">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="仓库地址">
				<el-input v-model="addwarehouse.wareaddress" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="仓库备注">
				<el-input v-model="addwarehouse.wareremark" autocomplete="off" placeholder="备注"></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	export default {
		name: 'app',
		data() {
			return {
				addwarehouse: {
					wareid: '',
					warename: '',
					wareremark: '',
					warecount: '',
					empid: '',
					wareaddress: ''
				},
				addemploys:{}
			}
		},
		methods: {

		}
	}
</script>

<style scoped>

</style>