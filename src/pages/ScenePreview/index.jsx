import React, { useEffect, useMemo } from 'react';
import Loading from '../../components/Loading';
import { useParams } from 'react-router';
import { useSceneById } from '../../hooks/useSceneById';


const ScenePreview = () => {

    const { sceneId } = useParams();
    const { loading, scene, refetch } = useSceneById(sceneId)

    console.log({scene})

    const context = useMemo(() => {
        if (scene) {
            return JSON.parse(scene.context_string);
        }
    }, [scene])

    console.log({context})

    useEffect(() => {
        console.log(sceneId)
        refetch(sceneId)
    }, [refetch, sceneId]);

    return (
        <Loading loading={loading}>
            <p>scene preview</p>
            <hr />

            { scene && 
                <div>
                    <p> {scene.context_string} </p>
                    <p> {scene.folder_path} </p>
                    <p> {scene.galleries} </p>
                    <p> {scene.id} </p>
                    <p> {scene.name} </p>
                </div>
            }

        </Loading>
    )
}

export default ScenePreview;