<template>
  <div class="space-y-6 p-4">
    <h1 class="text-3xl font-bold">Flag Quiz</h1>

    <div v-if="ended" class="flex h-full w-full items-center justify-center">
      <div class="flex flex-col items-center space-y-4">
        <div>Score: {{ score }}</div>
        <div class="text-3xl">Game Over</div>
        <button
          @click="handleStart"
          class="rounded-md bg-slate-800 p-4 text-white transition-all hover:bg-slate-700"
        >
          Restart
        </button>
      </div>
    </div>

    <div v-else-if="!started" class="flex h-full w-full items-center justify-center">
      <button
        @click="handleStart"
        class="rounded-md bg-slate-800 p-4 text-white transition-all hover:bg-slate-700"
      >
        Start
      </button>
    </div>

    <div v-else class="space-y-8">
      <div class="text-center text-3xl">{{ timer }}s</div>

      <Flag :code="country.code" :data-name="country.name" :data-code="country.code" />
      <div class="flex items-center justify-center px-4">
        <div class="relative flex w-full items-center justify-center md:w-1/3">
          <input
            v-model="input"
            ref="inputRef"
            class="w-full rounded border border-transparent bg-slate-700 p-2 outline-none transition-all"
            :class="{ 'border-red-500': error }"
            @input="handleInput"
          />

          <Transition name="fade">
            <div v-if="input" class="absolute inset-x-0 top-[calc(100%+8px)] rounded bg-slate-600">
              <button
                v-for="(res, index) in responses"
                :key="res"
                class="w-full divide-y px-2 py-1 text-left transition-colors"
                :class="{ 'bg-purple-500': hovered === index }"
                @mouseenter="hovered = index"
                @mouseleave="hovered = -1"
              >
                {{ res.item.name }}
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const started = ref(false)

const configStore = useConfigStore()

const { country } = storeToRefs(configStore)

const input = ref('')
const hovered = ref(-1)
const error = ref(false)
const score = ref(0)

const inputRef = ref<HTMLInputElement>()

const handleStart = () => {
  timer.value = 30
  ended.value = false
  startTimer()
  started.value = true
  configStore.nextCountry()
  nextTick(() => inputRef.value?.focus())
}

const responses = ref<any[]>([])

const handleInput = () => {
  responses.value = fuse.search(input.value).slice(0, 7)
  hovered.value = 0
}

const handleKey = (e: KeyboardEvent) => {
  if (!started.value) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleStart()
    }
    return
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault()

    hovered.value = Math.min(hovered.value + 1, responses.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()

    hovered.value = Math.max(hovered.value - 1, 0)
  } else if (e.key === 'Enter' || e.key === 'Tab') {
    e.preventDefault()

    if (responses.value[hovered.value]) {
      handleEnter()
      input.value = ''
      responses.value = []
      hovered.value = -1
    }
  }
}

const handleEnter = () => {
  const { item } = responses.value[hovered.value]

  if (item.code === country.value.code) {
    score.value += 1
    configStore.nextCountry()
  } else {
    error.value = true
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKey)
})

// 30sec timer
const ended = ref(false)
const timer = ref(30)
const interval = ref<any>(null)

const startTimer = () => {
  interval.value = setInterval(() => {
    timer.value -= 1

    if (timer.value === 0) {
      clearInterval(interval.value)
      ended.value = true
    }
  }, 1000)
}
</script>
