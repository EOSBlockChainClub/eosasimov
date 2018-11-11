<template>
  <div id="wrapper">
    <p class="title">Address Detected</p>
    <svg width="350" height="350" viewBox="0 0 350 350" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-center">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M95.6777 201.322L78 219L113.355 254.355L131.033 272.033L148.711 254.355L272.454 130.612L254.777 112.934L131.033 236.678L95.6777 201.322Z" fill="#3560D0"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M175 350C271.65 350 350 271.65 350 175C350 78.3502 271.65 0 175 0C78.3502 0 0 78.3502 0 175C0 271.65 78.3502 350 175 350ZM175 335C263.366 335 335 263.366 335 175C335 86.6344 263.366 15 175 15C86.6344 15 15 86.6344 15 175C15 263.366 86.6344 335 175 335Z" fill="#3560D0"/>
    </svg>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  export default {
    name:'AddressDetected',
    methods:{
      next: function(){
        this.$router.push('/sc')
      }
    },
    mounted(){
      ipcRenderer.send('start-nfc')
      ipcRenderer.on('lectura', (event, data) => {
        
        this.next();
      })
    }
  }
</script>

<style>
  .title{
    /* Ready to Scan */
    margin-top: 23px;
    text-align: center;
    font-family: 'Rokkitt', serif;
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: 60px;
    color: #948787;
  }
  .svg-center{
    display: block;
    margin: auto;
    margin-top: 20px;
  }
</style>