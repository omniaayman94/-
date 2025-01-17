import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private questionsSub = new Subject();
  questionsObs$ = this.questionsSub.asObservable();
  constructor() {}

  changeQuestions(data):void {
    this.questionsSub.next(data);
  }
}
