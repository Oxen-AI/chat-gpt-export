'use client';

import '@/styles/globals.css';
import React, { useState, ChangeEvent } from 'react';
import FileUpload from '@/components/FileUpload';
import { saveAs } from 'file-saver';
import { Message } from '@/types/types';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
  const [selectedMessages, setSelectedMessages] = useState<Message[]>([]);

  const handleFileUpload = (uploadedMessages: Message[]): void => {
    setMessages(uploadedMessages);
    setCurrentMessageIndex(0);
    setSelectedMessages([]);
  };

  const handleSelectMessage = (): void => {
    setSelectedMessages([...selectedMessages, messages[currentMessageIndex]]);
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1);
    }
  };

  const handleSkipMessage = (): void => {
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1);
    }
  };

  const convertToCSV = (objArray: Message[]): string => {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray as unknown as string) : objArray;
    let str = '';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
        if (line !== '') line += ',';
        line += array[i][index];
      }
      str += line + '\r\n';
    }

    return str;
  };

  const exportCSVFile = (): void => {
    const csvData = convertToCSV(selectedMessages);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'selectedMessages.csv');
  };

  return (
    <div>
      <FileUpload onFileUpload={handleFileUpload} />
      {messages.length > 0 && (
        <div className="flex flex-col items-center my-4">
          <div className="p-4 border border-blue-500 rounded mb-2">{messages[currentMessageIndex]}</div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded m-2 hover:bg-blue-700" onClick={handleSelectMessage}>Select</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded m-2 hover:bg-blue-700" onClick={handleSkipMessage}>Skip</button>
        </div>
      )}
      {selectedMessages.length > 0 && (
        <button className="bg-green-500 text-white py-2 px-4 rounded m-2 hover:bg-green-700" onClick={exportCSVFile}>Export to CSV</button>
      )}
    </div>
  );
}
