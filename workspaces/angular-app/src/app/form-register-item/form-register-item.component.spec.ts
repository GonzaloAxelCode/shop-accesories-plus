import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterItemComponent } from './form-register-item.component';

describe('FormRegisterItemComponent', () => {
	let component: FormRegisterItemComponent;
	let fixture: ComponentFixture<FormRegisterItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FormRegisterItemComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(FormRegisterItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
