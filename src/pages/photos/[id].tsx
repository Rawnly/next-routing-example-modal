import { GetServerSideProps } from 'next'
import { FunctionComponent } from 'react'
import { Photo } from '../../declarations/Photo'
import { getPhoto } from '../../utils/api-wrapper'
import { Button, Card, CardHeader, CardBody, CardFooter } from 'reactstrap'
import Link from 'next/link'

interface Props {
  photo?: Photo
}

const Page: FunctionComponent<Props> = ({ photo }) => (
  <section className="container-fluid d-flex justify-content-center align-items-center p-4">
    <Card className="w-50">
      <CardHeader>
        Photo {photo.id}
      </CardHeader>
      <CardBody className="d-flex justify-content-center align-items-center">
        <img height="600" src={photo.urls.regular} alt={photo.id} />
      </CardBody>
      <CardFooter>
        <Link href="/">
          <Button block color="primary">
            Back to Photos
          </Button>
        </Link>
      </CardFooter>
    </Card>
  </section>
)

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const id = query.id as string
  let photo = null;

  try {
    const { data } = await getPhoto(id);
    photo = data
  } catch (error) {
    console.error(error)
  }

  return {
    props: { photo }
  }
}


export default Page
