<template>
  <v-container class="account-wrap">
    <test-account :coin="c_coinInfo.name" :cash="c_cashUnit" :xpub="c_xpub" />
  </v-container>
</template>

<script>
import TestAccount from '@/views/components/TestAccount'
export default {
  name: 'Account',
  components: {
    TestAccount
  },
  computed: {
    c_cashUnit: (vm) => vm.$store.__s('cashUnit'),
    c_xpub: (vm) => vm.$store.__s('usb.xpub'),
    c_cashUnitItems: (vm) => vm.$store.__s('cashUnitItems'),
    c_cashUnitIndex: (vm) => vm.$store.__s('cashUnitIndex'),
    c_coinInfo: (vm) => vm.$store.__s('coinInfo')
  }
}
</script>

<style lang="scss" scoped>
.account-wrap {
  margin: 20px auto;
  max-width: 960px;
}
</style>
