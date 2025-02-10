<template>
  <el-scrollbar ref="scrollbarRef" :vertical="false" class="scroll-container" @wheel="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { useEventListener } from '@vueuse/core'

const emit = defineEmits(['scroll'])
const tagAndTagSpacing = ref(4)
const scrollbarRef = ref(null)

useEventListener(scrollbarRef, 'scroll', () => {
  emit('scroll')
})

const handleScroll = (el) => {
  const eventDelta = el.wheelDelta || -el.deltaY * 40
  const $container = scrollbarRef.value.$el.children[0]
  $container.scrollLeft = $container.scrollLeft + eventDelta / 4
  console.log({ eventDelta, $container })
}

const moveToTarget = (currentTag) => {
  const tagList = document.getElementsByClassName('tags-view-item')
  const $container = scrollbarRef.value.$el.children[0]
  const $containerWidth = $container.offsetWidth
  let firstTag = null
  let lastTag = null

  // find first tag and last tag
  if (tagList.length > 0) {
    firstTag = tagList[0]
    lastTag = tagList[tagList.length - 1]
  }

  if (firstTag === currentTag) {
    $container.scrollLeft = 0
  } else if (lastTag === currentTag) {
    $container.scrollLeft = $container.scrollWidth - $containerWidth
  } else {
    // find preTag and nextTag
    const currentIndex = [...tagList].findIndex((item) => item === currentTag)
    const prevTag = tagList[currentIndex - 1]
    const nextTag = tagList[currentIndex + 1]

    // the tag's offsetLeft after of nextTag
    const afterNextTagOffsetLeft = nextTag.offsetLeft + nextTag.offsetWidth + tagAndTagSpacing.value

    // the tag's offsetLeft before of prevTag
    const beforePrevTagOffsetLeft = prevTag.offsetLeft - tagAndTagSpacing.value

    if (afterNextTagOffsetLeft > $container.scrollLeft + $containerWidth) {
      $container.scrollLeft = afterNextTagOffsetLeft - $containerWidth
    } else if (beforePrevTagOffsetLeft < $container.scrollLeft) {
      $container.scrollLeft = beforePrevTagOffsetLeft
    }
  }
}

defineExpose({ moveToTarget })
</script>

<style lang="scss" scoped>
.scroll-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;

  :deep(.el-scrollbar__bar) {
    bottom: 0;
  }

  :deep(.el-scrollbar__wrap) {
    height: 49px;
  }
}
</style>
