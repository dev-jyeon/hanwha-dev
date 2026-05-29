import { useRef, useState } from 'react';

interface Props {
  callback: (file: any) => void;
}
export function FileTest({ callback }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const [fileType, setFileType] = useState('');

  const onClickCamera = () => {
    setFileType('camera');
  };

  return (
    <>
      <input ref={fileRef} type="file" onChange={(e) => callback(e.target.files)} />
      <button onClick={onClickCamera}>카메라</button>
      <button>갤러리</button>
      <button>파일</button>
    </>
  );
}
