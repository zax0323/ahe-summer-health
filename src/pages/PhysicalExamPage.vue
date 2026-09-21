<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import character from '@/assets/physical-exam-character.png'
import back from '@/assets/physical-exam-back.png'
import magnifier from '@/assets/physical-exam-magnifier-cropped.png'
import organ1 from '@/assets/physical-exam-organ-1.png'
import organ2 from '@/assets/physical-exam-organ-2.png'
import organ3 from '@/assets/physical-exam-organ-3.png'
import organ4 from '@/assets/physical-exam-organ-4.png'
import organ5 from '@/assets/physical-exam-organ-5.png'
import organs from '@/assets/physical-exam-organs.png'
import title from '@/assets/physical-exam-title.png'
import tipBubble from '@/assets/physical-exam-tip-bubble.png'
import warning from '@/assets/physical-exam-warning.png'

const route = useRoute()
const router = useRouter()
const sceneSize = { width: 1440, height: 3072 }
const magnifierSize = { width: 198, height: 171 }
const magnifierStart = { x: 1194, y: 2662 }
const layers = [title, character, tipBubble, warning, back]
const flashLayers = [
  {
    image: organ1,
    organ: 'xin',
    label: '心',
    hotspot: { x: 716, y: 1630, width: 108, height: 108 },
  },
  {
    image: organ2,
    organ: 'gan',
    label: '肝',
    hotspot: { x: 530, y: 1802, width: 108, height: 108 },
  },
  {
    image: organ3,
    organ: 'fei',
    label: '肺',
    hotspot: { x: 756, y: 1888, width: 108, height: 108 },
  },
  {
    image: organ4,
    organ: 'shen',
    label: '肾',
    hotspot: { x: 852, y: 1826, width: 108, height: 108 },
  },
  {
    image: organ5,
    organ: 'pi',
    label: '脾',
    hotspot: { x: 888, y: 2025, width: 108, height: 108 },
  },
]
const showOrgans = ref(route.query.organs === '1')
const magnifierPosition = ref({ ...magnifierStart })
const dragState = ref(null)

function openOrganDetail(organ) {
  router.push({ name: 'physical-exam-detail', params: { organ } })
}

function getSceneMetrics() {
  const width = Math.min(window.innerWidth, window.innerHeight * (sceneSize.width / sceneSize.height))
  const height = Math.min(window.innerHeight, window.innerWidth * (sceneSize.height / sceneSize.width))

  return {
    left: (window.innerWidth - width) / 2,
    top: (window.innerHeight - height) / 2,
    width,
    height,
  }
}

function getScenePoint(event) {
  const scene = getSceneMetrics()

  return {
    x: ((event.clientX - scene.left) / scene.width) * sceneSize.width,
    y: ((event.clientY - scene.top) / scene.height) * sceneSize.height,
  }
}

function clampMagnifierPosition(position) {
  return {
    x: Math.min(Math.max(position.x, 0), sceneSize.width - magnifierSize.width),
    y: Math.min(Math.max(position.y, 0), sceneSize.height - magnifierSize.height),
  }
}

function findOrganUnderMagnifier() {
  const center = {
    x: magnifierPosition.value.x + magnifierSize.width / 2,
    y: magnifierPosition.value.y + magnifierSize.height / 2,
  }

  return flashLayers.find(({ hotspot }) => (
    center.x >= hotspot.x &&
    center.x <= hotspot.x + hotspot.width &&
    center.y >= hotspot.y &&
    center.y <= hotspot.y + hotspot.height
  ))
}

function beginMagnifierDrag(event) {
  event.preventDefault()
  event.currentTarget.setPointerCapture?.(event.pointerId)

  const point = getScenePoint(event)
  dragState.value = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    offsetX: point.x - magnifierPosition.value.x,
    offsetY: point.y - magnifierPosition.value.y,
    moved: false,
  }
}

function moveMagnifier(event) {
  if (!dragState.value || dragState.value.pointerId !== event.pointerId) {
    return
  }

  const movement = Math.hypot(event.clientX - dragState.value.startX, event.clientY - dragState.value.startY)
  if (movement > 4) {
    dragState.value.moved = true
  }

  const point = getScenePoint(event)
  magnifierPosition.value = clampMagnifierPosition({
    x: point.x - dragState.value.offsetX,
    y: point.y - dragState.value.offsetY,
  })
}

function endMagnifierDrag(event) {
  if (!dragState.value || dragState.value.pointerId !== event.pointerId) {
    return
  }

  event.currentTarget.releasePointerCapture?.(event.pointerId)
  const wasMoved = dragState.value.moved
  dragState.value = null

  if (!wasMoved) {
    showOrgans.value = !showOrgans.value
    return
  }

  if (!showOrgans.value) {
    showOrgans.value = true
    return
  }

  const target = findOrganUnderMagnifier()
  if (target) {
    openOrganDetail(target.organ)
  }
}
</script>

<template>
  <section class="scene-page physical-exam-page" aria-label="体检页面">
    <img class="scene-image physical-exam-image" src="@/assets/physical-exam-bg.png" alt="体检页面背景" />
    <template v-for="layer in layers" :key="layer">
      <img
        v-if="layer !== tipBubble || !showOrgans"
        class="scene-overlay physical-exam-layer"
        :src="layer"
        alt=""
        aria-hidden="true"
      />
    </template>
    <img
      v-if="showOrgans"
      class="scene-overlay physical-exam-organs-layer"
      :src="organs"
      alt="五脏图"
    />
    <template v-if="showOrgans">
      <img
        v-for="flash in flashLayers"
        :key="flash.image"
        class="scene-overlay physical-exam-flash-layer"
        :src="flash.image"
        alt=""
        aria-hidden="true"
      />
      <button
        v-for="flash in flashLayers"
        :key="flash.organ"
        class="physical-exam-hotspot"
        type="button"
        :aria-label="flash.label"
        :style="{
          '--hotspot-x': `${flash.hotspot.x}`,
          '--hotspot-y': `${flash.hotspot.y}`,
          '--hotspot-width': `${flash.hotspot.width}`,
          '--hotspot-height': `${flash.hotspot.height}`,
        }"
        @click="openOrganDetail(flash.organ)"
      ></button>
    </template>
    <button
      class="physical-exam-magnifier-action"
      type="button"
      aria-label="查看器官"
      :aria-pressed="showOrgans"
      :style="{
        '--magnifier-x': `${magnifierPosition.x}`,
        '--magnifier-y': `${magnifierPosition.y}`,
        '--magnifier-width': `${magnifierSize.width}`,
        '--magnifier-height': `${magnifierSize.height}`,
      }"
      @pointerdown="beginMagnifierDrag"
      @pointermove="moveMagnifier"
      @pointerup="endMagnifierDrag"
      @pointercancel="endMagnifierDrag"
    >
      <img class="physical-exam-magnifier-image" :src="magnifier" alt="" aria-hidden="true" />
    </button>
    <RouterLink class="physical-exam-back-action" to="/" aria-label="返回首页" />
  </section>
</template>
