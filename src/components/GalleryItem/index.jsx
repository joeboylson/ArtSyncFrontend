import { Link } from "react-router-dom";

const GalleryItem = ({galleryItem}) => {

  console.log(galleryItem)

  const { name, id, user, thumbnail } = galleryItem;

  return (
    <div 
      className="gallery-list-item"
      style={{"--gallery-thumbnail": `url(${thumbnail})`}}
    >
      <Link to={`/gallery/${id}`}>{name}</Link>

      { user && 
        <Link to={`/profile/${user.id}`} className="profile-link">
          <img src={`https://i.pravatar.cc/300?img=${user.id}`} alt="" />
          {user.name}
        </Link>
      }
    </div>
  )

};

export default GalleryItem;
