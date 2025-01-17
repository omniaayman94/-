import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatergoriesComponent } from './components/catergories/catergories.component';
import { QuestionsComponent } from './components/questions/questions.component';

const routes: Routes = [
  { path: '', component: CatergoriesComponent },
  { path: 'questions', component: QuestionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
