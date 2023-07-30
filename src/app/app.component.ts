import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('elementRefName', { static: true }) elementRef: any;

  title = 'jigsaw-puzzle';

  puzzleImage = 'tree';

  containerPos: any;

  success: number = 0;

  imagesList: any = [];

  imagesListCopy: any = [];

  imagesSolve: any = [];

  checked = false;

  puzzleList = ['tree', 'rue', 'jungkook'];
  
  ngOnInit(): void {
    this.generatePuzzle();
  }
  generatePuzzle() {
    this.imagesList = [];
    this.imagesSolve = [];
    this.success = 0;
    for(let i=0 ; i<=99 ; ++i) {
      const [x, y] = [Math.floor(i/10), i%10];
      const imgNo = ('0'+(x+y*10)).slice(-2);
      this.imagesList.push(
        {
          x: 0,
          y:0,
          xi: x,
          yi: y,
          imgUrl: `../assets/image/${this.puzzleImage}/${imgNo}.jpeg`,
          imgCode: imgNo
        }
      )
      this.imagesSolve.push(
        {
          xi: x,
          yi: y,
        }
      );
    }
    this.imagesListCopy = [...this.imagesList];
  }

  ngAfterViewInit() {
    this.getPosition();
  }
  
  getPosition(): void {
    if(this.elementRef)
    this.containerPos = this.elementRef.nativeElement.getBoundingClientRect();
  }

  cdkDragEnded(pos: any){
    const [yi, xi] = pos.event.srcElement.currentSrc.split('/').slice(-1)[0].split('.')[0].split('');
    
    console.log("Hi");
    const y = Math.floor((pos.dropPoint.x - this.containerPos.x - 2)/62);
    const x = Math.floor((pos.dropPoint.y - this.containerPos.y - 2)/42);
    const idx = this.imagesList.findIndex((img: any) => (img.xi === x && img.yi === y));

    if(!(xi == x && yi == y)) return;
    const obj = this.imagesSolve.find((img: any) => (img.xi === x && img.yi === y));
    if(idx === -1)  return;

    obj.imgUrl = this.imagesList[idx].imgUrl;
    this.imagesList.splice(idx, 1);
    this.success++;
  }

  toggleChange(e: any): void{ 
    this.checked = e.checked;
  }

  onPuzzleImageChange(){
    this.generatePuzzle();
  }
  
}
