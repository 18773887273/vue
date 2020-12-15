<template>
	<div id="app" style="margin-top: -15px;">
		<el-form :model="addrole" label-width="100px" >
			<el-form-item label="角色名">
				<el-input v-model="addrole.rname" autocomplete="off" placeholder="请输入角色名称"></el-input>
			</el-form-item>
			<el-form-item label="备注">
				<el-input v-model="addrole.rremart" autocomplete="off" placeholder="请输入角色备注信息"></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	export default {
		name: 'app',
		data() {
			return {
				addrole: {
					rname: '',
					rremart: ''
				}
			}
		},
		methods: {

		}
	}
</script>

<style scoped>

</style>