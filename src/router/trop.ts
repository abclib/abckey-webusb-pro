const __DIR__ = 'trop'

const Account = {
  path: 'wallet',
  meta: {
    title: 'Wallet'
  },
  component: () => import('../views/' + __DIR__ + '/wallet/index.vue'),
  redirect: '/wallet/account',
  children: [
    {
      path: 'account',
      meta: {
        title: 'Account'
      },
      component: () => import('../views/' + __DIR__ + '/wallet/Account.vue')
    }
  ]
}

const Send = {
  path: 'send',
  meta: {
    title: 'Send'
  },
  redirect: '/' + __DIR__ + '/send/index',
  component: () => import('../views/' + __DIR__ + '/send/index.vue'),
  children: [
    {
      path: 'index',
      meta: {
        title: 'Send'
      },
      component: () => import('../views/' + __DIR__ + '/send/content.vue')
    }
  ]
}

const Receive = {
  path: 'receive',
  meta: {
    title: 'Receive'
  },
  redirect: '/' + __DIR__ + '/receive/index',
  component: () => import('../views/' + __DIR__ + '/receive/index.vue'),
  children: [
    {
      path: 'index',
      meta: {
        title: 'Send'
      },
      component: () => import('../views/' + __DIR__ + '/receive/content.vue')
    }
  ]

}

export default {
  path: '/' + __DIR__,
  redirect: '/' + __DIR__ + '/wallet',
  component: () => import(/* webpackChunkName: "trop" */ '../views/trop/index.vue'),
  children: [Account, Receive, Send]
}
