<template>
  <div id="app">
    <v-app>
      <connect v-if="!c_usb.connect && !c_usb.bootloaderMode" />
      <welcome v-else-if="c_usb.bootloaderMode && !c_usb.firmwarePresent" />
      <bootloader v-else-if="c_usb.bootloaderMode" />
      <first-guide v-else-if="!c_usb.initialized" />
      <load-data v-else-if="!c_usb.xpub" />
      <v-content v-else class="app-content" style="min-height: 100vh;">
        <top-bar />
        <v-container fluid class="pa-0">
          <side-navbar />
          <backup-alert />
          <loading v-show="c_pageLoading" />
          <router-view />
        </v-container>
      </v-content>
      <dialog-choose-type />
      <dialog-language />
      <dialog-button-ack />
      <dialog-pin-ack />
      <dialog-pass-ack />
      <dialog-word-ack />
      <dialog-failure />
      <dialog-set-label />
    </v-app>
  </div>
</template>

<script>
import SideNavbar from '@/views/components/SideNavBar'
import Connect from './views/Connect'
import TopBar from '@/views/components/TopBar'
import Loading from '@/views/components/Loading'
import LoadData from '@/views/LoadData'
import FirstGuide from '@/views/FirstGuide'
import coinbook from '@/utils/coinbook'
import UsbMixin from '@/mixins/usb'
import BackupAlert from '@/views/components/BackupAlert'
import Bootloader from '@/views/Bootloader'
import Welcome from '@/views/Welcome'
export default {
  name: 'App',
  mixins: [UsbMixin],
  components: {
    SideNavbar,
    Connect,
    TopBar,
    LoadData,
    Loading,
    FirstGuide,
    BackupAlert,
    Bootloader,
    Welcome
  },
  computed: {
    c_usb: (vm) => vm.$store.__s('usb'),
    c_pageLoading: (vm) => vm.$store.__s('pageLoading'),
    c_isConnect: (vm) => vm.$store.__s('usb.connect'),
    c_msg: (vm) => vm.$store.__s('usb.msg'),
    c_brand: (vm) => vm.$store.__s('brand'),
    c_coinInfo: (vm) => vm.$store.__s('coinInfo'),
    c_needsBackup: (vm) => vm.$store.__s('usb.needsBackup'),
    c_httpMessage: (vm) => vm.$store.__s('httpMessage')
  },
  async created() {
    const coinType = this.$store.__s('coinType').toLowerCase()
    this.$store.__s('coinInfo', coinbook[coinType])
  },
  watch: {
    $route() {
      window.document.title = this.$route.meta.title ? this.$route.meta.title : this.c_brand.name
    },
    async c_isConnect(value) {
      if (value === true) {
        this.$message.success(this.$t('Device connected'))
      } else {
        this.$message.success(this.$t('Device disconnected'))
        window.location.replace(this.$store.__s('brand.buildPath'))
      }
    },
    c_msg(msg) {
      if (msg.data.message === 'Device successfully initialized' || msg.data.message === 'Device recovered') {
        if (this.c_brand.name === 'ABCKEY') {
          this.$router.push({ path: `/${this.c_coinInfo.symbol}/wallet/account/` })
        } else {
          this.$router.push({ path: `/${this.c_brand.buildPath}/${this.c_coinInfo.symbol}/wallet/account/` })
        }
        this.$store.__s('usb.initialized', false)
      }
    },
    c_httpMessage(val) {
      if (!val) return
      this.$message.error(this.$t(val))
      this.$store.__s('httpMessage', '')
    }
  },
  i18n: {
    messages: {
      zhCN: {
        'Device connected': '设备连接成功',
        'Device disconnected': '设备断开连接',
        'Your device is not backed up. To ensure the safety of your funds, please backup immediately!': '您的设备未备份。 为了确保您的资金安全，请立即备份！',
        'Backup Now': ' 立即备份 '
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.app-content {
  background: #f5f5f5;
}
</style>
