import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/interface/user.interface';
import { ModalAddUserComponent } from '../modal-add-user/modal-add-user.component';
import { UserService } from 'src/app/service/user/user.service';
import { BehaviorSubject, Subject, filter, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss']
})
export class TableUsersComponent implements OnInit, OnDestroy {
  dataSource?: IUser[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'status'];

  private matDialogRef?: MatDialogRef<ModalAddUserComponent>;
  private _destroy$$ = new Subject<void>();
  private uploadApi$ = new BehaviorSubject<boolean>(false);
  constructor(
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUsers();

    this.uploadApi$.pipe(
      filter((isUpload) => isUpload),
      takeUntil(this._destroy$$)
    ).subscribe(() => {
      this.uploadTable();
      this.uploadApi$.next(false);
    })
  }

  getUsers(): void {
    // getting the product from the resolved data by the UserResolver
    this.dataSource = this.route.snapshot.data['users']
  }

  openModalAddUser() {
    this.matDialogRef = this.matDialog.open(ModalAddUserComponent);
    this.matDialogRef.afterClosed().subscribe((data: IUser) => {
      this.userService.postUser(data).pipe(takeUntil(this._destroy$$)).subscribe(() => {
        this._snackBar.open('Upload User done');
        this.uploadApi$.next(true);
      })
    })
  }

  uploadTable() {
    // Upload Table form api
    this.userService.getUsers().pipe(takeUntil(this._destroy$$)).subscribe((data) => {
      this.dataSource = data;
    })
  }

  ngOnDestroy(): void {
    this._destroy$$.next();
    this._destroy$$.complete();
  }
}
