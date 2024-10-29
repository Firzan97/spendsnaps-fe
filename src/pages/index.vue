<script setup>
definePageMeta({
  middleware: "guest",
  auth: { authenticatedRedirectUrl: "/dashboard" },
});
</script>

<template>
  <div
    class="flex justify-center items-center lg:grid w-full h-screen lg:grid-cols-2"
  >
    <div class="hidden lg:flex justify-center items-center h-full bg-slate-800">
      <h4
        class="scroll-m-20 text-xl font-semibold tracking-tight text-center cursor-pointer text-white"
      >
        SpendSnap
      </h4>
    </div>

    <div class="flex flex-col justify-center items-center">
      <h4
        class="lg:hidden scroll-m-20 text-xl font-semibold tracking-tight text-center cursor-pointer mb-6"
      >
        SpendSnap
      </h4>
      <SignIn />
    </div>
  </div>
</template>
