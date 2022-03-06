import GalleryItem from "../../components/GalleryItem";
import { Skeleton } from "@material-ui/lab";

import "./style.scss"; 

const GalleryItemSkeleton = () => <Skeleton variant="rect"/>
const GalleryItemRender = (galleryItem) => <GalleryItem galleryItem={galleryItem}/>

const GalleriesList = ({galleries, skeleton=true}) => {

  const items = skeleton ? 
    Array(10).fill(GalleryItemSkeleton()) :
    galleries.map(galleryItem => GalleryItemRender(galleryItem))

  return (
    <div id="gallery-list">
      {items.map(component => (component))}
    </div>
  )
};

export default GalleriesList;
