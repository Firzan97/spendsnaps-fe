<template>
  <div class="flex justify-center my-8">
    <Tabs default-value="simple" class="w-full lg:w-3/5 m-4">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="simple"> Simple View </TabsTrigger>
        <TabsTrigger value="image"> Image View </TabsTrigger>
      </TabsList>

      <TabsContent value="simple">
        <div class="flex flex-col items-center mt-4 mx-8">
          <Separator label="October, 2024" class="font-semibold my-5" />
          <div
            v-for="(receipt, index) in receipts"
            :key="index"
            class="grid grid-cols-12 gap-4 m-2 w-full"
          >
            <div class="col-span-1 justify-items-center">
              <h1>{{ index + 1 }}.</h1>
            </div>
            <div class="col-span-5">
              <small class="text-sm font-medium leading-none">{{
                receipt.ShopName
              }}</small>
            </div>
            <div class="col-span-6 sm:col-span-3">
              <small class="text-sm font-medium leading-none"
                >RM {{ receipt.Total }}</small
              >
            </div>
            <div class="col-span-4 sm:col-span-1 justify-items-end">
              <Button
                variant="secondary"
                @click="openModal(receipt.ImageURL)"
                class="w-full mr-2"
              >
                <Eye class="h-4" />
              </Button>
            </div>

            <div class="col-span-4 sm:col-span-1 justify-items-end">
              <Dialog>
                <DialogTrigger as-child>
                  <Button
                    class="w-full mr-2 bg-yellow-500 text-white-300 hover:bg-yellow-400"
                  >
                    <Pencil class="h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Receipt</DialogTitle>
                    <DialogDescription>
                      Our scan is incorrect? Please make your changes here.
                      Click 'Save' when you are done.
                    </DialogDescription>
                  </DialogHeader>
                  <div class="grid gap-4 py-4">
                    <div class="grid grid-cols-4 items-center gap-4">
                      <Label for="name" class="text-right"> Shop name </Label>
                      <Input
                        id="name"
                        value="Pedro Duarte"
                        class="col-span-3"
                      />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                      <Label for="username" class="text-right"> Total </Label>
                      <Input
                        id="username"
                        value="@peduarte"
                        class="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit"> Save changes </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div class="col-span-4 sm:col-span-1 justify-items-end">
              <AlertDialog>
                <AlertDialogTrigger as-child>
                  <Button variant="destructive" class="w-full mr-2">
                    <Trash2 class="h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle
                      >Are you sure you want to delete this receipt?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. Deleting the receipt will
                      permanently remove it from our records.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="image">
        <Separator label="October, 2024" class="font-semibold my-5 mt-9" />
        <div class="flex flex-col flex-wrap items-center">
          <img
            v-for="(receipt, index) in receipts"
            :key="index"
            :src="receipt.ImageURL"
            @click="openModal(receipt.ImageURL)"
            class="w-[400px] h-[400px] mb-4 rounded-lg"
          />
        </div>
      </TabsContent>
    </Tabs>
  </div>

  <div
    v-if="isModalOpen"
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
  >
    <div class="relative">
      <img
        v-if="modalImage"
        :src="modalImage"
        alt="Modal image"
        class="max-w-full max-h-screen rounded-lg"
      />
      <button
        @click="closeModal"
        class="absolute top-2 right-2 w-8 text-white text-xl bg-gray-700 rounded-full p-1 hover:bg-gray-600"
      >
        &times;
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { UserButton } from "vue-clerk";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { IReceipt } from "~/types";

defineProps<{
  receipts: IReceipt[];
}>();

const isModalOpen = ref(false);
const modalImage = ref<string | null>(null);

const openModal = (url: string) => {
  modalImage.value = url;
  isModalOpen.value = true;
};

const closeModal = () => {
  modalImage.value = null;
  isModalOpen.value = false;
};
</script>
