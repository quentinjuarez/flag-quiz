<template>
  <div class="space-y-6 p-4">
    <h1 class="text-3xl font-bold">Flag Quiz</h1>
    <Flag :code="flagCode" />
    <div class="mx-auto max-w-screen-sm">
      <h2 class="mb-2 text-center text-xl font-semibold">Select the correct country:</h2>
      <div class="grid grid-cols-2 gap-4">
        <button
          v-for="option in options"
          :key="option"
          @click="checkAnswer(option)"
          :class="{
            '!bg-green-500': selectedAnswer && correctAnswer === option,
            '!bg-red-500':
              selectedAnswer && selectedAnswer !== correctAnswer && selectedAnswer === option
          }"
          :disabled="answerDisabled"
          class="rounded-md bg-slate-800 p-4 text-white transition-all hover:bg-slate-700"
        >
          {{ option }}
        </button>
      </div>
      <div class="mt-4 text-center">
        <p class="text-lg font-semibold">Streak: {{ streak }}</p>
        <p v-if="bestStreak" class="text-gray-500">Best Streak: {{ bestStreak }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const flagCode = ref<string>('')
const codes = ref<Record<string, string>>({})
const options = reactive<string[]>([])
const selectedAnswer = ref<string | null>(null)
const correctAnswer = ref<string | null>(null)
const answerDisabled = ref<boolean>(false)
const streak = ref<number>(0)
let bestStreak = parseInt(localStorage.getItem('bestStreak') || '0')

onMounted(async () => {
  try {
    const response = await fetch('https://flagcdn.com/en/codes.json')
    const data = await response.json()
    codes.value = data
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  initializeQuiz()
})

watchEffect(() => {
  if (selectedAnswer.value) {
    answerDisabled.value = true
    setTimeout(() => {
      initializeQuiz()
    }, 1000)
  }
})

const initializeQuiz = () => {
  selectedAnswer.value = null
  correctAnswer.value = null
  answerDisabled.value = false
  randomFlag()
  generateOptions()
}

const randomFlag = () => {
  const keys = Object.keys(codes.value)
  const randomIndex = Math.floor(Math.random() * keys.length)
  flagCode.value = keys[randomIndex]
}

const generateOptions = () => {
  const keys = Object.keys(codes.value)
  options.length = 0 // Clear the array
  const correctCountry = codes.value[flagCode.value]
  correctAnswer.value = correctCountry
  options.push(correctCountry)

  while (options.length < 4) {
    const randomCountry = codes.value[keys[Math.floor(Math.random() * keys.length)]]
    if (!options.includes(randomCountry)) {
      options.push(randomCountry)
    }
  }

  options.sort(() => Math.random() - 0.5)
}

const checkAnswer = (selectedOption: string) => {
  if (selectedOption === codes.value[flagCode.value]) {
    // Correct answer
    console.log('Correct!')
    streak.value += 1
    if (streak.value > bestStreak) {
      bestStreak = streak.value
      localStorage.setItem('bestStreak', bestStreak.toString())
    }
  } else {
    // Incorrect answer
    console.log('Incorrect! Correct answer is:', codes.value[flagCode.value])
    streak.value = 0
  }

  selectedAnswer.value = selectedOption
}
</script>
