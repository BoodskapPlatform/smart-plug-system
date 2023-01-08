import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagehistoryComponent } from './messagehistory.component';

describe('MessagehistoryComponent', () => {
  let component: MessagehistoryComponent;
  let fixture: ComponentFixture<MessagehistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagehistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
