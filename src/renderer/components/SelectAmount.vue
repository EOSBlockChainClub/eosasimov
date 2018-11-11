<template>
  <div id="wrapper">
    <p class="title">Select Amount</p>
    <div class="btn-container">
      <button class="btn-amnt">5 USD =  {{5*1/eosprice | round(4)}} EOS</button>
      <button class="btn-amnt">10 USD = {{10*1/eosprice | round(4)}} EOS</button>
      <button class="btn-amnt">20 USD = {{20*1/eosprice | round(4)}} EOS</button>
      <button class="btn-amnt">50 USD = {{50*1/eosprice | round(4)}} EOS</button>
      <button class="btn-amnt">100 USD = {{100*1/eosprice | round(4)}} EOS</button>
      <button class="btn-amnt">Other</button>
    </div>
    
  </div>
</template>

<script>
  export default {
    name:'SelectAmount',
    data(){
      return{
        eosprice: 5.398
      }
    },
    filters:{
      round: function(value, accuracy, keep) {
        if (typeof value !== 'number') return value
        var fixed = value.toFixed(accuracy)
        return keep ? fixed : +fixed
      }
    },
    methods:{
      next: function(){
        this.$router.push('/ad')
      }
    },
    mounted(){
      setTimeout(this.next, 3000);
    }
  }
</script>

<style>
.btn-container{
  margin-top: 40px
}
.btn-amnt{
  /* Rectangle */
  
  margin-left: 30px;
  margin-top: 30px;
  width: 308px;
  height: 58px;
  background: #3560D0;
  border-radius: 10px;
  font-family: Rokkitt;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 30px;
  color: #FFFFFF;

}
</style>