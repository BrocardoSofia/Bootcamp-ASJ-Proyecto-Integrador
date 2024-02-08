import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../services/login.service";

export const loginGuard = () => {

  const router = inject(Router);
  const loginService: LoginService = inject(LoginService);

  if (loginService.getUserId() === -1) {
    router.navigate(['/index']);
    return false;
  } else {
    return true;
  }

  // return true;
}