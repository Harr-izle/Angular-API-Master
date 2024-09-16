import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the current page', () => {
    component.currentPage = 1;
    fixture.detectChanges();
    const pageElement = fixture.debugElement.query(By.css('.current-page')).nativeElement;
    expect(pageElement.textContent).toContain('Page 1');
  });

  it('should emit page change event when page is clicked', () => {
    spyOn(component.pageChange, 'emit'); 

    component.currentPage = 1;
    fixture.detectChanges();
    
    const pageButton = fixture.debugElement.query(By.css('.page-button')).nativeElement;
    pageButton.click();

    expect(component.pageChange.emit).toHaveBeenCalledWith(2); 
  });

  it('should handle input changes correctly', () => {
    component.totalPages = 5;
    fixture.detectChanges();

    const pageButtons = fixture.debugElement.queryAll(By.css('.page-button'));
    expect(pageButtons.length).toBe(5);
  });
});
