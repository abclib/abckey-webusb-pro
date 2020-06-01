import VueRouter, { Route } from 'vue-router'
import { AxiosInstance } from 'axios'
import { Store } from 'vuex'
import { IMessage } from 'vue-m-message'

declare module 'vue/types/vue' {
  interface Vue {
    (vuetify: any, ...obj: any): void
    $router: VueRouter
    $route: Route
    $axios: AxiosInstance
    $usb: any
    $store: Store<any>
    $message: IMessage
  }
}
