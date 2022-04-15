import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthFormComponent } from './auth/auth-form/auth-form.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { ProtectForAuthorizedGuard } from './auth/protectForAuthorized.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'category',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./categories/categories.module').then((m) => m.CategoriesModule),
  },
  {
    path: 'login',
    canActivate: [ProtectForAuthorizedGuard],
    component: AuthFormComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
