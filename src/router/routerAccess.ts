import useUserStore from "@/store/userStore";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export async function checkAccess(to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) {
  const userStore = useUserStore();
  const password = userStore.password;

  if (password === 'soydenissita' && to.meta.requiresAdmin) {
    next();
  } else {
    next();
  }
}