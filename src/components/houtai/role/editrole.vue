<template>
	<div id="app" style="margin-top: -15px;">
		<el-form :model="editrole" label-width="100px">
			<el-form-item label="编号">
				<el-input v-model="editrole.rid" readonly="readonly" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="角色名">
				<el-input v-model="editrole.rname" autocomplete="off"></el-input>
			</el-form-item>

			<el-form-item label="备注">
				<el-input v-model="editrole.rremart" autocomplete="off" placeholder="备注"></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>
		<script>
			export default {
				name: 'app',
				data() {
					return {
						editrole: {
							rid: '',
							rname: '',
							rremart: ''
						}
					}
				},
				methods: {

				}
			}
		</script>