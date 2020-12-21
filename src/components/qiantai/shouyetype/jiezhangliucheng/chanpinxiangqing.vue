<template>
  <div>
  <hooper>
    <slide>
      slide 1
    </slide>
    <slide>
      slide 2
    </slide>
    <slide>
      slide 3
    </slide>
    <slide>
      slide 4
    </slide>
    <slide>
      slide 5
    </slide>
    <slide>
      slide 6
    </slide>

    <hooper-pagination slot="hooper-addons"></hooper-pagination>
  </hooper>
  </div>
</template>

<script>
import {
  Hooper,
  Slide,
  Pagination as HooperPagination
} from 'hooper';

export default {
  components: {
    Hooper,
    Slide,
    HooperPagination
  },
  name: "chanpinxiangqing"
}
</script>

<style scoped>

</style>
