const __DIR__ = 'setting'

const Root = {
  path: '/setting',
  meta: {
    title: 'setting'
  },
  component: () => import('../views/' + __DIR__ + '/index.vue'),
  children: [
    {
      path: 'index',
      meta: {
        title: 'setting'
      },
      component: () => import('../views/' + __DIR__ + '/content.vue')
    }
  ]

}

export default {
  path: '/' + __DIR__,
  component: () => import(/* webpackChunkName: "setting" */ '../views/setting/index.vue'),
  children: [Root]
}
