'use client';

import Image from 'next/image';
import toast from 'react-hot-toast';
import isEmpty from 'lodash/isEmpty';
import prettyBytes from 'pretty-bytes';
import { useCallback, useState } from 'react';
import { useDropzone, Accept } from 'react-dropzone'; // Import Accept type from react-dropzone
import { storage } from '../../../../firebase'; // Ensure you have your Firebase initialized
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Button, Text, FieldError } from 'rizzui';
import cn from '../../utils/class-names';
import UploadIcon from '../../components/shape/upload';
import { endsWith } from 'lodash';
import { FileWithPath } from 'react-dropzone';
import { Check, Trash, UploadSimple } from 'phosphor-react'; // Updated imports for icons

// Define the type for responded URLs
interface RespondedUrl {
  name: string;
  size: number;
  url: string;
}

interface UploadZoneProps {
  label?: string;
  name: string;
  getValues: any;
  setValue: any;
  className?: string;
  error?: string;
}

interface FileType {
  name: string;
  url: string;
  size: number;
}

export default function UploadZone({
  label,
  name,
  className,
  getValues,
  setValue,
  error,
}: UploadZoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    console.log('acceptedFiles', acceptedFiles);
    setFiles([
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    ]);
  }, []);

  function handleRemoveFile(index: number) {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  }

  const uploadedItems = isEmpty(getValues(name)) ? [] : getValues(name);
  const notUploadedItems = files.filter(
    (file) =>
      !uploadedItems?.some(
        (uploadedFile: FileType) => uploadedFile.name === file.name
      )
  );

  const uploadFiles = async (files: File[]) => {
    if (files.length === 0) return;
  
    setIsUploading(true);
    const respondedUrls: RespondedUrl[] = []; // Specify the type here
  
    for (const file of files) {
      const storageRef = ref(storage, `uploads/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      // Create a promise that resolves when the upload task completes
      await new Promise<void>((resolve, reject) => { // Specify void as the type argument
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            console.error(error);
            toast.error('Upload failed: ' + error.message);
            reject(error); // Reject the promise on error
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            respondedUrls.push({ name: file.name, size: file.size, url: downloadURL });
            resolve(); // Resolve the promise when upload completes
          }
        );
      });
    }
  
    if (setValue) {
      setValue(name, respondedUrls);
    }
  
    toast.success(<Text as="b" className="font-semibold">Files uploaded successfully!</Text>);
    setIsUploading(false);
    setFiles([]);
  };
  

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [] // Accept all image types
    }
  });

  return (
    <div className={cn('grid @container', className)}>
      {label && <span className="mb-1.5 block font-semibold text-gray-900">{label}</span>}
      <div className={cn('rounded-md border-[1.8px]', !isEmpty(files) && 'flex flex-wrap items-center justify-between @xl:flex-nowrap @xl:pr-6')}>
        <div
          {...getRootProps()}
          className={cn(
            'flex cursor-pointer items-center gap-4 px-6 py-5 transition-all duration-300',
            isEmpty(files) ? 'justify-center' : 'flex-grow justify-center @xl:justify-start'
          )}
        >
          <input {...getInputProps()} />
          <UploadIcon className="h-12 w-12" />
          <Text className="text-base font-medium">Drop or select file</Text>
        </div>

        {!isEmpty(files) && (
          <UploadButtons
            files={files}
            isLoading={isUploading}
            onClear={() => setFiles([])}
            onUpload={() => uploadFiles(files)}
          />
        )}
      </div>

      {(!isEmpty(uploadedItems) || !isEmpty(notUploadedItems)) && (
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fit,_minmax(140px,_1fr))]">
          {uploadedItems.map((file: any, index: number) => (
            <div key={index} className={cn('relative')}>
              <figure className="group relative h-40 rounded-md bg-gray-50">
                <MediaPreview name={file.name} url={file.url} />
                <button
                  type="button"
                  className="absolute right-0 top-0 rounded-full bg-gray-700 p-1.5 transition duration-300"
                >
                  <Check className="text-white" /> {/* Updated icon */}
                </button>
              </figure>
              <MediaCaption name={file.name} size={file.size} />
            </div>
          ))}
          {notUploadedItems.map((file: any, index: number) => (
            <div key={index} className={cn('relative')}>
              <figure className="group relative h-40 rounded-md bg-gray-50">
                <MediaPreview name={file.name} url={file.preview} />
                {isUploading ? (
                  <div className="absolute inset-0 z-50 grid place-content-center rounded-md bg-gray-800/50">
                    <LoadingSpinner />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="absolute right-0 top-0 rounded-full bg-gray-700/70 p-1.5 opacity-20 transition duration-300 hover:bg-red-dark group-hover:opacity-100"
                  >
                    <Trash className="text-white" /> {/* Updated icon */}
                  </button>
                )}
              </figure>
              <MediaCaption name={file.path} size={file.size} />
            </div>
          ))}
        </div>
      )}

      {error && <FieldError error={error} />}
    </div>
  );
}

function UploadButtons({
  files,
  onClear,
  onUpload,
  isLoading,
}: {
  files: any[];
  isLoading: boolean;
  onClear: () => void;
  onUpload: () => void;
}) {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 px-6 pb-5 @sm:flex-nowrap @xl:w-auto @xl:justify-end @xl:px-0 @xl:pb-0">
      <Button
        variant="outline"
        className="w-full gap-2 @xl:w-auto"
        isLoading={isLoading}
        onClick={onClear}
      >
        <Trash /> {/* Updated icon */}
        Clear {files.length} files
      </Button>
      <Button
        className="w-full gap-2 @xl:w-auto"
        isLoading={isLoading}
        onClick={onUpload}
      >
        <UploadSimple /> Upload {files.length} files
      </Button>
    </div>
  );
}

function MediaPreview({ name, url }: { name: string; url: string }) {
  return endsWith(name, '.pdf') ? (
    <object data={url} type="application/pdf" width="100%" height="100%">
      <p>
        Alternative text - include a link <a href={url}>to the PDF!</a>
      </p>
    </object>
  ) : (
    <Image
      fill
      src={url}
      alt={name}
      className="transform rounded-md object-contain"
    />
  );
}

function MediaCaption({ name, size }: { name: string; size: number }) {
  return (
    <div className="mt-1 text-xs">
      <p className="break-words font-medium text-gray-700">{name}</p>
      <p className="mt-1 font-mono">{prettyBytes(size)}</p>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient x1="8.042%" y1="0%" x2="95.338%" y2="23.262%">
          <stop id="loading-spinner-gradient-1" stopColor="#FFF" stopOpacity="0" />
          <stop id="loading-spinner-gradient-2" stopColor="#FFF" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)">
          <circle className="text-gray-200" cx="18" cy="18" r="18" />
          <path
            className="text-gray-500"
            fill="url(#loading-spinner-gradient-1)"
            d="M36 18c0-9.941-8.059-18-18-18"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  );
}
