'use client';

import Image from 'next/image';
import toast from 'react-hot-toast';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { storage, db } from '../../../../firebase'; // Ensure you have your Firebase initialized
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import UploadIcon from '../../components/shape/upload';
import { FieldError, Loader, Text } from 'rizzui';
import cn from '../../utils/class-names';
import { PiPencilSimple } from 'react-icons/pi';
import { LoadingSpinner } from './upload-zone';
import { FileWithPath } from 'react-dropzone';
import { useAuth } from '@/app/auth/useAuth'; // Make sure you have a context for authentication

interface UploadZoneProps {
  name: string;
  getValues?: any;
  setValue?: any;
  className?: string;
  error?: string;
}

export default function AvatarUpload({
  name,
  error,
  className,
  getValues,
  setValue,
}: UploadZoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const formValue = getValues(name);
  const { user } = useAuth(); // Adjusted to destructure `user` from `useAuth`

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const selectedFile = acceptedFiles[0]; // Assuming you only allow one file
      if (selectedFile) {
        setFiles([selectedFile]);
        uploadFile(selectedFile);
      }
    },
    [] // No dependencies as we use uploadFile inside the function
  );

  const uploadFile = async (file: File) => {
    if (!user) return; // Ensure the user is authenticated

    const storageRef = ref(storage, `profile_pictures/${user.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setIsUploading(true);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // You can track progress here if you want
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error(error);
        toast.error('Upload failed: ' + error.message);
        setIsUploading(false);
      },
      async () => {
        // Get the download URL after successful upload
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // Update the user's Firestore document with the profile picture URL
        try {
          await updateDoc(doc(db, 'users', user.uid), {
            profilePicture: downloadURL,  // Ensure 'profilePicture' exists in your Firestore document
          });
          if (setValue) {
            setValue(name, { url: downloadURL, name: file.name }); // Assuming you want to store this in the form
          }
          toast.success('Avatar updated');
        } catch (firestoreError) {
          console.error('Failed to update Firestore:', firestoreError);
          toast.error('Failed to update profile picture in Firestore');
        } finally {
          setIsUploading(false);
        }
      }
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [] // Accept all image types
    },
  });

  return (
    <div className={cn('grid gap-5', className)}>
      <div
        className={cn(
          'relative grid h-40 w-40 place-content-center rounded-full border-[1.8px]'
        )}
      >
        {formValue ? (
          <>
            <figure className="absolute inset-0 rounded-full">
              <Image
                fill
                alt="user avatar"
                src={formValue?.url}
                className="rounded-full"
              />
            </figure>
            <div
              {...getRootProps()}
              className={cn(
                'absolute inset-0 grid place-content-center rounded-full bg-black/70'
              )}
            >
              {isUploading ? (
                <LoadingSpinner />
              ) : (
                <PiPencilSimple className="h-5 w-5 text-white" />
              )}
              <input {...getInputProps()} />
            </div>
          </>
        ) : (
          <div
            {...getRootProps()}
            className={cn(
              'absolute inset-0 z-10 grid cursor-pointer place-content-center'
            )}
          >
            <input {...getInputProps()} />
            <UploadIcon className="mx-auto h-12 w-12" />

            {isUploading ? (
              <Loader variant="spinner" className="justify-center" />
            ) : (
              <Text className="font-medium">Drop or select file</Text>
            )}
          </div>
        )}
      </div>
      {error && <FieldError error={error} />}
    </div>
  );
}
