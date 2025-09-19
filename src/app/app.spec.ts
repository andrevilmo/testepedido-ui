import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MATERIAL_ANIMATIONS } from '@angular/material/core';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: MATERIAL_ANIMATIONS,
          useValue: { animationsDisabled: true },
        },
      ],
    }).compileComponents();
  });

  it('should not open dialog', async () => {
    const fixture = TestBed.createComponent(App);
    const loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    const dialog = await loader.getHarnessOrNull(MatDialogHarness);
    expect(dialog).toBeNull();
  });
});