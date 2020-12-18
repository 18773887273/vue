<template>
  <div>
    <div class="card">
      <img src="../../../images/shanghu/pyy.jpg" class="cardimage">
      <p class="cardname">用户名</p>
      <div class="grid-container">
        <div>余额</div>
        <div>999</div>
      </div>
      <ul class="social-icons"><i class="fa fa-instagram"></i></ul>
      <button class="btn draw-border">
        修改
      </button>
    </div>
    <div class="safeindex-authlist clearfix" style="float: left">
      <div class="list-item">
        <div class="list-ico sjh-ico">

        </div>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
        name: "personal",
      data(){

      },
      methods:{

      },
      created() {
        this.$axios.post("/shanghu/Shanghugrwh.action").
        then(function(result) {

        }.bind(this)).
        catch(function(error) {
          alert(error)
        });
      }
    }

</script>

<style scoped>
  .safeindex-authlist .list-ico {
    width: 84px;
    height: 70px;
    margin: 0 auto 25px;
    background-repeat: no-repeat;
    background-image: url(//misc.360buyimg.com/user/myjd/safe/auth/rubik/2.0.29/css/i/auth-index-ico.png);
    overflow: hidden;
  }
  .safeindex-authlist .sjh-ico {
    background-position: 0 0;
  }
  .safeindex-authlist .list-item {
    position: relative;
    float: left;
    width: 200px;
    height: 240px;
    padding: 36px 33px 25px;
    margin: 0 21px 21px 0;
    background: #fff;
  }
  .safeindex-authlist {
    margin: 20px auto 0;
  }
  .social-icons li {
    display: inline-block;
    margin: .15em;
    position: relative;
    font-size: 1em;
  }
  .social-icons {
    padding: 0;
    list-style: none;
    margin: 1em;
  }
  .draw-border {
    box-shadow: inset 0 0 0 4px #58cdd1;
    color: #58afd1;
    -webkit-transition: color .25s .0833333333s;
    transition: color .25s .0833333333s;
    position: relative;
  }
  .btn {
    background: 0;
    border: 0;
    cursor: pointer;
    line-height: 1.5;
    font: 700 1.2rem 'Roboto Slab',sans-serif;
    padding: .75em 2em;
    letter-spacing: .05rem;
    margin: 1em;
    width: 13rem;
  }
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    font-size: 1.2em;
  }
  .cardname {
    margin-top: 15px;
    font-size: 1.5em;
  }
  .cardimage {
    height: 160px;
    width: 160px;
    border-radius: 50%;
    border: 5px solid #272133;
    margin-top: 20px;
    box-shadow: 0 10px 50px rgba(235,25,110,1);
  }
  .card {
    margin-top: 50px;
    margin-left: 50px;
    height: 500px;
    width: 300px;
    background-color: #222831;
    height: 32rem;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: rgba(0,0,0,0.7);
    color: white;
  }
  .el-header, .el-footer {
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
