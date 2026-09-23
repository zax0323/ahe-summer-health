import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import { createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/pages/HomePage.vue'),
        meta: { title: 'Home' },
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/pages/AboutPage.vue'),
        meta: { title: 'About' },
      },
      {
        path: 'physical-exam',
        name: 'physical-exam',
        component: () => import('@/pages/PhysicalExamPage.vue'),
        meta: { title: 'Physical Exam' },
      },
      {
        path: 'physical-exam/:organ(xin|gan|fei|shen|pi)',
        name: 'physical-exam-detail',
        component: () => import('@/pages/PhysicalExamDetailPage.vue'),
        meta: { title: 'Physical Exam Detail' },
      },
      {
        path: 'morning',
        name: 'morning',
        component: () => import('@/pages/MorningPage.vue'),
        meta: { title: 'Morning' },
      },
      {
        path: 'morning-meal',
        name: 'morning-meal',
        component: () => import('@/pages/MorningMealPage.vue'),
        meta: { title: 'Morning Meal' },
      },
      {
        path: 'morning-meal-feedback',
        name: 'morning-meal-feedback',
        component: () => import('@/pages/MorningMealFeedbackPage.vue'),
        meta: { title: 'Morning Meal Feedback' },
      },
      {
        path: 'forenoon-transition',
        name: 'forenoon-transition',
        component: () => import('@/pages/ForenoonTransitionPage.vue'),
        meta: { title: 'Forenoon Transition' },
      },
      {
        path: 'forenoon-feedback',
        name: 'forenoon-feedback',
        component: () => import('@/pages/ForenoonFeedbackPage.vue'),
        meta: { title: 'Forenoon Feedback' },
      },
      {
        path: 'lunch-meal',
        name: 'lunch-meal',
        component: () => import('@/pages/LunchMealPage.vue'),
        meta: { title: 'Lunch Meal' },
      },
      {
        path: 'lunch-meal-feedback',
        name: 'lunch-meal-feedback',
        component: () => import('@/pages/LunchMealFeedbackPage.vue'),
        meta: { title: 'Lunch Meal Feedback' },
      },
      {
        path: 'afternoon-transition',
        name: 'afternoon-transition',
        component: () => import('@/pages/AfternoonTransitionPage.vue'),
        meta: { title: 'Afternoon Transition' },
      },
      {
        path: 'afternoon-feedback',
        name: 'afternoon-feedback',
        component: () => import('@/pages/AfternoonFeedbackPage.vue'),
        meta: { title: 'Afternoon Feedback' },
      },
      {
        path: 'night-meal',
        name: 'night-meal',
        component: () => import('@/pages/NightMealPage.vue'),
        meta: { title: 'Night Meal' },
      },
      {
        path: 'night-meal-feedback',
        name: 'night-meal-feedback',
        component: () => import('@/pages/NightMealFeedbackPage.vue'),
        meta: { title: 'Night Meal Feedback' },
      },
      {
        path: 'bedtime-choice',
        name: 'bedtime-choice',
        component: () => import('@/pages/BedtimeChoicePage.vue'),
        meta: { title: 'Bedtime Choice' },
      },
      {
        path: 'bedtime-result',
        name: 'bedtime-result',
        component: () => import('@/pages/BedtimeResultPage.vue'),
        meta: { title: 'Bedtime Result' },
      },
      {
        path: 'today-record',
        name: 'today-record',
        component: () => import('@/pages/TodayRecordPage.vue'),
        meta: { title: 'Today Record' },
      },
      {
        path: 'game-ending',
        name: 'game-ending',
        component: () => import('@/pages/GameEndingPage.vue'),
        meta: { title: 'Game Ending' },
      },
      {
        path: 'wuse-zhouji',
        name: 'wuse-zhouji',
        component: () => import('@/pages/WuseZhoujiPage.vue'),
        meta: { title: 'Wuse Zhouji' },
      },
      {
        path: 'bedtime-record',
        name: 'bedtime-record',
        component: () => import('@/pages/TodayRecordPage.vue'),
        meta: { title: 'Today Record' },
      },
      {
        path: 'food-book',
        name: 'food-book',
        component: () => import('@/pages/FoodBookPage.vue'),
        meta: { title: 'Food Book' },
      },
      {
        path: 'wuse-yuanhuan',
        name: 'wuse-yuanhuan',
        component: () => import('@/pages/WuseYuanhuanPage.vue'),
        meta: { title: 'Wuse Yuanhuan' },
      },
      {
        path: 'wuse-yuanhuan/:organ(gan|xin|pi|shen|fei)',
        name: 'wuse-yuanhuan-detail',
        component: () => import('@/pages/WuseYuanhuanDetailPage.vue'),
        meta: { title: 'Wuse Yuanhuan Detail' },
      },
      {
        path: 'food-atlas',
        name: 'food-atlas',
        component: () => import('@/pages/FoodAtlasPage.vue'),
        meta: { title: 'Food Atlas' },
      },
      {
        path: 'food-intro',
        name: 'food-intro',
        component: () => import('@/pages/FoodIntroPage.vue'),
        meta: { title: 'Food Intro' },
      },
      {
        path: 'summer-note',
        name: 'summer-note',
        component: () => import('@/pages/SummerNotePage.vue'),
        meta: { title: 'Summer Note' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: { title: 'Not Found' },
  },
]

const router = createRouter({
  history:
    import.meta.env.PROD || window.location.protocol === 'file:'
      ? createWebHashHistory()
      : createWebHistory(),
  routes,
})

router.afterEach((to) => {
  document.title = `${to.meta.title || 'Page'} - Vue Basic Starter`
})

export default router

