import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PostApartment.css'
import { NFTStorage, File } from 'nft.storage'
import { apiKey } from '../APIKEYS'

function PostApartment() {
  const navigate = useNavigate()
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [bookName, setBookName] = useState('Principles of physics')
  const [walletAddress, setWalletAddress] = useState(
    '0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C',
  )
  const [author, setAuthor] = useState('Phillyps Mer')
  const [description, setDescription] = useState(
    'We start from the following five basic principles to construct all other physical laws and equations. These five basic principles are: (1) Constituent principle: the basic constituents of matter are various kinds of identical particles. This can also be called locality principle; (2) Causality principle: the future state depends only on the present state; (3) Covariance principle: the physics should be invariant under an arbitrary coordinate transformation; (4) Invariance or Symmetry principle: the spacetime is homogeneous; (5) Equi-probability principle: all the states in an isolated system are expected to be occupied with equal probability. These five basic principles can be considered as physical common senses. It is very natural to have these basic principles. More important is that these five basic principles are consistent with one another. From these five principles, we derive a vast set of equations which explains or promise to explain all the phenomena of the physical world.',
  )

  const [imageName, setImageName] = useState('')
  const [imageType, setImageType] = useState('')

  const handleImage = (event) => {
    setImage(event.target.files[0])
    setImageName(event.target.files[0].name)
    setImageType(event.target.files[0].type)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(
      'bookName, walletAddress, author, description',
      bookName,
      walletAddress,
      author,
      description,
    )
    try {
      setLoading(true)
      const client = new NFTStorage({ token: apiKey })
      const metadata = await client.store({
        name: bookName,
        description: `${description},$, ${walletAddress},$,${author}`,
        image: new File([image], imageName, { type: imageType }),
      })
      if (metadata) {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <div className="mb-3 text-center">
        <br />
        <h2>Post your books, notes, labs and more</h2>
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="pet"
            className="img-preview"
          />
        ) : (
          ''
        )}
      </div>

      <div className="content-form">
        <div className="card" style={{ width: '55%' }}>
          <form action="" className="form-inline" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Image
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                defaultValue={image}
                onChange={handleImage}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="company" className="form-label">
                Book Name
              </label>
              <input
                type="text"
                className="form-control"
                id="company"
                placeholder="Google"
                defaultValue={bookName}
                onChange={(e) => setBookName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Your Wallet Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Palo Alto California"
                defaultValue={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="website" className="form-label">
                Book Author
              </label>
              <input
                type="text"
                className="form-control"
                id="website"
                placeholder="Phillyps Mer"
                defaultValue={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder=""
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* loading icons */}
            <div className="mb-3">
              {loading ? (
                <div>
                  <h3>Posting your book...</h3>
                  <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>

            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PostApartment
