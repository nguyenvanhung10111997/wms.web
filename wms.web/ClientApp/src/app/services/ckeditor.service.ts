import { inject, Injectable } from "@angular/core";
import { from, lastValueFrom, mergeMap } from "rxjs";
import { FileService } from "./file.service";

@Injectable()
export class CKEditorService {
  private _fileService = inject(FileService);
  constructor() {}

  public async onReadyTodo(editor) {
    let htmlContent = editor.getData();
    editor.setData(htmlContent);
    editor.plugins.get("FileRepository").createUploadAdapter = loader => {
      const maxFileSizeKB = 0;
      return new UploadAdapter(loader, maxFileSizeKB, this._fileService);
    };
  }

  public onChange() {
    console.log("ckeditor onChange");
  }

  public async onReady(editor, maxFileSizeKB: number = 0) {
    editor.plugins.get("FileRepository").createUploadAdapter = loader => {
      return new UploadAdapter(loader, maxFileSizeKB, this._fileService);
    };
  }
}

class UploadAdapter {
  private _loader;
  private _notify;
  _filePath;
  _absoluteURL;
  _maxFileSizeKB: number = 1024; //1MB mặc định
  constructor(
    loader,
    maxFileSizeKB,
    private _fileService: FileService
  ) {
    this._loader = loader;
    if (maxFileSizeKB > 0) this._maxFileSizeKB = maxFileSizeKB;
  }

  async upload() {
    return new Promise((resolve, reject) => {
      this._loader.file.then(async file => {
        if (file.size > this._maxFileSizeKB * 1024) {
          // Dung lượng vượt quá giới hạn
          this._notify.openInfo(
            "Dung lượng tệp tin vượt giới hạn cảnh báo " +
              this._maxFileSizeKB +
              " KB."
          );
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          try {
            // Upload the file and get the response
            const response = await lastValueFrom(
              this._fileService.attachFile(file)
            );
            const { FilePath, FileName } = response.body.Data;
            resolve({
              default: FilePath,
              attributes: {
                size: file.size,
                type: file.type,
                alt: FileName,
                dataFilePath: FilePath,
                dataFileName: FileName
              }
            });
          } catch (error) {
            reject(error);
          }
        };
      });
    });
  }
  abort() {
    // Implement this method if needed
  }
}
