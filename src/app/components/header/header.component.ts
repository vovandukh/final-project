import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('topPanel') topPanel!: ElementRef;
  public topPanelOffsetTop: number = 0;
  public topPanelElse = {'top-panel-else': false }
  constructor() { }

  ngOnInit(): void {
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const rect = this.topPanel.nativeElement.getBoundingClientRect();
    this.topPanelOffsetTop = +rect.top + window.pageYOffset - document.documentElement.clientTop;
    console.log(this.topPanelOffsetTop);
    if(this.topPanelOffsetTop > 10){
      this.topPanelElse = {'top-panel-else': true }
    } else{
      this.topPanelElse = {'top-panel-else': false }
    }
  }
}
