import Loading from "../../components/Loading";
import PageWrapper from "../../components/PageWrapper";
import { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router";
import { objectToFormData, usePost } from "../../utils/request";
import { useScenes } from "../../hooks/useScenes";

// import './style.scss'

const AddEditGallery = () => {
    
  const { handleSubmit, control, getValues } = useForm();
  const { post, loading: postIsLoading, result } = usePost();
  const { scenes, loading: scenesLoading } = useScenes();
  const { push } = useHistory();

  useEffect(() => {
    console.log({result})
    // if (result && result.data.success) push('/');
  }, [result, push])

  const onSubmit = () => {
    const formData = objectToFormData(getValues());
    post('/new_gallery', formData, true);
  }

  const pageIsLoading = useMemo(() => postIsLoading || scenesLoading, [postIsLoading, scenesLoading])
  
  return (
    <PageWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Create New Gallery</h1>

        <Loading loading={pageIsLoading}>
          {result && !result.data.success && <p>{result.data.message}</p>}

          <Controller
            name="name"
            control={control}
            render={({ field: { onChange } }) => (
              <div class="field-wrapper">
                <label htmlFor="galleryName">
                  Gallery Name
                  <input
                    name="galleryName"
                    onChange={onChange}
                  />
                </label>
              </div>
            )}
          />

          <Controller
            name="isPublic"
            control={control}
            render={({ field: { onChange } }) => (
              <div class="field-wrapper">
                <label htmlFor="isPublic">
                  <input
                    name="isPublic"
                    placeholder="Public"
                    type="checkbox"
                    onChange={onChange}
                  />
                  Make Public
                </label>
              </div>
            )}
          />

          <Controller
            name="sceneId"
            control={control}
            render={({ field: { onChange } }) => (
              <div>
                { scenes && scenes.map(s => {
                  const radioName = `field-${s.id}`;
                  return (
                    <div class="radio-wrapper">
                      <label htmlFor={radioName}>
                        <input
                          type="radio"
                          name="scene-radio"
                          value={s.id}
                          id={radioName}
                          onChange={onChange}
                        />
                        {s.name}
                      </label>
                    </div>
                  )
                })}
              </div>
            )}
          />

          <button>Create Gallery</button>
        </Loading>
      </form>
    </PageWrapper>
  );
}

export default AddEditGallery;