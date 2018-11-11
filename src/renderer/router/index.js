import Vue from 'vue'
import Router from 'vue-router'
import ReadyToScan from '@/components/ReadyToScan'
import Success from '@/components/Success'
import AddressDetected from '@/components/AddressDetected'
import SelectAmount from '@/components/SelectAmount'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ready-to-scan',
      component: ReadyToScan
    },
    {
      path: '/ad',
      name: 'address-detected',
      component: AddressDetected
    },
    {
      path: '/sc',
      name: 'success',
      component: Success
    },
    {
      path: '/sa',
      name: 'select-amount',
      component: SelectAmount
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
