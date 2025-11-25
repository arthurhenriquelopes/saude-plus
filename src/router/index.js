import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: () => import('@/views/Cadastro.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/Profile.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/estoque',
      name: 'estoque',
      component: () => import('@/views/Estoque.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/financeiro',
      name: 'financeiro',
      component: () => import('@/views/Financeiro.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/administracao',
      name: 'administracao',
      component: () => import('@/views/Administracao.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isAuthenticated = !!token

  console.log('🛡️ Navigation Guard:', {
    to: to.path,
    from: from.path,
    isAuthenticated,
    requiresAuth: to.meta.requiresAuth,
    requiresGuest: to.meta.requiresGuest
  })

  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log('❌ Não autenticado, redirecionando para login')
    next('/')
  } else if (to.meta.requiresGuest && isAuthenticated) {
    console.log('✅ Já autenticado, redirecionando para dashboard')
    next('/dashboard')
  } else {
    console.log('✅ Navegação permitida')
    next()
  }
})

export default router
