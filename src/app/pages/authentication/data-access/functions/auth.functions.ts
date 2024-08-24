import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { NotyfService } from "src/app/shared/services/notyf.service";
import { firstValueFrom } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { ApiResponse } from "@/core/entities/api-response-model";
import { IndexedDbService } from "@/shared/services/indexed-db.service";
import { EncodingDataService } from "@/shared/services/encoding-data.service";

export async function handleSignIn(
  signInFn: () => Observable<any>,
  db: IndexedDbService,
  notyfService: NotyfService,
  storageService: EncodingDataService,
  router: Router,
): Promise<void> {
  try {
    const res: any = await firstValueFrom(signInFn());
    if (res && res.user) {
      // Obtention du token d'accès
      const token = await res.user.getIdToken();
      // Sauvegarde du token
      storageService.saveData("sessionToken", token);
     
      notyfService.showToast("success", "Connexion réussie", "toast-success");
      router.navigate(['/settings/entrepot']);
    } else {
      notyfService.showToast("error", "Échec de la connexion", "toast-danger");
    }
  } catch (err) {
    console.error("Erreur de connexion:", err);
    notyfService.showToast("error", err.message || "Une erreur est survenue", "toast-danger");
    throw err;
  }
}

export async function handleResetPassword(
  resetPasswordFn: () => Observable<any>,
  db: IndexedDbService,
  notyfService: NotyfService,
  router: Router,
): Promise<void> {
  try {
    const res = await firstValueFrom(resetPasswordFn());
    if (!res?.error) {
    } else {
      notyfService.showToast("error", res?.message, "toast-danger");
    }
  } catch (err) {
    notyfService.showToast("error", err, "toast-danger");
    throw err;
  }
}
