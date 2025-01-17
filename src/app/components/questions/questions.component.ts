import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DIFFICULTY_ARRAY, QUESTIONS } from 'src/app/const/questions.const';
import { QuestionsService } from 'src/app/service/questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  readonly questionsData = QUESTIONS;
  selectedCategory: string;
  questions;
  currentQuestionIndex = 0;
  userAnswers = [];
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private questionsService: QuestionsService
  ) {}

  ngOnInit(): void {
    this.selectedCategory = this.activatedRoute.snapshot.params.category;
    this.questions = this.questionsData
      .filter((item) => item.category === this.selectedCategory)
      .sort(
        (a, b) =>
          DIFFICULTY_ARRAY.indexOf(a.difficulty) -
          DIFFICULTY_ARRAY.indexOf(b.difficulty)
      );
    this.formatDDL();
    this.questionsService.changeQuestions(this.questionsData);
  }

  onAnswerSelect(event): void {
    this.userAnswers[this.currentQuestionIndex] = event.target.value;
    this.questions[this.currentQuestionIndex].userAnswer = event.target.value;
  }

  formatDDL() {
    this.questions = this.questions.map((item) => {
      let newDDL;
      if (item.type === 'multiple') {
        newDDL = item?.incorrect_answers?.map((answer) => {
          return { value: answer, viewValue: answer };
        });
        newDDL.push({
          value: item.correct_answer,
          viewValue: item.correct_answer,
        });
        return { ...item, answersList: newDDL };
      }
      return { ...item };
    });
  }

  nextQuestion() {
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.route.navigate(['']);
      let filteredData = this.questionsData.filter(
        (question) => question.category !== this.selectedCategory
      );
      filteredData.push(...this.questions);
      this.questionsService.changeQuestions(filteredData);
    } else {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion() {
    this.currentQuestionIndex--;
  }
}
