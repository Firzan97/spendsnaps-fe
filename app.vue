<template>
  <div class="h-screen">
    <div
      class="w-full border-b flex flex-col sm:flex-row h-36 sm:h-16 items-center justify-evenly sm:justify-between px-4"
    >
      <div
        class="flex w-[400px] justify-center sm:justify-start sm:my-8 sm:ml-8"
      >
        <h4
          class="scroll-m-20 text-xl font-semibold tracking-tight text-center cursor-pointer"
          @click="router.push('/')"
        >
          SpendSnap
        </h4>
      </div>
      <div class="flex w-[400px] flex justify-center sm:my-8">
        <div
          class="text-lg font-semibold mr-6 cursor-pointer"
          @click="router.push('/')"
        >
          Dashboard
        </div>
        <div
          class="text-lg font-semibold cursor-pointer"
          @click="router.push('/about-us')"
        >
          About Us
        </div>
      </div>
      <div
        class="flex w-[400px] items-center justify-center sm:justify-end sm:mr-8"
      >
        <UserButton />
      </div>
    </div>
    <div class="flex-1">
      <NuxtPage />
    </div>

    <!-- <div
      class="w-full border-b flex flex-col h-16 items-center justify-evenly px-4 static bg-red-800"
    ></div> -->
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
</script>
