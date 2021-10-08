import './custom-upload.css'
import {Icon}             from "../../icons/icon";
import {useRef, useState} from "react";
import Compressor from 'compressorjs';


export function CustomUpload(props){
const [fileName,setFileName] = useState('PNG, JPG, GIF, PDF are accepted');
const fileInput = useRef();

 function getBase64(img: File, callback: (img: string) => void): void {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader?.result.toString()))
  reader.readAsDataURL(img);
}

function onUpload(e){
    const selectedFile = e.target.files[0];
    const x = selectedFile.type + "";
    const fileType = x.substr(x.indexOf("/") + 1) + "";
    const isFile = new RegExp("jpeg|png|gif|jpg").test(fileType);
    if(isFile){
        const name = selectedFile.name.length >
        32 ?`${selectedFile.name.substr(0,32)}...`:selectedFile.name;
        setFileName(name);

        new Compressor(selectedFile, {
            quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
            success: (compressedResult) => {
                getBase64(compressedResult, (img: string) => {
                  props.getUploadedFile(img);
                });
            },
        });
    }

}

    return(
       <div>
           <input
               style={{ display: "none" }}
               type="file"
               onChange={onUpload}
               ref={fileInput}
           />
           <div onClick={() => fileInput.current.click()} className="custom-upload-container">
            <div className="p-grid">
                <span className="p-col-3"><Icon icon="upload"/></span>
                <span className="p-col-9">
                    <span className="p-grid upload-grid-position">
                        <span className="p-col-12"><span className="upload-title">{props.title}</span></span>
                       <span className="p-col-12"><span className="upload-text">{fileName}</span></span>
                    </span>
                </span>
            </div>
           </div>
       </div>
    )
}
