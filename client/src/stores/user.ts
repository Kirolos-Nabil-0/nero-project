import { defineStore } from "pinia";
import { User } from "../types";
import { useLocalStorage } from "@vueuse/core";
import Swal from "sweetalert2"; // Import SweetAlert2
import router from "@/router";

export const useUserStore = defineStore("user", () => {
  // Use VueUse's useLocalStorage to manage user state reactively
  const user = useLocalStorage<User | null>("user", null, {
    serializer: {
      read: (v) => (v ? JSON.parse(v) : null),
      write: (v) => JSON.stringify(v),
    },
  });

  // Actions
  function setUser(newUser: User) {
    user.value = newUser;
  }

  function logout() {
    user.value = null;
    Swal.fire({
      icon: "success",
      title: "تم تسجيل الخروج بنجاح",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  const isLoggedIn = computed(() => user.value !== null);

  async function login(phone: string, password: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data); // Set user and save to localStorage

        // Initialize the timer duration
        let timerInterval: any;
        let timer = 3;

        Swal.fire({
          icon: "success",
          title: `تم تسجيل الدخول بنجاح`,
          html: `سيتم توجيهك في غضون <b>${timer}</b> ثواني.`,
          timer: 3000, // 3 seconds
          showConfirmButton: false,
          didOpen: () => {
            const content = Swal.getHtmlContainer();
            const b = content?.querySelector("b");
            timerInterval = setInterval(() => {
              timer--;
              if (b) {
                b.textContent = timer.toString();
              }
            }, 1000);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then(() => {
          // Redirect after the countdown is over
          // Use router.push to navigate to the home page
          router.push("/");
        });
      } else {
        throw new Error("بيانات الاعتماد غير صحيحة");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "فشل تسجيل الدخول",
        text: "يرجى التحقق من بيانات الاعتماد الخاصة بك والمحاولة مرة أخرى.",
        confirmButtonText: "حسناً",
      });
      console.error("Login failed:", error);
    }
  }

  return {
    user,
    setUser,
    logout,
    isLoggedIn,
    login,
  };
});
