<script setup>
import CustomScrollbar from "custom-vue-scrollbar";
import NotificationItem from "./NotificationItem.vue";
import NotificationSkeletor from "./NotificationSkeletor.vue";
import { ref } from "vue";
const notifications = ref([
  {
    id: 1,
    message: "Hello, this is a random message!",
    name: "John Doe",
    createdAt: new Date(),
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    message: "Another random message for you.",
    name: "Jane Smith",
    createdAt: "2024-10-09T10:10:10Z",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    action: true,
    title: "Wifi Connect",
  },
  {
    id: 3,
    message: "Just sending a random message here.",
    name: "Michael Johnson",
    createdAt: "2024-10-09T12:45:30Z",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    title: "Wifi Connect",
  },
  {
    id: 4,
    message: "Hi, I hope you're having a good day!",
    name: "Emily Davis",
    createdAt: "2024-10-09T12:50:00Z",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    message: "This is another test message.",
    name: "David Martinez",
    createdAt: "2024-10-09T12:55:45Z",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 6,
    message: "Let's see how this works.",
    name: "Sophia Garcia",
    createdAt: "2024-10-09T13:00:00Z",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    action: true,
    title: "Wifi Connect",
  },
  {
    id: 7,
    message: "Random message generation is cool.",
    name: "William Brown",
    createdAt: "2024-10-09T13:05:15Z",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: 8,
    message: "Testing the array of data.",
    name: "Olivia Wilson",
    createdAt: "2024-10-09T13:10:20Z",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: 9,
    message: "Here’s another random message.",
    name: "James Thomas",
    createdAt: "2024-10-09T13:15:25Z",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    id: 10,
    message: "Adding more data to the list.",
    name: "Ava Taylor",
    createdAt: "2024-10-09T13:20:30Z",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    action: true,
  },
  {
    id: 11,
    message: "Just another random text here.",
    name: "Henry White",
    createdAt: "2024-10-09T13:25:35Z",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: 12,
    message: "This random message is for testing.",
    name: "Mia Harris",
    createdAt: "2024-10-09T13:30:40Z",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: 13,
    message: "Creating some fake data entries.",
    name: "Ethan Clark",
    createdAt: "2024-10-09T13:35:45Z",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    action: true,
  },
  {
    id: 14,
    message: "Another entry into the data set.",
    name: "Amelia Lewis",
    createdAt: "2024-10-09T13:40:50Z",
    avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    action: true,
  },
  {
    id: 15,
    message: "Making sure this works properly.",
    name: "Benjamin Lee",
    createdAt: "2024-10-09T13:45:55Z",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    id: 16,
    message: "More random messages for testing.",
    name: "Charlotte Walker",
    createdAt: "2024-10-09T13:50:00Z",
    avatar: "https://randomuser.me/api/portraits/women/16.jpg",
  },
  {
    id: 17,
    message: "This is quite fun!",
    name: "Lucas Hall",
    createdAt: "2024-10-09T13:55:10Z",
    avatar: "https://randomuser.me/api/portraits/men/17.jpg",
  },
  {
    id: 18,
    message: "Another random text.",
    name: "Harper Allen",
    createdAt: "2024-10-09T14:00:15Z",
    avatar: "https://randomuser.me/api/portraits/women/18.jpg",
  },
  {
    id: 19,
    message: "Hope this list works fine.",
    name: "Jack Scott",
    createdAt: "2024-10-09T14:05:20Z",
    avatar: "https://randomuser.me/api/portraits/men/19.jpg",
  },
  {
    id: 20,
    message: "Last random message for now.",
    name: "Ella Young",
    createdAt: "2024-10-09T14:10:25Z",
    avatar: "https://randomuser.me/api/portraits/women/20.jpg",
  },
]);
const isLoading = ref(true);
setTimeout(() => (isLoading.value = false), 3000);
</script>

<template>
  <custom-scrollbar
    thumbWidth="5"
    direction="horizontal"
    :style="{ height: '26.67rem' }"
    contentClass="d-block"
  >
    <div class="alert-body">
      <notification-skeletor
        v-if="isLoading"
        v-for="(_, index) in 6"
        :key="index * 100"
      ></notification-skeletor>
      <notification-item
        v-else
        v-for="(notification, index) in notifications"
        :key="index"
        :notification="notification"
      ></notification-item>
    </div>
  </custom-scrollbar>
</template>