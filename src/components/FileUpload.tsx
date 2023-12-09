import React, { useState, ChangeEvent } from 'react';
import { Message } from '@/types/types';

type Props = {
  onFileUpload: (messages: Message[]) => void;
};

export default function FileUpload({ onFileUpload }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          const content = JSON.parse(e.target.result as string);
          onFileUpload(content.messages as Message[]);
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-4 p-4 border-2 border-dashed border-blue-500 rounded-lg">
      <input type="file" className="my-2" onChange={handleFileChange} />
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={handleUpload}>Upload</button>
    </div>
  );
}
