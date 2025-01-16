import { HttpEventType, HttpResponse } from "@angular/common/http";
import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from "@angular/core";
import {
  FormGroup,
  NG_VALUE_ACCESSOR,
  UntypedFormBuilder
} from "@angular/forms";
import { CRUDResult } from "~src/app/services/api.service";
import { FileService } from "~src/app/services/file.service";
@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"],
  standalone: true
})
export class FileUploadComponent implements OnInit {
  @Input() label: string;
  @Input() controlName: string;
  @Input() form: FormGroup;
  @Input() disabled: boolean = false;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = "";
  filePath = "";
  absoluteURL = "";

  @Input() maxFileSizeKB: number = 500 * 1024; //500mb
  @Input() maxImageWidth: number = 1920;
  @Input() maxImageHeight: number = 1920;

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  fileAttr = "Chọn file tải lên";
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
  private _fileService = inject(FileService);
  constructor(
    private fb: UntypedFormBuilder,
    private renderer: Renderer2
  ) {}
  createFormGroup() {
    if (!this.controlName) {
      this.controlName = `control-name-${this.getRandomID()}`;
    }
    const group = this.fb.group({});
    group.addControl(this.controlName, this.fb.control(""));
    return group;
  }

  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }

  ngOnInit(): void {
    if (!this.form) {
      this.form = this.createFormGroup();
    }
  }

  onUploadFile(event: any): void {
    const maxFileSizeKB = this.maxFileSizeKB; // Dung lượng giới hạn KB
    const maxImageWidth = this.maxImageWidth; // Kích thước tối đa của hình ảnh (chiều rộng)
    const maxImageHeight = this.maxImageHeight; // Kích thước tối đa của hình ảnh (chiều cao)

    const file: File = event.target.files[0];

    if (!file) {
      return;
    }

    // Kiểm tra dung lượng tệp tin
    if (file.size > maxFileSizeKB * 1024) {
      // Dung lượng vượt quá giới hạn
      // this._notify.openInfo(
      //   `Dung lượng tệp tin vượt quá giới hạn ${maxFileSizeKB} KB.`
      // );
      alert(`Dung lượng tệp tin vượt quá giới hạn ${maxFileSizeKB} KB.`);
      this.resetFileInput();
      return;
    }

    // Sử dụng FileReader để đọc kích thước hình ảnh
    const reader = new FileReader();

    reader.onload = (event: any) => {
      const image = new Image();

      image.onload = () => {
        this.progress = 0;
        const width = image.width;
        const height = image.height;

        if (width > maxImageWidth || height > maxImageHeight) {
          // Kích thước hình ảnh vượt quá giới hạn
          // this._notify.openInfo(
          //   `Kích thước hình ảnh vượt quá giới hạn. Vui lòng chọn hình ảnh có kích thước nhỏ hơn hoặc bằng ${maxImageWidth}x${maxImageHeight}.`
          // );
          alert(
            `Kích thước hình ảnh vượt quá giới hạn. Vui lòng chọn hình ảnh có kích thước nhỏ hơn hoặc bằng ${maxImageWidth}x${maxImageHeight}.`
          );
          this.resetFileInput();
          return;
        }

        // Tiếp tục xử lý upload nếu tệp tin và hình ảnh đều hợp lệ
        this.currentFile = file;
        this.fileAttr = "";
        this._fileService.attachFile(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              var apiResponse: CRUDResult = event.body;
              if (apiResponse?.StatusCode === 0) {
                const data = apiResponse.Data;
                this.currentFile = data;
                this.onChange.emit({
                  filePath: data.FilePath,
                  fileName: data.FileName,
                  size: file.size,
                  width: image.width,
                  height: image.height
                });
              } else {
                // this._notify.openInfo(
                //   `Đã xảy ra lỗi trong quá trình tải file.`
                // );
                alert(`Đã xảy ra lỗi trong quá trình tải file.`);
                this.resetFileInput();
                throw apiResponse;
              }
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = "Đã xảy ra lỗi trong quá trình tải file!";
            }
            this.currentFile = undefined;
            this.resetFileInput();
          }
        );
      };

      image.src = event.target.result;
    };

    reader.readAsDataURL(file);
    this.resetFileInput();
  }

  resetFileInput(): void {
    this.fileInput.nativeElement.value = "";
    this.selectedFiles = null;
    this.progress = 0;
  }
}
