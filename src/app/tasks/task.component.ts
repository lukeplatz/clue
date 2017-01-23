import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TaskService, TASK_STATUS_CODES } from './task.service';

import { UserService, USER_STATUS_CODES } from '../user/user.service';

@Component({
  moduleId: module.id,
  selector: 'task',
  templateUrl: './task.component.html',
  // styleUrls: ['./app.component.css']
})
export class TaskComponent implements OnInit {
	private task: any = [];
	private complete: boolean = false;
	private loading: boolean = false;
	private error: string;
	private completionError: string;

	constructor(private router: Router,
				private route: ActivatedRoute,
				private taskService: TaskService,
				private userService: UserService) {
	}

	ngOnInit() {
		this.loading = true;
		this.error = null;

		let id = +this.route.snapshot.params['task_id'];
		this.taskService.getTaskById(id).subscribe(task => {
			this.loading = false;
			this.task = task;
		}, error => {
			this.loading = false;
			this.error = TASK_STATUS_CODES[error.status] || TASK_STATUS_CODES[500];
		});
	}

	taskComplete() {
		//TODO: mark task complete on server - once users implemented
		//TODO: get clue from server with clue_id - currently the clue is just stored with task
		this.task.complete = true;
		this.userService.completeTask(this.task._id).subscribe(task => {
			this.complete = true;
		}, error => {
			this.completionError = USER_STATUS_CODES[error.status] || USER_STATUS_CODES[500];
		});
		
	}
}
