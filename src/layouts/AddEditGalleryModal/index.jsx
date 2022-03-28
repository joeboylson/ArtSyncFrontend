import Loading from "../../components/Loading";
import { useEffect } from "react";
import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router";
import { objectToFormData, usePost } from "../../utils/request";
import { useScenes } from "../../hooks/useScenes";

import "./style.scss";
import { isEmpty } from "lodash";
import { scenePathToHumanReadable } from "../../utils/scene";

const AddEditGalleryModal = ({ 
  handleCancel,
  gallery = null
}) => {

  const { handleSubmit, control, getValues } = useForm();
  const { post, loading: postIsLoading, result } = usePost();
  const { scenes, loading: scenesLoading } = useScenes();
  const { push } = useHistory();

  const handleClickAway = (e) => {
    if (e.target.dataset.clickAway === "true") {
      handleCancel()
    }
  }

  useEffect(() => {
    if (result && result.data.success) {
      const galleryId = result.data.new_gallery.id;
      push(`/gallery/${galleryId}`)
    };
  }, [result, push])

  const onSubmit = () => {
    const formData = objectToFormData(getValues());
    post('/new_gallery', formData, true);
  }

  const isEdit = useMemo(() => !isEmpty(gallery), [gallery])
  const pageIsLoading = useMemo(() => postIsLoading || scenesLoading, [postIsLoading, scenesLoading])

  return (
    <div 
      className="addedit-modal"
      onClick={handleClickAway}
      data-click-away={true}
    >
      <div className="addedit-modal-content">
        <h3>{isEdit ? "Edit" : "Create New"} Gallery</h3>

        <Loading loading={pageIsLoading}>
          <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange } }) => (
                  <label htmlFor="galleryName">
                    Gallery Name
                    <input
                      name="galleryName"
                      onChange={onChange}
                    />
                  </label>
                )}
              />

              <Controller
                name="name"
                control={control}
                render={({ field: { onChange } }) => (
                  <label htmlFor="galleryName">
                    Thumbnail
                    <input
                      name="galleryName"
                      onChange={() => console.log("DO NOTHING")}
                      type="file"
                    />
                  </label>
                )}
              />

              <Controller
                name="isPublic"
                control={control}
                render={({ field: { onChange } }) => (
                  <label htmlFor="isPublic">
                    <input
                      name="isPublic"
                      placeholder="Public"
                      type="checkbox"
                      onChange={onChange}
                    />
                    Allow Public Access
                  </label>
                )}
              />

              <Controller
                name="sceneId"
                control={control}
                render={({ field: { onChange } }) => (
                  <div className="radio-wrapper">
                    <p>Choose A Scene:</p>
                    { scenes && scenes.map(s => {
                      const radioName = `field-${s.id}`;
                      return (
                        <label htmlFor={radioName}>
                          <input
                            type="radio"
                            name="scene-radio"
                            value={s.id}
                            id={radioName}
                            onChange={onChange}
                          />
                          {scenePathToHumanReadable(s.name)}
                        </label>
                      )
                    })}
                  </div>
                )}
              />

              <button>Create Gallery</button>
          </form>
        </Loading>
        
      </div>
    </div>
  );
};

export default AddEditGalleryModal;
