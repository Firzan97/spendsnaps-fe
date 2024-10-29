<template>
  <Toaster position="bottom-center" />

  <div class="flex justify-center my-8">
    <Button :disabled="loading" @click="onSnap">
      <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
      <Camera v-else class="w-4 h-4 mr-2" /> Snap Receipt
    </Button>
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      style="display: none"
      @change="onFileChange"
    >
  </div>
  <div class="flex justify-start items-center mx-9 my-6">
    <div>
      <Label for="name" class="text-right mr-2"> Filter: </Label
      ><DashboardDateFilter />
    </div>
  </div>
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mx-9">
    <Card>
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-sm font-medium"> Total Revenue </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          class="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">$45,231.89</div>
        <p class="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-sm font-medium"> Total Revenue </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          class="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">$45,231.89</div>
        <p class="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-sm font-medium"> Total Revenue </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          class="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">$45,231.89</div>
        <p class="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-sm font-medium"> Total Revenue </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          class="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">$45,231.89</div>
        <p class="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
  </div>
  <div class="mx-9">
    <Separator class="my-5 mt-12" />
  </div>

  <DashboardReceiptList :receipts="receipts" />
</template>

<script setup lang="ts">
import { Separator } from "@/components/ui/separator";
import { Camera, Eye, Pencil, Trash2, Loader2 } from "lucide-vue-next";
import { Toaster, toast } from "vue-sonner";
import { ref } from "vue";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import type { IReceipt } from "~/types";
definePageMeta({
  middleware: "auth",
  auth: {
    guestRedirectUrl: "/sign-in",
  },
});

const router = useRouter();
const loading = ref(false);
const imageFile = ref<File | null>(null);
const fileInputRef = useTemplateRef("fileInput");
const previewImage = ref<string | null>(null);
const receipts = ref<IReceipt[]>([]);

// Fetch the receipts on component mount
const fetchReceipts = async () => {
  const { data, error } = await useFetch("http://192.168.100.50:8081/receipts");
  receipts.value = data.value as IReceipt[];

  if (error.value) {
    console.error("Error fetching receipts:", error.value);
    toast.error("Failed to fetch receipts.");
  } else {
    receipts.value = data.value as IReceipt[];
  }
};

const onSnap = async () => {
  fileInputRef.value.click();
};

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("receipt", file);

  const { error, data } = await useFetch("http://192.168.100.50:8081/extract", {
    method: "POST",
    body: formData,
    immediate: true,
  });

  await fetchReceipts();

  if (error.value) {
    // toast.error("Error uploading receipt:", error.value);
    // toast.error("Failed to upload receipt.");
  } else {
    toast.success("Receipt has been uploaded and processed. Happy spending!");
    await fetchReceipts();
  }
};

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  alert(input.files?.length);
  if (input.files?.length) {
    const file = input.files[0];
    imageFile.value = file;

    uploadImage(file);
  }
};

fetchReceipts();
</script>
