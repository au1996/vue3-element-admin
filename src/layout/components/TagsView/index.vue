<template>
  <div id="tags-view-container" class="tags-view-container">
    <ScrollPane ref="scrollPaneRef" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        :class="isActive(tag) ? 'active' : ''"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <Icon
          v-if="!isAffix(tag)"
          name="Close"
          :size="10"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </ScrollPane>
    <ul
      v-show="state.visible"
      :style="{ left: state.left + 'px', top: state.top + 'px' }"
      class="contextmenu"
    >
      <li v-if="!isAffix(state.selectedTag)" @click="closeSelectedTag(state.selectedTag)">Close</li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(state.selectedTag)">Close All</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue'
import path from 'path'
import { useRoute, useRouter } from 'vue-router'
import { useTagsViewStore } from '@/store/tagsView'
import ScrollPane from './ScrollPane.vue'

const router = useRouter()
const tagsViewStore = useTagsViewStore()
const visitedViews = computed(() => tagsViewStore.state.visitedViews)
const scrollPaneRef = ref()
const state = reactive({
  visible: false,
  top: 0,
  left: 0,
  selectedTag: {},
  affixTags: []
})

const route = useRoute()
watch(
  () => route.path,
  (newVal) => {
    addTags()
    moveToCurrentTag(newVal)
  }
)
watch(
  () => state.visible,
  (val) => {
    if (val) {
      document.body.addEventListener('click', closeMenu)
    } else {
      document.body.removeEventListener('click', closeMenu)
    }
  }
)

onMounted(() => {
  initTags()
  addTags()
})

const isActive = (rt) => {
  return rt.path === route.path
}

const isAffix = (tag) => {
  return tag?.meta?.affix
}

const filterAffixTags = (routes, basePath = '/') => {
  let tags = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

const initTags = () => {
  const affixTags = (state.affixTags = filterAffixTags([]))
  for (const tag of affixTags) {
    // Must have tag name
    if (tag.name) {
      tagsViewStore.addVisitedView(tag)
    }
  }
}

const addTags = () => {
  const { name } = route
  if (name) {
    tagsViewStore.addView(route)
  }
}

const moveToCurrentTag = async (newVal) => {
  await nextTick()
  const list = visitedViews.value
  const tagList = document.getElementsByClassName('tags-view-item')
  for (let i = 0, leng = list.length; i < leng; i++) {
    if (list[i].path === newVal.path) {
      scrollPaneRef.value.el.moveToTarget(tagList[i])
      // when query is different then update
      if (list[i].fullPath !== route.fullPath) {
        tagsViewStore.updateVisitedView(route)
      }
      break
    }
  }
}

const closeSelectedTag = async (view) => {
  tagsViewStore.delView(view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews)
    }
  })
}
const closeOthersTags = () => {
  router.push(state.selectedTag)
  tagsViewStore.delOthersViews(state.selectedTag).then(() => {
    moveToCurrentTag(state.selectedTag)
  })
}

const closeAllTags = (view) => {
  tagsViewStore.delAllViews().then(({ visitedViews }) => {
    if (state.affixTags.some((tag) => tag.path === view.path)) {
      return
    }
    toLastView(visitedViews)
  })
}

const toLastView = (visitedViews) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.fullPath)
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    router.push('/')
  }
}

const openMenu = (tag, e) => {
  const menuMinWidth = 105
  const offsetLeft = e.target.parentNode.getBoundingClientRect().left // container margin left
  const offsetWidth = e.target.parentNode.offsetWidth // container width
  const maxLeft = offsetWidth - menuMinWidth // left boundary
  const left = e.clientX - offsetLeft + 15 // 15: margin right

  if (left > maxLeft) {
    state.left = maxLeft
  } else {
    state.left = left
  }
  state.top = e.clientY
  state.selectedTag = tag
  state.visible = true
}

const closeMenu = () => {
  state.visible = false
}

const handleScroll = () => {
  closeMenu()
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  width: 100%;
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-wrapper {
    .tags-view-item {
      position: relative;
      display: inline-block;
      height: 26px;
      padding: 0 8px;
      margin-top: 4px;
      margin-left: 5px;
      font-size: 12px;
      line-height: 26px;
      color: #495060;
      cursor: pointer;
      background: #fff;
      border: 1px solid #d8dce5;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        color: #fff;
        background-color: #42b983;
        border-color: #42b983;

        &::before {
          position: relative;
          display: inline-block;
          width: 8px;
          height: 8px;
          margin-right: 2px;
          background: #fff;
          border-radius: 50%;
          content: '';
        }
      }
    }
  }

  .contextmenu {
    position: absolute;
    z-index: 3000;
    padding: 5px 0;
    margin: 0;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    list-style-type: none;
    background: #fff;
    border-radius: 4px;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      padding: 7px 16px;
      margin: 0;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
.tags-view-wrapper {
  .tags-view-item {
    .el-icon {
      width: 16px;
      height: 16px;
      text-align: center;
      border-radius: 50%;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &::before {
        display: inline-block;
        vertical-align: -3px;
        transform: scale(0.6);
      }

      &:hover {
        color: #fff;
        background-color: #b4bccc;
      }
    }
  }
}
</style>
