import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { QuestionsService } from 'src/app/service/questions.service';

@Component({
  selector: 'app-catergories',
  templateUrl: './catergories.component.html',
  styleUrls: ['./catergories.component.scss'],
})
export class CatergoriesComponent implements OnInit {
  readonly categories = ['History', 'Geology', 'Science', 'General Knowledge'];
  constructor(
    private route: Router,
    private questionsService: QuestionsService
  ) {}

  ngOnInit(): void {
    this.questionsService.questionsObs$.subscribe((data) => {
      console.log(data);
    });
  }

  onCategorySelection(selectedCategory: string): void {
    this.route.navigate(['questions', { category: selectedCategory }]);
  }
}
