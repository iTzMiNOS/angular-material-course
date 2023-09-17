import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {MatCalendarCellClassFunction, MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: "create-course-step-1",
  templateUrl:"create-course-step-1.component.html",
  styleUrls: ["create-course-step-1.component.scss"]
})
export class CreateCourseStep1Component implements OnInit {

  form = this.fb.group({
    title: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(60)
    ]],
    releasedAt: [new Date(), Validators.required],
    category: [[], Validators.required],
    courseType: ['premium', Validators.required],
    downloadsAllowed: [false, Validators.requiredTrue],
    longDescription: ['', [Validators.required, Validators.minLength(3)]]
  });

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {

    const date = cellDate.getDate();

    if (view === 'month') {
      return (date === 1) || (date === 15) ? 'highlight-date': '';
    }
    return "";
  }
  myFilter = (d: Date | null): boolean => {
    if (!d) {
      return false;
    }
    const dayOfMonth = d.getDate();
    // Prevent Saturday and Sunday from being selected.
    return dayOfMonth !== 1 && dayOfMonth !== 15;
  };

  constructor(private fb: UntypedFormBuilder) {

  }
  ReadOnlyStyleGuideNotes: boolean;
  ngOnInit(): void {
    this.ReadOnlyStyleGuideNotes = true;
  }

  get courseTitle() {
    return this.form.controls['title'];
  }

}
