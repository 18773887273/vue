<template>
	<div id="banner">
		<div style="margin-left: 300px;margin-right: 300px;">
			<hooper :itemsToShow="3" :infiniteScroll="true">
				<slide>
					<img :src="image1" width="297px" height="155px" />
				</slide>
				<slide>
					<img :src="image2" width="297px" height="155px" />
				</slide>
				<slide>
					<img :src="image3" width="297px" height="155px" />
				</slide>
				<slide>
					<img :src="image4" width="297px" height="155px" />
				</slide>
				<slide>
					<img :src="image5" width="297px" height="155px" />
				</slide>
				<slide>
					<img :src="image6" width="297px" height="155px" />
				</slide>
				<hooper-navigation slot="hooper-addons"></hooper-navigation>

				<hooper-pagination slot="hooper-addons"></hooper-pagination>
			</hooper>
		</div>
	</div>
</template>
<script>
	import 'hooper/dist/hooper.css';
	import {
		Hooper,
		Slide,
		Progress as HooperProgress,
		Pagination as HooperPagination,
		Navigation as HooperNavigation
	} from 'hooper';

	export default {
		name: "banner",
		data() {
			return {
				/*image1: require("./image/image1.jpg"),
				image2: require("./image/image2.jpg"),
				image3: require("./image/image3.jpg"),
				image4: require("./image/image1.jpg"),
				image5: require("./image/image2.jpg"),
				image6: require("./image/image3.jpg"),*/
			};
		},
		components: {
			Hooper,
			Slide,
			HooperProgress,
			HooperPagination,
			HooperNavigation
		},
	};
</script>

<style>

</style>
