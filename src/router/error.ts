const __DIR__ = '404'

export default {
  path: '/' + __DIR__,
  component: () => import(/* webpackChunkName: "btc" */ '../views/Error.vue')
}
