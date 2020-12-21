<template>
	<div id="app" style="margin-top: -15px;">
		<el-form :model="addwarehouse" label-width="100px">
			<el-form-item label="仓库名称:">
				<el-input v-model="addwarehouse.warename" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="最大容量:">
        <el-input-number v-model="addwarehouse.warecount" style="width: 620px;" controls-position="right"  :min="1" :max="10000000"></el-input-number>
			</el-form-item>
			<el-form-item label="负责人:">
				<el-select style="width: 620px;" v-model="addwarehouse.empid" filterable placeholder="请选择">
					<el-option v-for="item in addemploys" :key="item.empid" :label="item.empname" :value="item.empid">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="仓库地址:">
				<el-input v-model="addwarehouse.wareaddress" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="仓库备注:">
				<el-input v-model="addwarehouse.wareremark" type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}" autocomplete="off" placeholder="备注"></el-input>
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
