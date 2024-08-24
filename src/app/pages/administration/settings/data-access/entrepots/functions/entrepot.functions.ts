import { firstValueFrom, Observable } from "rxjs";
import { NotyfService } from "@/shared/services/notyf.service";
import { MatDialogRef } from "@angular/material/dialog";
import { EntrepotFormComponent } from "@/pages/administration/settings/ui/entrepot/feature/users-form/entrepot-form.component";

export async function handleGetAllUsers(
  getAllFn: () => Observable<any>,
  notyfService: NotyfService,
): Promise<any> {
  try {
    const res = await firstValueFrom(getAllFn());
    if (res) {
      return res;
    } else {
      notyfService.showToast("error", res?.message, "toast-danger");
    }
  } catch (err) {
    notyfService.showToast("error", "An error occurred", "toast-danger");
    throw err;
  }
}



export async function handleStoreUsers(
  storeFn: () => Observable<any>,
  dialogService: MatDialogRef<EntrepotFormComponent>,
  notyfService: NotyfService,
): Promise<void> {
  try {
    const res = await firstValueFrom(storeFn());

    if (res.status ==='success') {
      notyfService.showToast("success", res?.message, "toast-success");
      dialogService.close();
    } else {
      notyfService.showToast("error", res.message, "toast-danger");
    }
  } catch (err) {
    notyfService.showToast("error", "An error occurred", "toast-danger");
    throw err;
  }
}

export async function handleUpdateUsers(
  updateFn: () => Observable<any>,
  dialogService: MatDialogRef<EntrepotFormComponent>,
  notyfService: NotyfService,
): Promise<void> {
  try {
    const res = await firstValueFrom(updateFn());
    if (res.status ==='success') {
      notyfService.showToast("success", res?.message, "toast-success");
      dialogService.close();
    } else {
      notyfService.showToast("error", res?.message, "toast-danger");
    }
  } catch (err) {
    notyfService.showToast("error", "An error occurred", "toast-danger");
    throw err;
  }
}

export async function handleDeleteUsers(
  deleteFn: () => Observable<any>,
  notyfService: NotyfService,
): Promise<void> {
  try {
    const res = await firstValueFrom(deleteFn());
    if (res?.status) {
      notyfService.showToast("success", res?.message, "toast-success");
    } else {
      notyfService.showToast("error", res?.message, "toast-danger");
    }
  } catch (err) {
    notyfService.showToast("error", "An error occurred", "toast-danger");
    throw err;
  }
}
