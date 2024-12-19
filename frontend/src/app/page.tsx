import ImageCard from "@/components/ImageCard";
import ImageUploader, { ImageData } from "@/components/ImageUploader";
import ListImage from "@/components/ListImage";
import Navbar from "@/components/NavBar";
import UploadSection from "@/components/UploadSection";
import { useState } from "react";


export default function Home() {
 
  return (
    <>
        <Navbar/>
        <UploadSection/>
        <ListImage/>
      
      
    </>
  );
}
