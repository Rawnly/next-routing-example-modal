import { NextPage, GetServerSideProps } from 'next';
import { getPhotos } from '../utils/api-wrapper'
import { Photo } from '../declarations/Photo'

import { FunctionComponent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Modal, ModalBody, ModalHeader, Button, ModalFooter } from 'reactstrap'

interface PageProps {
  photos: Photo[]
}

const PhotoElement: FunctionComponent<{ photo: Photo, isThumb?: boolean }> = ({ photo, isThumb }) => {
  const router = useRouter()
  const openPhoto = () => router.push(`/?id=${photo.id}`, `/photos/${photo.id}`, { shallow: true })

  return (
    <div
      onClick={openPhoto}
      className="photo-card">
      <img
        src={photo.urls.thumb}
        alt={photo.id}
      />
    </div>
  )
}

const Page: NextPage<PageProps> = ({ photos }) => {
  const [modalOptions, setModalOptions] = useState({ visible: false, photo: null })
  const router = useRouter();

  const closeModal = () => {
    router.push('/', '/', { shallow: true })
    setModalOptions({ visible: false, photo: null })
  }

  useEffect(() => {
    const id = router.query.id as string;

    if (!id) {
      setModalOptions({ visible: false, photo: null })
      return
    };

    setModalOptions({ visible: true, photo: photos.find(item => item.id == id) })
  }, [router.query.id])

  return (
    <>
      <section className="d-flex justify-content-between align-items-center flex-wrap h-100 w-100" style={{ padding: 35 }}>
        {photos.map(photo => (
          <PhotoElement key={photo.id} photo={photo} />
        ))}
      </section>

      {/* MODAL */}
      <Modal isOpen={modalOptions.visible} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>{modalOptions.photo?.id}</ModalHeader>
        <ModalBody>
          <img width="100%" height="100%" src={modalOptions.photo?.urls.regular} alt={modalOptions.photo?.id} />
        </ModalBody>
        <ModalFooter>
          <small>
            Try to reload the page
          </small>
          <Button onClick={closeModal}>Close</Button>{' '}
        </ModalFooter>
      </Modal>

    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  let photos: Photo[] = [];

  try {
    const { data } = await getPhotos({ order_by: 'popular', page: 3 })
    photos = data
  } catch (error) {
    console.error(error)
  }

  return {
    props: { photos }
  }
}


Page.defaultProps = {
  photos: []
}

Page.displayName = 'Photos Page';

export default Page;
