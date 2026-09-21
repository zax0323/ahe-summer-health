import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import { createWebHashHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import PhysicalExamPage from '@/pages/PhysicalExamPage.vue'
import PhysicalExamDetailPage from '@/pages/PhysicalExamDetailPage.vue'
import MorningPage from '@/pages/MorningPage.vue'
import MorningMealPage from '@/pages/MorningMealPage.vue'
import MorningMealFeedbackPage from '@/pages/MorningMealFeedbackPage.vue'
import ForenoonTransitionPage from '@/pages/ForenoonTransitionPage.vue'
import ForenoonFeedbackPage from '@/pages/ForenoonFeedbackPage.vue'
import LunchMealPage from '@/pages/LunchMealPage.vue'
import LunchMealFeedbackPage from '@/pages/LunchMealFeedbackPage.vue'
import AfternoonTransitionPage from '@/pages/AfternoonTransitionPage.vue'
import AfternoonFeedbackPage from '@/pages/AfternoonFeedbackPage.vue'
import NightMealPage from '@/pages/NightMealPage.vue'
import NightMealFeedbackPage from '@/pages/NightMealFeedbackPage.vue'
import BedtimeChoicePage from '@/pages/BedtimeChoicePage.vue'
import BedtimeResultPage from '@/pages/BedtimeResultPage.vue'
import TodayRecordPage from '@/pages/TodayRecordPage.vue'
import GameEndingPage from '@/pages/GameEndingPage.vue'
import WuseZhoujiPage from '@/pages/WuseZhoujiPage.vue'
import FoodBookPage from '@/pages/FoodBookPage.vue'
import FoodAtlasPage from '@/pages/FoodAtlasPage.vue'
import FoodIntroPage from '@/pages/FoodIntroPage.vue'
import SummerNotePage from '@/pages/SummerNotePage.vue'
import WuseYuanhuanPage from '@/pages/WuseYuanhuanPage.vue'
import WuseYuanhuanDetailPage from '@/pages/WuseYuanhuanDetailPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomePage,
        meta: { title: 'Home' },
      },
      {
        path: 'about',
        name: 'about',
        component: AboutPage,
        meta: { title: 'About' },
      },
      {
        path: 'physical-exam',
        name: 'physical-exam',
        component: PhysicalExamPage,
        meta: { title: 'Physical Exam' },
      },
      {
        path: 'physical-exam/:organ(xin|gan|fei|shen|pi)',
        name: 'physical-exam-detail',
        component: PhysicalExamDetailPage,
        meta: { title: 'Physical Exam Detail' },
      },
      {
        path: 'morning',
        name: 'morning',
        component: MorningPage,
        meta: { title: 'Morning' },
      },
      {
        path: 'morning-meal',
        name: 'morning-meal',
        component: MorningMealPage,
        meta: { title: 'Morning Meal' },
      },
      {
        path: 'morning-meal-feedback',
        name: 'morning-meal-feedback',
        component: MorningMealFeedbackPage,
        meta: { title: 'Morning Meal Feedback' },
      },
      {
        path: 'forenoon-transition',
        name: 'forenoon-transition',
        component: ForenoonTransitionPage,
        meta: { title: 'Forenoon Transition' },
      },
      {
        path: 'forenoon-feedback',
        name: 'forenoon-feedback',
        component: ForenoonFeedbackPage,
        meta: { title: 'Forenoon Feedback' },
      },
      {
        path: 'lunch-meal',
        name: 'lunch-meal',
        component: LunchMealPage,
        meta: { title: 'Lunch Meal' },
      },
      {
        path: 'lunch-meal-feedback',
        name: 'lunch-meal-feedback',
        component: LunchMealFeedbackPage,
        meta: { title: 'Lunch Meal Feedback' },
      },
      {
        path: 'afternoon-transition',
        name: 'afternoon-transition',
        component: AfternoonTransitionPage,
        meta: { title: 'Afternoon Transition' },
      },
      {
        path: 'afternoon-feedback',
        name: 'afternoon-feedback',
        component: AfternoonFeedbackPage,
        meta: { title: 'Afternoon Feedback' },
      },
      {
        path: 'night-meal',
        name: 'night-meal',
        component: NightMealPage,
        meta: { title: 'Night Meal' },
      },
      {
        path: 'night-meal-feedback',
        name: 'night-meal-feedback',
        component: NightMealFeedbackPage,
        meta: { title: 'Night Meal Feedback' },
      },
      {
        path: 'bedtime-choice',
        name: 'bedtime-choice',
        component: BedtimeChoicePage,
        meta: { title: 'Bedtime Choice' },
      },
      {
        path: 'bedtime-result',
        name: 'bedtime-result',
        component: BedtimeResultPage,
        meta: { title: 'Bedtime Result' },
      },
      {
        path: 'today-record',
        name: 'today-record',
        component: TodayRecordPage,
        meta: { title: 'Today Record' },
      },
      {
        path: 'game-ending',
        name: 'game-ending',
        component: GameEndingPage,
        meta: { title: 'Game Ending' },
      },
      {
        path: 'wuse-zhouji',
        name: 'wuse-zhouji',
        component: WuseZhoujiPage,
        meta: { title: 'Wuse Zhouji' },
      },
      {
        path: 'bedtime-record',
        name: 'bedtime-record',
        component: TodayRecordPage,
        meta: { title: 'Today Record' },
      },
      {
        path: 'food-book',
        name: 'food-book',
        component: FoodBookPage,
        meta: { title: 'Food Book' },
      },
      {
        path: 'wuse-yuanhuan',
        name: 'wuse-yuanhuan',
        component: WuseYuanhuanPage,
        meta: { title: 'Wuse Yuanhuan' },
      },
      {
        path: 'wuse-yuanhuan/:organ(gan|xin|pi|shen|fei)',
        name: 'wuse-yuanhuan-detail',
        component: WuseYuanhuanDetailPage,
        meta: { title: 'Wuse Yuanhuan Detail' },
      },
      {
        path: 'food-atlas',
        name: 'food-atlas',
        component: FoodAtlasPage,
        meta: { title: 'Food Atlas' },
      },
      {
        path: 'food-intro',
        name: 'food-intro',
        component: FoodIntroPage,
        meta: { title: 'Food Intro' },
      },
      {
        path: 'summer-note',
        name: 'summer-note',
        component: SummerNotePage,
        meta: { title: 'Summer Note' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundPage,
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




