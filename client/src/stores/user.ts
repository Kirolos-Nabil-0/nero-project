import { defineStore } from "pinia";
import { User } from "../types";
import { useLocalStorage } from "@vueuse/core";
import Swal from "sweetalert2"; // Import SweetAlert2
import router from "@/router";

// Sound file paths
const successSound = new Audio("/login.mp3");
const errorSound = new Audio("/error.mp3");
const logoutSound = new Audio("/logout.mp3");

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
    // Play logout sound
    logoutSound.play();

    Swal.fire({
      icon: "success",
      title: "تم تسجيل الخروج بنجاح",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      background: "#333",
      color: "#fff",
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

        // Play success sound
        successSound.play();

        // Initialize the timer duration
        let timerInterval: any;
        let timer = 5;

        Swal.fire({
          icon: "success",
          title: `تم تسجيل الدخول بنجاح`,
          html: `سيتم توجيهك في غضون <b>${timer}</b> ثواني.`,
          timer: 5000, // 5 seconds
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timerProgressBar: true,
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
          background: "#333",
          color: "#fff",
        }).then(() => {
          router.push("/");
        });
      } else {
        throw new Error("بيانات الاعتماد غير صحيحة");
      }
    } catch (error) {
      // Play error sound
      errorSound.play();

      Swal.fire({
        icon: "error",
        title: "فشل تسجيل الدخول",
        text: "يرجى التحقق من بيانات الاعتماد الخاصة بك والمحاولة مرة أخرى.",
        confirmButtonText: "حسناً",
        background: "#ff4d4f",
        color: "#fff",
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
